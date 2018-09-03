import { Util } from "../../../misc/util/internal";
import { LookupFn, LookupFnResult, FilterFn } from "../helpers/lookup-fn";

interface ICachedArray<T> { [query:string]:T[]; }

export class SearchService<T, U> {
    // Stores the available options.
    private _options:T[];
    // Converts a query string into an array of options. Must be a function returning a promise.
    private _optionsLookup?:LookupFn<T, U>;
    // Field that options are searched & displayed on.
    private _optionsField?:string;
    // Filters a list of options.
    public optionsFilter:FilterFn<T>;

    public get options():T[] {
        return this._options;
    }

    public set options(options:T[]) {
        this._options = options || [];
        // We cannot use both local & remote options simultaneously.
        this._optionsLookup = undefined;
        // Reset entire service with new options.
        this.reset();
    }

    public get optionsLookup():LookupFn<T, U> | undefined {
        return this._optionsLookup;
    }

    public set optionsLookup(lookupFn:LookupFn<T, U> | undefined) {
        this._optionsLookup = lookupFn;
        // As before, cannot use local & remote options simultaneously.
        this._options = [];
        this.reset();
    }

    public get hasItemLookup():boolean {
        return !!this.optionsLookup && this.optionsLookup.length === 2;
    }

    public get optionsField():string | undefined {
        return this._optionsField;
    }

    public set optionsField(field:string | undefined) {
        this._optionsField = field;
        // We need to reset otherwise we would now be showing invalid search results.
        this.reset();
    }

    // Stores the results of the query.
    private _results:T[];
    // Cache of results, indexed by query.
    private _resultsCache:ICachedArray<T>;

    public get results():T[] {
        return this._results;
    }

    private _query:string;
    // Allows the query to be empty when the options change.
    public resetQueryOnChange:boolean;
    // Allows the empty query to produce results.
    public allowEmptyQuery:boolean;
    // How long to delay the search for when using updateQueryDelayed. Stored in ms.
    public searchDelay:number;
    // Stores the search timeout handle so we can cancel it.
    private _searchDelayTimeout:number;
    // Provides 'loading' functionality.
    private _isSearching:boolean;

    public get query():string {
        return this._query;
    }

    public get isSearching():boolean {
        return this._isSearching;
    }

    constructor(allowEmptyQuery:boolean = false) {
        this._options = [];
        this.optionsFilter = (os, q) => {
            // Convert the query string to a RegExp.
            const regex = this.toRegex(this._query);

            if (regex instanceof RegExp) {
                // Only update the results if the query was valid regex.
                // This avoids the results suddenly becoming empty if an invalid regex string is inputted.
                return os
                    // Filter on the options with a string match on the field we are testing.
                    .filter(o => Util.Object.readValue<T, string>(o, this._optionsField)
                        .toString()
                        .match(regex));
            }

            // Don't update since it wasn't a valid regex.
            return false;
        };

        // Set default values and reset.
        this.allowEmptyQuery = allowEmptyQuery;
        this._query = "";
        this.resetQueryOnChange = true;
        this.searchDelay = 0;
        this.reset();
    }

    // Updates the query after the specified search delay.
    public updateQueryDelayed(query:string, callback:(err?:Error) => void = () => {}):void {
        this._query = query;

        clearTimeout(this._searchDelayTimeout);
        this._searchDelayTimeout = window.setTimeout(
            () => {
                this.updateQuery(query, callback);
            },
            this.searchDelay
        );
    }

    // Updates the current search query.
    public updateQuery(query:string, callback:(err?:Error) => void = () => {}):void {
        this._query = query;

        if (this._query === "" && !this.allowEmptyQuery) {
            // Don't update if the new query is empty (and we don't allow empty queries).
            // Don't reset so that when animating closed we don't get a judder.
            return callback();
        }

        if (this._resultsCache.hasOwnProperty(this._query)) {
            // If the query is already cached, make use of it.
            this._results = this._resultsCache[this._query];

            return callback();
        }

        if (this._optionsLookup) {
            this._isSearching = true;

            // Call the options lookup without a this context.
            const queryLookup = this._optionsLookup.call(undefined, this._query) as LookupFnResult<T[]>;

            queryLookup
                .then(results => {
                    this._isSearching = false;

                    this.updateResults(results);
                    return callback();
                })
                .catch(error => {
                    // Unset 'loading' state, and throw the returned error without updating the results.
                    this._isSearching = false;
                    return callback(error);
                });

            return;
        }

        const filtered = this.optionsFilter.call(undefined, this._options, this._query);
        if (filtered) {
            this.updateResults(filtered);
        }
        return callback();
    }

    // Updates & caches the new set of results.
    private updateResults(results:T[]):void {
        this._resultsCache[this._query] = results;
        this._results = results;
    }

    // tslint:disable-next-line:promise-function-async
    public initialLookup(initial:U):LookupFnResult<T>;
    // tslint:disable-next-line:promise-function-async
    public initialLookup(initial:U[]):LookupFnResult<T[]>;
    // tslint:disable-next-line:promise-function-async
    public initialLookup(initial:U | U[]):LookupFnResult<T> | LookupFnResult<T[]> {
        if (initial instanceof Array) {
            return (this._optionsLookup as LookupFn<T, U[]>)(undefined, initial) as LookupFnResult<T[]>;
        }
        return (this._optionsLookup as LookupFn<T, U>)(undefined, initial) as LookupFnResult<T>;
    }

    // Converts a query string to regex without throwing an error.
    private toRegex(query:string):RegExp | string {
        try {
            return new RegExp(query, "i");
        } catch (e) {
            return query;
        }
    }

    // Generates HTML for highlighted match text.
    public highlightMatches(text:string, query:string):string {
        const regex = this.toRegex(query);
        if (regex instanceof RegExp) {
            return text.replace(regex, match => `<b>${match}</b>`);
        }
        return text;
    }

    // Resets the search back to a pristine state.
    private reset():void {
        this._results = [];
        this._resultsCache = {};
        this._isSearching = false;
        if (this.resetQueryOnChange || !this.query) {
            this.updateQuery("");
        } else {
            this.updateQuery(this.query);
        }
    }
}
