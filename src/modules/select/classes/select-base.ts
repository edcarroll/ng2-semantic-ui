import {
    ViewChild, HostBinding, ElementRef, HostListener, Input, ContentChildren, QueryList,
    AfterContentInit, TemplateRef, ViewContainerRef
} from "@angular/core";
import { DropdownService, SuiDropdownMenu } from "../../dropdown";
import { SearchService, LookupFn } from "../../search";
import { Util, ITemplateRefContext, HandledEvent, KeyCode } from "../../../misc/util";
import { ISelectLocaleValues, RecursivePartial, SuiLocalizationService } from "../../../behaviors/localization";
import { SuiSelectOption, ISelectRenderedOption } from "../components/select-option";
import { Subscription } from "rxjs/Subscription";

export interface IOptionContext<T> extends ITemplateRefContext<T> {
    query?:string;
}

// We use generic type T to specify the type of the options we are working with,
// and U to specify the type of the property of the option used as the value.
export abstract class SuiSelectBase<T, U> implements AfterContentInit {
    public dropdownService:DropdownService;
    public searchService:SearchService<T, U>;

    @ViewChild(SuiDropdownMenu)
    protected _menu:SuiDropdownMenu;

    // Keep track of all of the rendered select options. (Rendered by the user using *ngFor).
    @ContentChildren(SuiSelectOption, { descendants: true })
    protected _renderedOptions:QueryList<SuiSelectOption<T>>;

    // Keep track of all of the subscriptions to the selected events on the rendered options.
    private _renderedSubscriptions:Subscription[];

    // Sets the Semantic UI classes on the host element.
    @HostBinding("class.ui")
    @HostBinding("class.selection")
    @HostBinding("class.dropdown")
    private _selectClasses:boolean;

    @HostBinding("class.active")
    public get isActive():boolean {
        return this.dropdownService.isOpen;
    }

    @HostBinding("class.visible")
    public get isVisible():boolean {
        return this._menu.isVisible;
    }

    @HostBinding("class.search")
    @Input()
    public isSearchable:boolean;

    @HostBinding("attr.tabindex")
    public get tabIndex():number {
        // Remove from tabindex if searchable or disabled, as if searchable then the input is what needs to be focussed.
        return (this.isSearchable || this.isDisabled) ? -1 : 0;
    }

    @HostBinding("class.disabled")
    @Input()
    public get isDisabled():boolean {
        return this.dropdownService.isDisabled;
    }

    public set isDisabled(value:boolean) {
        this.dropdownService.isDisabled = !!value;
    }

    @ViewChild("queryInput")
    private _queryInput:ElementRef;

    @Input()
    public set options(options:T[]) {
        this.searchService.options = options;

        this.optionsUpdateHook();
    }

    @Input()
    public set optionsLookup(options:LookupFn<T, U>) {
        this.searchService.optionsLookup = options;

        this.optionsUpdateHook();
    }

    public get availableOptions():T[] {
        return this.searchService.results;
    }

    public get query():string | undefined {
        return this.isSearchable ? this.searchService.query : undefined;
    }

    public set query(query:string | undefined) {
        if (query != undefined) {
            this.queryUpdateHook();
            this.updateQuery(query);
        }
    }

    @Input()
    public get labelField():string | undefined {
        return this.searchService.optionsField;
    }

    public set labelField(field:string | undefined) {
        this.searchService.optionsField = field;
    }

    public get labelGetter():(obj:T) => string {
        // Helper function to retrieve the label from an item.
        return (obj:T) => Util.Object.readValue<T, string>(obj, this.labelField);
    }

    @Input()
    public valueField:string;

    public get valueGetter():(obj:T) => U {
        // Helper function to retrieve the value from an item.
        return (obj:T) => Util.Object.readValue<T, U>(obj, this.valueField);
    }

    @Input()
    public optionTemplate:TemplateRef<IOptionContext<T>>;

    private _optionFormatter?:(o:T, q?:string) => string;

    public get configuredFormatter():(option:T) => string {
        if (this._optionFormatter) {
            return r => this._optionFormatter!(r, this.isSearchable ? this.query : undefined);
        } else if (this.searchService.optionsLookup) {
            return r => this.labelGetter(r);
        } else {
            return r => this.searchService.highlightMatches(this.labelGetter(r), this.query || "");
        }
    }

    @Input()
    public set optionFormatter(formatter:((option:T, query?:string) => string) | undefined) {
        this._optionFormatter = formatter;
    }

    private _localeValues:ISelectLocaleValues;
    public localeOverrides:RecursivePartial<ISelectLocaleValues>;

    public get localeValues():ISelectLocaleValues {
        return this._localizationService.override<"select">(this._localeValues, this.localeOverrides);
    }

    @Input()
    public transition:string;

    @Input()
    public transitionDuration:number;

    constructor(private _element:ElementRef, protected _localizationService:SuiLocalizationService) {
        this.dropdownService = new DropdownService();
        // We do want an empty query to return all results.
        this.searchService = new SearchService<T, U>(true);

        this.isSearchable = false;

        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
        this._renderedSubscriptions = [];

        this.transition = "slide down";
        this.transitionDuration = 200;

        this._selectClasses = true;
    }

    public ngAfterContentInit():void {
        this._menu.service = this.dropdownService;
        // We manually specify the menu items to the menu because the @ContentChildren doesn't pick up our dynamically rendered items.
        this._menu.items = this._renderedOptions;

        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onAvailableOptionsRendered();
        this._renderedOptions.changes.subscribe(() => this.onAvailableOptionsRendered());
    }

    private onLocaleUpdate():void {
        this._localeValues = this._localizationService.get().select;
    }

    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    protected optionsUpdateHook():void {}

    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    protected queryUpdateHook():void {}

    protected updateQuery(query:string):void {
        // Update the query then open the dropdown, as after keyboard input it should always be open.
        this.searchService.updateQuery(query, () =>
            this.dropdownService.setOpenState(true));
    }

    protected onAvailableOptionsRendered():void {
        // Unsubscribe from all previous subscriptions to avoid memory leaks on large selects.
        this._renderedSubscriptions.forEach(rs => rs.unsubscribe());
        this._renderedSubscriptions = [];

        this._renderedOptions.forEach(ro => {
            // Slightly delay initialisation to avoid change after checked errors. TODO - look into avoiding this!
            setTimeout(() => this.initialiseRenderedOption(ro));

            this._renderedSubscriptions.push(ro.onSelected.subscribe(() => this.selectOption(ro.value)));
        });
    }

    protected initialiseRenderedOption(option:ISelectRenderedOption<T>):void {
        option.usesTemplate = !!this.optionTemplate;
        option.formatter = this.configuredFormatter;

        if (option.usesTemplate) {
            this.drawTemplate(option.templateSibling, option.value);
        }
    }

    public abstract selectOption(option:T):void;

    protected findOption(options:T[], value:U):T | undefined {
        // Tries to find an option in options array
        return options.find(o => value === this.valueGetter(o));
    }

    public onCaretClick(e:HandledEvent):void {
        if (!e.eventHandled) {
            e.eventHandled = true;

            this.dropdownService.setOpenState(!this.dropdownService.isOpen);
        }
    }

    @HostListener("mousedown", ["$event"])
    public onMouseDown(e:MouseEvent):void {
        e.preventDefault();
    }

    @HostListener("click", ["$event"])
    public onClick(e:HandledEvent):void {
        if (!e.eventHandled && !this.dropdownService.isAnimating) {
            e.eventHandled = true;

            // If the dropdown is searchable, clicking should keep it open, otherwise we toggle the open state.
            this.dropdownService.setOpenState(this.isSearchable ? true : !this.dropdownService.isOpen);

            // Immediately focus the search input whenever clicking on the select.
            this.focus();
        }
    }

    @HostListener("focusin")
    private onFocusIn():void {
        if (!this.dropdownService.isAnimating) {
            this.dropdownService.setOpenState(true);
        }
    }

    @HostListener("focusout")
    private onFocusOut():void {
        this.dropdownService.setOpenState(false);
    }

    @HostListener("keypress", ["$event"])
    public onKeyPress(e:KeyboardEvent):void {
        if (e.keyCode === KeyCode.Enter) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
        }
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(e:MouseEvent):void {
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    }

    @HostListener("document:keydown", ["$event"])
    public onDocumentKeyDown(e:KeyboardEvent):void {
        if (this._element.nativeElement.contains(e.target) &&
            !this.dropdownService.isOpen &&
            e.keyCode === KeyCode.Down) {

            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();

            e.preventDefault();
        }
    }

    protected focus():void {
        if (this.isSearchable) {
            // Focusses the search input only when searchable.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._queryInput.nativeElement.focus();
        } else {
            this._element.nativeElement.focus();
        }
    }

    // Helper that draws the provided template beside the provided ViewContainerRef.
    protected drawTemplate(siblingRef:ViewContainerRef, value:T):void {
        siblingRef.clear();
        // Use of `$implicit` means use of <ng-template let-option> syntax is supported.
        siblingRef.createEmbeddedView(this.optionTemplate, {
            $implicit: value,
            query: this.query
        });
    }
}
