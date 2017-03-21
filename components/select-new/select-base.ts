import {Component, ViewChild, HostBinding, ElementRef, HostListener, Input, ContentChildren, QueryList, ViewChildren, AfterContentInit, EventEmitter, Output, Renderer, TemplateRef, ViewContainerRef} from '@angular/core';
import {DropdownService} from '../dropdown/dropdown.service';
import {SearchService} from '../search/search.service';
import {readValue, KeyCode} from '../util/util';
import {PositioningService, PositioningPlacement} from '../util/positioning.service';
import {SuiDropdownMenu, SuiDropdownMenuItem} from '../dropdown/dropdown-menu';
import {SuiSelectOption, ISelectRenderedOption} from './select-option';
import {Subscription} from 'rxjs';
import {element} from 'protractor';

export abstract class SuiSelectBase<T, U> implements AfterContentInit {
    public dropdownService:DropdownService;
    public searchService:SearchService<T>;

    @ViewChild(SuiDropdownMenu)
    protected _menu:SuiDropdownMenu;

    @ContentChildren(SuiSelectOption, { descendants: true })
    private _renderedOptions:QueryList<SuiSelectOption<T>>;

    private _renderedSubscriptions:Subscription[];

    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
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
        return this.isSearchable || this.isDisabled ? -1 : 0;
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
    public get options() {
        return this.searchService.options;
    }

    public set options(options:T[]) {
        this.searchService.options = options;
        this.optionsUpdateHook();
    }

    protected optionsUpdateHook() {}

    public get availableOptions() {
        return this.searchService.results;
    }

    public get query() {
        return this.searchService.query;
    }

    public set query(query:string) {
        this.queryUpdateHook();
        this.searchService.updateQuery(query, () =>
            this.dropdownService.setOpenState(true));
    }

    protected queryUpdateHook() {}

    @Input()
    public get labelField() {
        return this.searchService.optionsField;
    }

    public set labelField(field:string) {
        this.searchService.optionsField = field;
    }

    private get labelGetter() {
        return (obj:T) => readValue<T, string>(obj, this.labelField);
    }

    @Input()
    public valueField:string;

    protected get valueGetter() {
        return (obj:T) => readValue<T, U>(obj, this.valueField);
    }

    @Input()
    public optionTemplate:TemplateRef<any>;

    @Input()
    public noResultsMessage:string;

    constructor(private _element:ElementRef, private _renderer:Renderer) {
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService<T>(true);

        this.isSearchable = false;
        this.noResultsMessage = "No results";

        this._renderedSubscriptions = [];

        this._selectClasses = true;
    }

    public ngAfterContentInit() {
        this._menu.service = this.dropdownService;
        this._menu.items = this._renderedOptions;

        this.onAvailableOptionsRendered();
        this._renderedOptions.changes.subscribe(() => this.onAvailableOptionsRendered());
    }

    private onAvailableOptionsRendered() {
        this._renderedSubscriptions.forEach(rs => rs.unsubscribe());
        this._renderedSubscriptions = [];

        this._renderedOptions.forEach(ro => {
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

    public selectOption(option:T) {
        throw new Error("Not implemented");
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        e.stopPropagation();
        
        this.focusInput();

        this.dropdownService.setOpenState(this.isSearchable ? true : !this.dropdownService.isOpen);
    }

    @HostListener("keypress", ['$event'])
    public onKeypress(e:KeyboardEvent) {
        if (e.keyCode == KeyCode.Enter) {
            this._renderer.invokeElementMethod(this._element.nativeElement, "click");
        }
    }

    protected focusInput() {
        if (this.isSearchable) {
            this._renderer.invokeElementMethod(this._queryInput.nativeElement, "focus");
        }
    }

    protected drawTemplate(siblingRef:ViewContainerRef, value:T) {
        siblingRef.clear();
        siblingRef.createEmbeddedView(this.optionTemplate, { '$implicit': value });
    }
}