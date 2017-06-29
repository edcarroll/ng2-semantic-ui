import {
    Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener,
    EventEmitter, Output, forwardRef, Directive, ElementRef
} from "@angular/core";
import { DropdownService } from "../dropdown/dropdown.service";
import { SuiDropdownMenu } from "../dropdown/dropdown-menu";
import { SearchService, LookupFn } from "./search.service";
import { PositioningService, PositioningPlacement } from "../util/services/positioning.service";
import { customValueAccessorFactory, CustomValueAccessor, ICustomValueAccessorHost } from "../util/helpers/custom-value-accessor";
import { Util } from "../util/util";
import { SuiLocalizationService } from "../localization/services/localization.service";
import { ISearchLocaleValues } from "../localization/interfaces/search-values";

@Component({
    selector: "sui-search",
    template: `
<div class="ui input" [class.icon]="hasIcon" (click)="onClick($event)">
    <input class="prompt" type="text" [attr.placeholder]="placeholder" autocomplete="off" [(ngModel)]="query">
    <i *ngIf="hasIcon" class="search icon"></i>
</div>
<div class="results"
     suiDropdownMenu
     [menuTransition]="transition"
     [menuTransitionDuration]="transitionDuration"
     menuSelectedItemClass="active">

    <a class="result item" *ngFor="let r of results" (click)="select(r)">
        <span *ngIf="!searchService.optionsLookup" [innerHTML]="searchService.highlightMatches(r)"></span>
        <span *ngIf="searchService.optionsLookup">{{ readValue(r) }}</span>
    </a>
    <div *ngIf="results.length == 0" class="message empty">
        <div class="header">{{ localeValues.noResults.header }}</div>
        <div class="description">{{ localeValues.noResults.message }}</div>
    </div>
</div>
`,
    styles: [`
/* Ensures results div has margin. */
:host {
    display: inline-block;
}

/* Fixes positioning when results are pushed above the search. */
.results {
    margin-bottom: .5em;
}
`]
})
export class SuiSearch<T> implements AfterViewInit, ICustomValueAccessorHost<T> {
    public dropdownService:DropdownService;
    public searchService:SearchService<T>;

    @ViewChild(SuiDropdownMenu)
    private _menu:SuiDropdownMenu;

    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding("class.ui")
    @HostBinding("class.search")
    private _searchClasses:boolean;

    @HostBinding("class.active")
    public get isActive():boolean {
        return this.dropdownService.isOpen;
    }

    // Sets whether the search element has a visible search icon.
    @Input()
    public hasIcon:boolean;

    private _placeholder:string;

    // Gets & sets the placeholder text displayed inside the text input.
    @Input()
    public get placeholder():string {
        return this._placeholder || this.localeValues.placeholder;
    }

    public set placeholder(placeholder:string) {
        this._placeholder = placeholder;
    }

    private _localeValues:ISearchLocaleValues;

    public localeOverrides:Partial<ISearchLocaleValues>;

    public get localeValues():ISearchLocaleValues {
        return this._localizationService.overrideValues<"search">(this._localeValues, this.localeOverrides);
    }

    public get query():string {
        return this.searchService.query;
    }

    public set query(query:string) {
        this.selectedItem = undefined;
        // Initialise a delayed search.
        this.searchService.updateQueryDelayed(query, () =>
            // Set the results open state depending on whether a query has been entered.
            this.dropdownService.setOpenState(this.searchService.query.length > 0));
    }

    // Sets local or remote options by determining whether a function is passed.
    @Input()
    public set options(options:T[] | LookupFn<T>) {
        if (typeof options === "function") {
            this.searchService.optionsLookup = options;
            return;
        }
        this.searchService.options = options;
    }

    @Input()
    public set optionsField(field:string) {
        this.searchService.optionsField = field;
    }

    @Input()
    public set searchDelay(delay:number) {
        this.searchService.searchDelay = delay;
    }

    @HostBinding("class.loading")
    public get isSearching():boolean {
        return this.searchService.isSearching;
    }

    @Input()
    public maxResults:number;

    public get results():T[] {
        return this.searchService.results.slice(0, this.maxResults);
    }

    // Stores the currently selected item.
    public selectedItem?:T;

    // Emits whenever a new item is selected.
    @Output()
    public itemSelected:EventEmitter<T>;

    @Input()
    public transition:string;

    @Input()
    public transitionDuration:number;

    constructor(private _element:ElementRef, private _localizationService:SuiLocalizationService) {
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService<T>();

        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());

        this._searchClasses = true;
        this.hasIcon = true;
        this.searchDelay = 200;
        this.maxResults = 7;

        this.itemSelected = new EventEmitter<T>();

        this.transition = "scale";
        this.transitionDuration = 200;
    }

    public ngAfterViewInit():void {
        this._menu.service = this.dropdownService;
    }

    private onLocaleUpdate():void {
        this.localeValues = this._localizationService.getValues().search;
    }

    // Selects an item.
    public select(item:T):void {
        this.writeValue(item);
        this.itemSelected.emit(item);
        this.dropdownService.setOpenState(false);
    }

    public onClick(e:MouseEvent):void {
        this.open();
    }

    @HostListener("focusin")
    private onFocusIn():void {
        if (!this.dropdownService.isAnimating) {
            this.open();
        }
    }

    private open():void {
        if (this.searchService.query.length > 0) {
            // Only open on click when there is a query entered.
            this.dropdownService.setOpenState(true);
        }
    }

    @HostListener("focusout")
    private onFocusOut():void {
        this.dropdownService.setOpenState(false);
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(e:MouseEvent):void {
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    }

    // Reads the specified field from an item.
    public readValue(object:T):string {
        return Util.Object.readValue<T, string>(object, this.searchService.optionsField);
    }

    // Sets a specific item to be selected, updating the query automatically.
    public writeValue(item:T):void {
        this.selectedItem = item;
        this.searchService.updateQuery(item ? this.readValue(item) as string : "");
    }
}

// Value accessor directive for the search to support ngModel.
@Directive({
    selector: "sui-search",
    host: { "(itemSelected)": "onChange($event)" },
    providers: [customValueAccessorFactory(SuiSearchValueAccessor)]
})
export class SuiSearchValueAccessor<T> extends CustomValueAccessor<T, SuiSearch<T>> {
    constructor(host:SuiSearch<T>) {
        super(host);
    }
}
