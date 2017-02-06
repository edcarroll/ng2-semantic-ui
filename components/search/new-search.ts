import {Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener} from '@angular/core';
import {DropdownService} from '../dropdown/dropdown.service';
import {SuiDropdownMenu} from '../dropdown/dropdown-menu';
import {readValue, RecursiveObject} from '../util/util';

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
        this.reset();
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

        try {
            this.updateResults(this._options
                .filter(o => readValue(o, this._optionsField)
                    .toString()
                    .toLowerCase()
                    .match(this._query.toLowerCase())));

            return callback(null);
        }
        catch (e) {
            return callback(e);
        }
    }

    private updateResults(results:T[]) {
        this._resultsCache[this._query] = results;
        this._results = results;
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
    <a class="result item" *ngFor="let r of results; let i = index">
        <!-- <div *ngIf="highlightMatch" class="title" [innerHTML]="highlight(result(i))"></div>
        <div *ngIf="!highlightMatch" class="title">{{ result(i) }}</div> -->
        {{ readValue(r) }}
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

    public set query(query:string) {
        clearTimeout(this._searchDelayTimeout);

        this._searchDelayTimeout = setTimeout(() => {
            this.searchService.updateQuery(query, (err) => {
                this.dropdownService.setOpenState(this.searchService.query.length > 0);
            });
        }, this.searchDelay);
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
    public searchDelay:number;

    private _searchDelayTimeout:any;

    @HostBinding('class.loading')
    public get isSearching() {
        return this.searchService.isSearching;
    }

    public get results() {
        return this.searchService.results;
    }

    constructor() {
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService<T>();

        this._searchClasses = true;
        this.hasIcon = true;
        this.placeholder = "Search...";

        this.searchDelay = 200;
    }

    public ngAfterViewInit() {
        this._menu.service = this.dropdownService;
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        e.stopPropagation();

        if (this.searchService.query.length > 0) {
            this.dropdownService.setOpenState(true);
        }
    }

    public readValue(object:T) {
        return readValue<T>(object, this.searchService.optionsField);
    }
}