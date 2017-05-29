import {Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener, EventEmitter, Output, forwardRef, Directive, ElementRef} from '@angular/core';
import {DropdownService} from '../dropdown/dropdown.service';
import {SuiDropdownMenu} from '../dropdown/dropdown-menu';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {SearchService, LookupFn} from './search.service';
import {readValue} from '../util/util';
import {PositioningService, PositioningPlacement} from '../util/positioning.service';

@Component({
    selector: 'sui-search',
    template: `
<div class="ui input" [class.icon]="hasIcon">
    <input class="prompt" type="text" [attr.placeholder]="placeholder" autocomplete="off" [(ngModel)]="query">
    <i *ngIf="hasIcon" class="search icon"></i>
  </div>
<div class="results" suiDropdownMenu menuTransition="scale" menuSelectedItemClass="active">
    <a class="result item" *ngFor="let r of results" (click)="select(r)">
        <span *ngIf="!searchService.optionsLookup" [innerHTML]="searchService.highlightMatches(r)"></span>
        <span *ngIf="searchService.optionsLookup">{{ readValue(r) }}</span>
    </a>
    <div *ngIf="results.length == 0" class="message empty">
        <div class="header">No Results</div>
        <div class="description">Your search returned no results.</div>
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
export class SuiSearch<T> implements AfterViewInit {
    public dropdownService:DropdownService;
    public searchService:SearchService<T>;

    @ViewChild(SuiDropdownMenu)
    private _menu:SuiDropdownMenu;

    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding('class.ui')
    @HostBinding('class.search')
    private _searchClasses:boolean;

    @HostBinding('class.active')
    public get isActive() {
        return this.dropdownService.isOpen;
    }

    // Sets whether the search element has a visible search icon.
    @Input()
    public hasIcon:boolean;

    // Sets the placeholder text displayed inside the text input.
    @Input()
    public placeholder:string;

    public get query() {
        return this.searchService.query;
    }

    public set query(query:string) {
        this.selectedItem = null;
        // Initialise a delayed search.
        this.searchService.updateQueryDelayed(query, () =>
            // Set the results open state depending on whether a query has been entered.
            this.dropdownService.setOpenState(this.searchService.query.length > 0));
    }

    // Sets local or remote options by determining whether a function is passed.
    @Input()
    public set options(options:T[] | LookupFn<T>) {
        if (typeof options == "function") {
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

    @HostBinding('class.loading')
    public get isSearching() {
        return this.searchService.isSearching;
    }

    public get results() {
        return this.searchService.results;
    }

    // Stores the currently selected item.
    public selectedItem:T;

    // Emits whenever a new item is selected.
    @Output()
    public itemSelected:EventEmitter<T>;

    constructor(private _element:ElementRef) {
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService<T>();

        this._searchClasses = true;
        this.hasIcon = true;
        this.placeholder = "Search...";

        this.searchDelay = 200;

        this.itemSelected = new EventEmitter<T>();
    }

    public ngAfterViewInit() {
        this._menu.service = this.dropdownService;
    }

    // Selects an item.
    public select(item:T) {
        this.writeValue(item);
        this.itemSelected.emit(item);
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        if (this.searchService.query.length > 0) {
            // Only open on click when there is a query entered.
            this.dropdownService.setOpenState(true);
        }
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(e:MouseEvent) {
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    }

    // Reads the specified field from an item.
    public readValue(object:T) {
        return readValue<T, string>(object, this.searchService.optionsField);
    }

    // Sets a specific item to be selected, updating the query automatically.
    public writeValue(item:T) {
        this.selectedItem = item;
        this.searchService.updateQuery(item ? this.readValue(item) as string : "");
    }
}

// Value accessor for the search.
export const SEARCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiSearchValueAccessor),
    multi: true
};

// Value accessor directive for the search to support ngModel.
@Directive({
    selector: 'sui-search',
    host: {
        '(onItemSelected)': 'onChange($event)'
    },
    providers: [SEARCH_VALUE_ACCESSOR]
})
export class SuiSearchValueAccessor<T> implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host:SuiSearch<T>) {}

    writeValue(value:T) {
        this.host.writeValue(value);
    }

    registerOnChange(fn:() => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn:() => void) {
        this.onTouched = fn;
    }
}