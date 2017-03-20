import {readValue} from '../util/util';

// Define useful types to avoid any.
export type LookupFn<T> = (query:string) => Promise<T[]>
type CachedArray<T> = { [query:string]:T[] };

// T extends JavascriptObject so we can do a recursive search on the object.
export class SearchService<T> {
    // Stores the available options.
    private _options:T[];
    // Converts a query string into an array of options. Must be a function returning a promise.
    private _optionsLookup:LookupFn<T>;
    // Field that options are searched & displayed on.
    private _optionsField:string;
    
    public get options() {
        return this._options;
    }
    
    public set options(options:T[]) {
        this._options = options || [];
        // We cannot use both local & remote options simultaneously.
        this._optionsLookup = null;
        // Reset entire service with new options.
        this.reset();
    }

    public get optionsLookup() {
        return this._optionsLookup;
    }

    public set optionsLookup(lookupFn:LookupFn<T>) {
        this._optionsLookup = lookupFn;
        // As before, cannot use local & remote options simultaneously.
        this._options = [];
        this.reset();
    }

    public get optionsField() {
        return this._optionsField
    }

    public set optionsField(field:string) {
        this._optionsField = field;
        // We need to reset otherwise we would now be showing invalid search results.
        this.reset();
    }

    // Stores the results of the query.
    private _results:T[];
    // Cache of results, indexed by query.
    private _resultsCache:CachedArray<T>;

    public get results() {
        return this._results;
    }

    private _query:string;
    // Allows the empty query to produce results.
    public allowEmptyQuery:boolean;
    // How long to delay the search for when using updateQueryDelayed. Stored in ms.
    public searchDelay:number;
    // Stores the search timeout handle so we can cancel it.
    private _searchDelayTimeout:any;
    // Provides 'loading' functionality.
    private _isSearching:boolean;

    public get query() {
        return this._query;
    }

    public get isSearching() {
        return this._isSearching;
    }

    constructor(allowEmptyQuery:boolean = false) {
        this._options = [];

        // Set default values and reset.
        this.allowEmptyQuery = allowEmptyQuery;
        this.searchDelay = 0;
        this.reset();
    }

    // Updates the query after the specified search delay.
    public updateQueryDelayed(query:string, callback:(err?:Error) => void) {
        this._query = query;

        clearTimeout(this._searchDelayTimeout);
        this._searchDelayTimeout = setTimeout(() => {
            this.updateQuery(query, callback);
        }, this.searchDelay);
    }

    // Updates the current search query.
    public updateQuery(query:string, callback:(err?:Error) => void) {
        this._query = query;

        if (this._query == "" && !this.allowEmptyQuery) {
            // Don't update if the new query is empty (and we don't allow empty queries).
            // Don't reset so that when animating closed we don't get a judder.
            return callback(null);
        }

        if (this._resultsCache.hasOwnProperty(this._query)) {
            // If the query is already cached, make use of it.
            this._results = this._resultsCache[this._query];

            return callback(null);
        }

        if (this._optionsLookup) {
            this._isSearching = true;

            return this._optionsLookup(this._query)
                .then(results => {
                    // Unset 'loading' state, and display & cache the results.
                    this._isSearching = false;
                    this.updateResults(results);
                    return callback(null);
                })
                .catch(error => {
                    // Unset 'loading' state, and throw the returned error without updating the results.
                    this._isSearching = false;
                    return callback(error);
                });
        }

        // Convert the query string to a RegExp.
        const regex = this.toRegex(this._query);

        if (regex instanceof RegExp) {
            // Only update the results if the query was valid regex.
            // This avoids the results suddenly becoming empty if an invalid regex string is inputted.
            this.updateResults(this._options
                // Filter on the options with a string match on the field we are testing.
                .filter(o => readValue<T, string>(o, this._optionsField)
                    .toString()
                    .match(regex)));
        }

        return callback(null);
    }

    // Updates & caches the new set of results.
    private updateResults(results:T[]) {
        this._resultsCache[this._query] = results;
        this._results = results;
    }

    // Converts a query string to regex without throwing an error.
    private toRegex(query:string) {
        try {
            return new RegExp(query, 'i');
        }
        catch (e) {
            return query;
        }
    }

    // Generates HTML for highlighted match text.
    public highlightMatches(text:string) {
        let regex = this.toRegex(this._query);
        if (regex instanceof RegExp) {
            return text.replace(regex, (match) => `<b>${match}</b>`);
        }
        return text;
    }

    // Resets the search back to a pristine state.
    private reset() {
        this._query = "";
        this._results = [];
        if (this.allowEmptyQuery) {
            this._results = this._options;
        }
        this._resultsCache = {};
        this._isSearching = false;
    }
}