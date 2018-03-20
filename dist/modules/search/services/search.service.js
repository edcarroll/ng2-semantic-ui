import { Util } from "../../../misc/util/index";
var SearchService = /** @class */ (function () {
    function SearchService(allowEmptyQuery) {
        if (allowEmptyQuery === void 0) { allowEmptyQuery = false; }
        var _this = this;
        this._options = [];
        this.optionsFilter = function (os, q) {
            // Convert the query string to a RegExp.
            var regex = _this.toRegex(_this._query);
            if (regex instanceof RegExp) {
                // Only update the results if the query was valid regex.
                // This avoids the results suddenly becoming empty if an invalid regex string is inputted.
                return os
                    .filter(function (o) {
                    return Util.Object.readValue(o, _this._optionsField)
                        .toString()
                        .match(regex);
                });
            }
            // Don't update since it wasn't a valid regex.
            return false;
        };
        // Set default values and reset.
        this.allowEmptyQuery = allowEmptyQuery;
        this.searchDelay = 0;
        this.reset();
    }
    Object.defineProperty(SearchService.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = options || [];
            // We cannot use both local & remote options simultaneously.
            this._optionsLookup = undefined;
            // Reset entire service with new options.
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "optionsLookup", {
        get: function () {
            return this._optionsLookup;
        },
        set: function (lookupFn) {
            this._optionsLookup = lookupFn;
            // As before, cannot use local & remote options simultaneously.
            this._options = [];
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "hasItemLookup", {
        get: function () {
            return !!this.optionsLookup && this.optionsLookup.length === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "optionsField", {
        get: function () {
            return this._optionsField;
        },
        set: function (field) {
            this._optionsField = field;
            // We need to reset otherwise we would now be showing invalid search results.
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "results", {
        get: function () {
            return this._results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "query", {
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "isSearching", {
        get: function () {
            return this._isSearching;
        },
        enumerable: true,
        configurable: true
    });
    // Updates the query after the specified search delay.
    // Updates the query after the specified search delay.
    SearchService.prototype.updateQueryDelayed = 
    // Updates the query after the specified search delay.
    function (query, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        this._query = query;
        clearTimeout(this._searchDelayTimeout);
        this._searchDelayTimeout = window.setTimeout(function () {
            _this.updateQuery(query, callback);
        }, this.searchDelay);
    };
    // Updates the current search query.
    // Updates the current search query.
    SearchService.prototype.updateQuery = 
    // Updates the current search query.
    function (query, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
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
            var queryLookup = this._optionsLookup.call(undefined, this._query);
            queryLookup
                .then(function (results) {
                _this._isSearching = false;
                _this.updateResults(results);
                return callback();
            })
                .catch(function (error) {
                // Unset 'loading' state, and throw the returned error without updating the results.
                // Unset 'loading' state, and throw the returned error without updating the results.
                _this._isSearching = false;
                return callback(error);
            });
            return;
        }
        var filtered = this.optionsFilter.call(undefined, this._options, this._query);
        if (filtered) {
            this.updateResults(filtered);
        }
        return callback();
    };
    // Updates & caches the new set of results.
    // Updates & caches the new set of results.
    SearchService.prototype.updateResults = 
    // Updates & caches the new set of results.
    function (results) {
        this._resultsCache[this._query] = results;
        this._results = results;
    };
    // tslint:disable-next-line:promise-function-async
    // tslint:disable-next-line:promise-function-async
    SearchService.prototype.initialLookup = 
    // tslint:disable-next-line:promise-function-async
    function (initial) {
        if (initial instanceof Array) {
            return this._optionsLookup(undefined, initial);
        }
        return this._optionsLookup(undefined, initial);
    };
    // Converts a query string to regex without throwing an error.
    // Converts a query string to regex without throwing an error.
    SearchService.prototype.toRegex = 
    // Converts a query string to regex without throwing an error.
    function (query) {
        try {
            return new RegExp(query, "i");
        }
        catch (e) {
            return query;
        }
    };
    // Generates HTML for highlighted match text.
    // Generates HTML for highlighted match text.
    SearchService.prototype.highlightMatches = 
    // Generates HTML for highlighted match text.
    function (text, query) {
        var regex = this.toRegex(query);
        if (regex instanceof RegExp) {
            return text.replace(regex, function (match) { return "<b>" + match + "</b>"; });
        }
        return text;
    };
    // Resets the search back to a pristine state.
    // Resets the search back to a pristine state.
    SearchService.prototype.reset = 
    // Resets the search back to a pristine state.
    function () {
        this._results = [];
        this._resultsCache = {};
        this._isSearching = false;
        this.updateQuery("");
    };
    return SearchService;
}());
export { SearchService };
//# sourceMappingURL=search.service.js.map