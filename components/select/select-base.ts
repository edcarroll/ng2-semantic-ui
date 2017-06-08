import {Component, ViewChild, HostBinding, ElementRef, HostListener, Input, ContentChildren, QueryList, ViewChildren, AfterContentInit, EventEmitter, Output, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {DropdownService, DropdownAutoCloseType} from '../dropdown/dropdown.service';
import {SearchService, LookupFn} from '../search/search.service';
import {readValue, KeyCode, HandledEvent, AugmentedElement, TemplateRefContext} from '../util/util';
import {PositioningService, PositioningPlacement} from '../util/positioning.service';
import {SuiDropdownMenu, SuiDropdownMenuItem} from '../dropdown/dropdown-menu';
import {SuiSelectOption, ISelectRenderedOption} from './select-option';
import {Subscription} from 'rxjs/Subscription';

// We use generic type T to specify the type of the options we are working with, and U to specify the type of the property of the option used as the value.
export abstract class SuiSelectBase<T, U> implements AfterContentInit {
    public dropdownService:DropdownService;
    public searchService:SearchService<T>;

    @ViewChild(SuiDropdownMenu)
    protected _menu:SuiDropdownMenu;

    // Keep track of all of the rendered select options. (Rendered by the user using *ngFor).
    @ContentChildren(SuiSelectOption, { descendants: true })
    protected _renderedOptions:QueryList<SuiSelectOption<T>>;

    // Keep track of all of the subscriptions to the selected events on the rendered options.
    private _renderedSubscriptions:Subscription[];

    // Sets the Semantic UI classes on the host element.
    @HostBinding('class.ui')
    @HostBinding('class.selection')
    @HostBinding('class.dropdown')
    private _selectClasses:boolean;

    @HostBinding('class.active')
    public get isActive() {
        return this.dropdownService.isOpen;
    }

    @HostBinding('class.visible')
    public get isVisible() {
        return this._menu.isVisible;
    }

    @HostBinding('class.search')
    @Input()
    public isSearchable:boolean;

    @HostBinding('attr.tabindex')
    public get tabIndex() {
        // Remove from tabindex if searchable or disabled, as if searchable then the input is what needs to be focussed.
        return (this.isSearchable || this.isDisabled) ? -1 : 0;
    }

    @HostBinding('class.disabled')
    @Input()
    public get isDisabled():boolean {
        return this.dropdownService.isDisabled;
    }

    public set isDisabled(value:boolean) {
        this.dropdownService.isDisabled = !!value;
    }

    @ViewChild('queryInput')
    private _queryInput:ElementRef;

    @Input()
    public placeholder:string;

    @Input()
    public set options(options:T[] | LookupFn<T>) {
        if (typeof options == "function") {
            this.searchService.optionsLookup = options;
        }
        else {
            this.searchService.options = options;
        }
        
        this.optionsUpdateHook();
    }

    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    protected optionsUpdateHook() {}

    public get availableOptions() {
        return this.searchService.results;
    }

    public get query() {
        return this.searchService.query;
    }

    public set query(query:string) {
        this.queryUpdateHook();
        this.updateQuery(query);
    }

    protected updateQuery(query:string) {
        // Update the query then open the dropdown, as after keyboard input it should always be open.
        this.searchService.updateQuery(query, () =>
            this.dropdownService.setOpenState(true));
    }

    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    protected queryUpdateHook() {}

    @Input()
    public get labelField() {
        return this.searchService.optionsField;
    }

    public set labelField(field:string) {
        this.searchService.optionsField = field;
    }

    private get labelGetter() {
        // Helper function to retrieve the label from an item.
        return (obj:T) => readValue<T, string>(obj, this.labelField);
    }

    @Input()
    public valueField:string;

    protected get valueGetter() {
        // Helper function to retrieve the value from an item.
        return (obj:T) => readValue<T, U>(obj, this.valueField);
    }

    @Input()
    public optionTemplate:TemplateRef<TemplateRefContext<T>>;

    @Input()
    public noResultsMessage:string;

    constructor(private _element:ElementRef, private _renderer:Renderer2) {
        this.dropdownService = new DropdownService();
        // We do want an empty query to return all results.
        this.searchService = new SearchService<T>(true);

        this.isSearchable = false;
        this.noResultsMessage = "No results";

        this._renderedSubscriptions = [];

        this._selectClasses = true;
    }

    public ngAfterContentInit() {
        this._menu.service = this.dropdownService;
        // We manually specify the menu items to the menu because the @ContentChildren doesn't pick up our dynamically rendered items.
        this._menu.items = this._renderedOptions;

        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onAvailableOptionsRendered();
        this._renderedOptions.changes.subscribe(() => this.onAvailableOptionsRendered());
    }

    protected onAvailableOptionsRendered() {
        // Unsubscribe from all previous subscriptions to avoid memory leaks on large selects.
        this._renderedSubscriptions.forEach(rs => rs.unsubscribe());
        this._renderedSubscriptions = [];

        this._renderedOptions.forEach(ro => {
            // Slightly delay initialisation to avoid change after checked errors. TODO - look into avoiding this!
            setTimeout(() => this.initialiseRenderedOption(ro));
            
            this._renderedSubscriptions.push(ro.onSelected.subscribe(() => this.selectOption(ro.value)));
        });
        
    }

    protected initialiseRenderedOption(option:ISelectRenderedOption<T>) {
        option.usesTemplate = !!this.optionTemplate;
        option.readLabel = this.labelGetter;

        if (option.usesTemplate) {
            this.drawTemplate(option.templateSibling, option.value);
        }
    }

    public abstract selectOption(option:T):void;

    protected findOption(options:T[], value:U) {
        // Tries to find an option in options array
        return options.find(o => value == this.valueGetter(o));
    }

    @HostListener("click", ['$event'])
    public onClick(e:HandledEvent & MouseEvent) {
        if (!e.eventHandled) {
            e.eventHandled = true;

            // Immediately focus the search input whenever clicking on the select.
            this.focusInput();

            // If the dropdown is searchable, clicking should keep it open, otherwise we toggle the open state.
            this.dropdownService.setOpenState(this.isSearchable ? true : !this.dropdownService.isOpen);
        }
    }

    @HostListener("keypress", ['$event'])
    public onKeyPress(e:KeyboardEvent) {
        if (e.keyCode == KeyCode.Enter) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
        }
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(e:MouseEvent) {
        const target = e.target as AugmentedElement;
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    }

    protected focusInput() {
        if (this.isSearchable) {
            // Focusses the search input only when searchable.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._queryInput.nativeElement.focus();
        }
    }

    // Helper that draws the provided template beside the provided ViewContainerRef.
    protected drawTemplate(siblingRef:ViewContainerRef, value:T) {
        siblingRef.clear();
        // Use of `$implicit` means use of <ng-template let-option> syntax is supported.
        siblingRef.createEmbeddedView(this.optionTemplate, { $implicit: value });
    }
}