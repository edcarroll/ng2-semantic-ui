import {Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener, EventEmitter, Output, forwardRef, Directive} from '@angular/core';
import {DropdownService} from '../dropdown/dropdown.service';
import {SuiDropdownMenu} from '../dropdown/dropdown-menu';
import {readValue, RecursiveObject} from '../util/util';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export type LookupFn<T> = (query:string) => Promise<T[]>
type CachedArray<T> = { [query:string]:T[] };

export class SearchService<T extends RecursiveObject> {
    private _options:T[];
    private _optionsLookup:LookupFn<T>;
    private _optionsField:string;
    
    public set options(options:T[]) {
        this._options = options || [];
        this._optionsLookup = null;
        this.reset();
    }

    public get optionsLookup() {
        return this._optionsLookup;
    }

    public set optionsLookup(lookupFn:LookupFn<T>) {
        this._optionsLookup = lookupFn;
        this._options = [];
        this.reset();
    }

    public get optionsField() {
        return this._optionsField
    }

    public set optionsField(field:string) {
        this._optionsField = field;
        this.reset();
    }

    private _results:T[];
    private _resultsCache:CachedArray<T>;

    public get results() {
        return this._results;
    }

    private _query:string;
    public allowEmptyQuery:boolean;
    public searchDelay:number;
    private _searchDelayTimeout:any;
    private _isSearching:boolean;

    public get query() {
        return this._query;
    }

    public get isSearching() {
        return this._isSearching;
    }

    constructor() {
        this._options = [];

        this.allowEmptyQuery = false;
        this.searchDelay = 0;
        this.reset();
    }

    public updateQueryDelayed(query:string, callback:(err?:Error) => void) {
        clearTimeout(this._searchDelayTimeout);
        this._searchDelayTimeout = setTimeout(() => {
            this.updateQuery(query, callback);
        }, this.searchDelay);
    }

    public updateQuery(query:string, callback:(err?:Error) => void) {
        this._query = query;

        if (this._query == "" && !this.allowEmptyQuery) {
            return callback(null);
        }

        if (this._resultsCache.hasOwnProperty(this._query)) {
            this._results = this._resultsCache[this._query];

            return callback(null);
        }

        if (this._optionsLookup) {
            this._isSearching = true;

            return this._optionsLookup(this._query)
                .then(results => {
                    this._isSearching = false;
                    this.updateResults(results);
                    return callback(null);
                })
                .catch(error => {
                    this._isSearching = false;
                    return callback(error);
                });
        }

        const regex = this.toRegex(this._query);

        if (regex instanceof RegExp) {
            this.updateResults(this._options
                .filter(o => readValue(o, this._optionsField)
                    .toString()
                    .match(regex)));
        }

        return callback(null);
    }

    private updateResults(results:T[]) {
        this._resultsCache[this._query] = results;
        this._results = results;
    }

    private toRegex(query:string) {
        try {
            return new RegExp(query, 'i');
        }
        catch (e) {
            return query;
        }
    }

    public highlightMatches(text:string) {
        let regex = this.toRegex(this._query);
        if (regex instanceof RegExp) {
            return text.replace(regex, (match) => `<b>${match}</b>`);
        }
        return text;
    }

    private reset() {
        this._query = "";
        this._results = [];
        this._resultsCache = {};
        this._isSearching = false;
    }
}

@Component({
    selector: 'sui-search',
    template: `
<div class="ui input" [class.icon]="hasIcon">
    <input class="prompt" type="text" [attr.placeholder]="placeholder" autocomplete="off" [(ngModel)]="query">
    <i *ngIf="hasIcon" class="search icon"></i>
  </div>
<div class="results" suiDropdownMenu transition="scale" selectedItemClass="active">
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
:host {
    display: inline-block;
}
`]
})
export class SuiSearch<T extends RecursiveObject> implements AfterViewInit {
    public dropdownService:DropdownService;
    public searchService:SearchService<T>;

    @ViewChild(SuiDropdownMenu)
    private _menu:SuiDropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.search')
    private _searchClasses:boolean;

    @HostBinding('class.active')
    public get isActive() {
        return this.dropdownService.isOpen;
    }

    @Input()
    public hasIcon:boolean;

    @Input()
    public placeholder:string;

    public get query() {
        return this.searchService.query;
    }

    public set query(query:string) {
        this.selectedItem = null;
        this.searchService.updateQueryDelayed(query, () => this.dropdownService.setOpenState(this.searchService.query.length > 0));
    }

    @Input()
    public set options(options:T[] | LookupFn<T>) {
        if (typeof(options) == "function") {
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

    public selectedItem:T;

    @Output()
    public onItemSelected:EventEmitter<T>;

    public get ngModelChange() {
        return this.onItemSelected;
    }

    constructor() {
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService<T>();

        this._searchClasses = true;
        this.hasIcon = true;
        this.placeholder = "Search...";

        this.searchDelay = 200;

        this.onItemSelected = new EventEmitter<T>();
    }

    public ngAfterViewInit() {
        this._menu.service = this.dropdownService;
    }

    public select(item:T) {
        this.writeValue(item);
        this.onItemSelected.emit(item);
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        e.stopPropagation();

        if (this.searchService.query.length > 0) {
            this.dropdownService.setOpenState(true);
        }
    }

    public readValue(object:T) {
        return readValue(object, this.searchService.optionsField);
    }

    public writeValue(item:T) {
        if (item) {
            this.selectedItem = item;
            this.searchService.updateQuery(this.readValue(item) as string, () => {});
        }
    }
}

export const SELECT_VALUE_ACCESSOR:any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiSearchValueAccessor),
    multi: true
};

@Directive({
    selector: 'sui-search',
    host: {
        '(onItemSelected)': 'onChange($event)'
    },
    providers: [SELECT_VALUE_ACCESSOR]
})
export class SuiSearchValueAccessor<T extends RecursiveObject> implements ControlValueAccessor {
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