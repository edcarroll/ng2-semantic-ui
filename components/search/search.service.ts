import {RecursiveObject, readValue} from '../util/util';

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