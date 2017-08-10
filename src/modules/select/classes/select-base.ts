import {
    ViewChild, HostBinding, ElementRef, HostListener, Input, ContentChildren, QueryList, AfterViewInit,
    AfterContentInit, TemplateRef, ViewContainerRef, ContentChild, EventEmitter, Output, ViewChildren, ComponentRef
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/merge";
import { DropdownService, SuiDropdownMenu } from "../../dropdown";
import { SearchService, LookupFn, FilterFn } from "../../search";
import { Util, ITemplateRefContext, HandledEvent, KeyCode, SuiComponentFactory } from "../../../misc/util";
import { ISelectLocaleValues, RecursivePartial, SuiLocalizationService } from "../../../behaviors/localization";
import { SuiSelectOption } from "../components/select-option";
import { SuiSelectSearch } from "../directives/select-search";
import { SuiSelectOptions } from "../components/select-options";

export interface IOptionContext<T> extends ITemplateRefContext<T> {
    query?:string;
}

// We use generic type T to specify the type of the options we are working with,
// and U to specify the type of the property of the option used as the value.
export abstract class SuiSelectBase<T, U> implements AfterContentInit, AfterViewInit {
    public dropdownService:DropdownService;
    public searchService:SearchService<T, U>;

    @ViewChild(SuiDropdownMenu)
    protected _menu:SuiDropdownMenu;

    // Keep track of all of the rendered select options. (Rendered by the user using *ngFor).
    @ContentChildren(SuiSelectOption)
    protected _manualOptions:QueryList<SuiSelectOption<T>>;

    @ViewChild(SuiSelectOptions, { read: ViewContainerRef })
    private _internalOptionsContainer:ViewContainerRef;

    @ContentChild(SuiSelectOptions, { read: ViewContainerRef })
    private _manualOptionsContainer?:ViewContainerRef;

    public get optionsContainer():ViewContainerRef {
        return this._manualOptionsContainer || this._internalOptionsContainer;
    }

    // Sets the Semantic UI classes on the host element.
    @HostBinding("class.ui")
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

    @Input()
    public isSearchable:boolean;

    public isSearchExternal:boolean;

    @HostBinding("class.search")
    private get _searchClass():boolean {
        return this.isSearchable && !this.isSearchExternal;
    }

    @HostBinding("class.loading")
    public get isSearching():boolean {
        return this.searchService.isSearching;
    }

    @ViewChild(SuiSelectSearch)
    private _internalSearch?:SuiSelectSearch;

    @ContentChild(SuiSelectSearch)
    private _manualSearch?:SuiSelectSearch;

    public get searchInput():SuiSelectSearch | undefined {
        return this._manualSearch || this._internalSearch;
    }

    @Input("tabindex")
    private _tabIndex?:number;

    @HostBinding("attr.tabindex")
    public get tabIndex():number {
        if (this.isDisabled) {
            // If disabled, remove from tabindex.
            return -1;
        }
        if (this.dropdownService.isOpen && this.isSearchExternal) {
            // If open & in menu search, remove from tabindex (as input always autofocusses).
            return -1;
        }
        if (this._tabIndex != undefined) {
            // If custom tabindex, default to that.
            return this._tabIndex;
        }
        if (this._searchClass) {
            // If search input enabled, tab goes to input.
            return -1;
        }
        // Otherwise, return default of 0.
        return 0;
    }

    @HostBinding("class.disabled")
    @Input()
    public get isDisabled():boolean {
        return this.dropdownService.isDisabled;
    }

    public set isDisabled(value:boolean) {
        this.dropdownService.isDisabled = !!value;
    }

    @Input()
    public set options(options:T[]) {
        if (options) {
            this.searchService.options = options;

            this.optionsUpdateHook();
        }
    }

    @Input()
    public set optionsFilter(filter:FilterFn<T> | undefined) {
        if (filter) {
            this.searchService.optionsFilter = filter;

            this.optionsUpdateHook();
        }
    }

    @Input()
    public set optionsLookup(lookup:LookupFn<T, U> | undefined) {
        if (lookup) {
            this.searchService.optionsLookup = lookup;

            this.optionsUpdateHook();
        }
    }

    public get filteredOptions$():BehaviorSubject<T[]> {
        return this.searchService.results$;
    }

    private _renderedOptions:ComponentRef<SuiSelectOption<T>>[];
    private _renderedSubscription:Subscription;

    public get query():string | undefined {
        return this.isSearchable ? this.searchService.query : undefined;
    }

    public set query(query:string | undefined) {
        if (query != undefined) {
            this.queryUpdateHook();
            this.updateQuery(query);
            // Update the rendered text as query has changed.
            this._manualOptions.forEach(ro => ro.formatter = this.configuredFormatter);

            if (this.searchInput) {
                this.searchInput.query = query;
            }
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
        return (obj:T) => {
            const label = Util.Object.readValue<T, string>(obj, this.labelField);
            if (label != undefined) {
                return label.toString();
            }
            return "";
        };
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
            return o => this._optionFormatter!(o, this.isSearchable ? this.query : undefined);
        } else if (this.searchService.optionsLookup) {
            return o => this.labelGetter(o);
        } else {
            return o => this.searchService.highlightMatches(this.labelGetter(o), this.query || "");
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
    public icon:string;

    @Input()
    public transition:string;

    @Input()
    public transitionDuration:number;

    @Output("touched")
    public onTouched:EventEmitter<void>;

    constructor(private _element:ElementRef,
                private _componentFactory:SuiComponentFactory,
                protected _localizationService:SuiLocalizationService) {

        this.dropdownService = new DropdownService();
        // We do want an empty query to return all results.
        this.searchService = new SearchService<T, U>(true);

        this._renderedOptions = [];

        this.isSearchable = false;

        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());

        this.searchService.results$.subscribe(rs => this.renderOptions(rs));

        this.icon = "dropdown";
        this.transition = "slide down";
        this.transitionDuration = 200;

        this.onTouched = new EventEmitter<void>();

        this._selectClasses = true;
    }

    public ngAfterContentInit():void {
        this._menu.service = this.dropdownService;
        // We manually specify the menu items to the menu because the @ContentChildren doesn't pick up our dynamically rendered items.
        this._menu.items = this._manualOptions;
    }

    public ngAfterViewInit():void {
        if (this._manualSearch) {
            this.isSearchable = true;
            this.isSearchExternal = true;
        }

        if (this.searchInput) {
            this.searchInput.onQueryUpdated.subscribe((q:string) => this.query = q);
            this.searchInput.onQueryKeyDown.subscribe((e:KeyboardEvent) => this.onQueryInputKeydown(e));
        }

        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onManualOptionsRendered();
        this._manualOptions.changes.subscribe(() => this.onManualOptionsRendered());
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

    protected resetQuery(delayed:boolean = true):void {
        // The search delay is set to the transition duration to ensure results
        // aren't rendered as the select closes as that causes a sudden flash.
        if (delayed) {
            this.searchService.searchDelay = this._menu.menuTransitionDuration;
            this.searchService.updateQueryDelayed("");
        } else {
            this.searchService.updateQuery("");
        }

        if (this.searchInput) {
            this.searchInput.query = "";
        }
    }

    private renderOptions(options:T[]):void {
        if (this.optionsContainer) {
            this.optionsContainer.clear();
        }

        if (this._renderedSubscription) {
            this._renderedSubscription.unsubscribe();
        }

        this._renderedOptions.forEach(ro => ro.destroy());
        this._renderedOptions = [];

        options
            .slice()
            .reverse()
            .forEach(option => {
                const component = this._componentFactory.createComponent(SuiSelectOption);
                component.instance.option = option;

                this._componentFactory.attachToView(component, this.optionsContainer);
                this._renderedOptions.push(component);
            });

        this._renderedSubscription = Observable
            .merge(...this._renderedOptions.map(ro => ro.instance.onSelected))
            .subscribe((o:T) => {
                this.selectOption(o);
                this.updateRenderedOptions();
            });

        this.updateRenderedOptions();
    }

    private updateRenderedOptions():void {
        this._renderedOptions.forEach(ro => this.updateRenderedOption(ro.instance));
    }

    protected updateRenderedOption(option:SuiSelectOption<T>):void {
        option.query = this.query;
        option.formatter = this.configuredFormatter;
        option.template = this.optionTemplate;
    }

    protected onManualOptionsRendered():void {
        // If no options have been provided, autogenerate them from the rendered ones.
        if (this.searchService.options.length === 0 && !this.searchService.optionsLookup) {
            this.options = this._manualOptions.map(ro => ro.option);
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

            if (!this.dropdownService.isAnimating) {
                this.dropdownService.setOpenState(!this.dropdownService.isOpen);

                this.focus();
            }
        }
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
        if (!this.dropdownService.isOpen && !this.dropdownService.isAnimating) {
            this.dropdownService.setOpenState(true);

            this.focus();
        }
    }

    @HostListener("focusout", ["$event"])
    private onFocusOut(e:FocusEvent):void {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
            this.onTouched.emit();
        }
    }

    @HostListener("keypress", ["$event"])
    public onKeyPress(e:KeyboardEvent):void {
        if (e.keyCode === KeyCode.Enter) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
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

    public onQueryInputKeydown(event:KeyboardEvent):void {}

    protected focus():void {
        if (this.isSearchable && this.searchInput) {
            // Focusses the search input only when searchable.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this.searchInput.focus();
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
