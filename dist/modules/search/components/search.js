import { Component, ViewChild, HostBinding, Input, HostListener, EventEmitter, Output, ElementRef, TemplateRef, Renderer2 } from "@angular/core";
import { Util } from "../../../misc/util/index";
import { DropdownService, SuiDropdownMenu } from "../../dropdown/index";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
import { SearchService } from "../services/search.service";
var SuiSearch = /** @class */ (function () {
    function SuiSearch(_element, renderer, _localizationService) {
        var _this = this;
        this._element = _element;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService();
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(function () { return _this.onLocaleUpdate(); });
        this._searchClasses = true;
        this.hasIcon = true;
        this.allowEmptyQuery = false;
        this.retainSelectedResult = true;
        this.searchDelay = 200;
        this.maxResults = 7;
        this.onResultSelected = new EventEmitter();
        this.transition = "scale";
        this.transitionDuration = 200;
        this._documentClickListener = renderer.listen("document", "click", function (e) { return _this.onDocumentClick(e); });
    }
    Object.defineProperty(SuiSearch.prototype, "isActive", {
        get: function () {
            return this.dropdownService.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "allowEmptyQuery", {
        get: function () {
            return this._allowEmptyQuery;
        },
        set: 
        // Sets whether the search element display result with empty query.
        function (allowEmptyQuery) {
            this._allowEmptyQuery = allowEmptyQuery;
            this.searchService.allowEmptyQuery = allowEmptyQuery;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "placeholder", {
        get: 
        // Gets & sets the placeholder text displayed inside the text input.
        function () {
            return this._placeholder || this.localeValues.placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "localeValues", {
        get: function () {
            return this._localizationService.override(this._localeValues, this.localeOverrides);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "query", {
        get: function () {
            return this.searchService.query;
        },
        set: function (query) {
            var _this = this;
            this.selectedResult = undefined;
            // Initialise a delayed search.
            this.searchService.updateQueryDelayed(query, function () {
                // Set the results open state depending on whether a query has been entered.
                return 
                // Set the results open state depending on whether a query has been entered.
                _this.dropdownService.setOpenState(_this.searchService.query.length > 0 || _this.allowEmptyQuery);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "options", {
        set: function (options) {
            if (options) {
                this.searchService.options = options;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsFilter", {
        set: function (filter) {
            if (filter) {
                this.searchService.optionsFilter = filter;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsLookup", {
        set: function (lookupFn) {
            this.searchService.optionsLookup = lookupFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsField", {
        set: function (field) {
            this.searchService.optionsField = field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "resultFormatter", {
        get: function () {
            var _this = this;
            if (this._resultFormatter) {
                return this._resultFormatter;
            }
            else if (this.searchService.optionsLookup) {
                return function (r) { return _this.readValue(r); };
            }
            else {
                return function (r, q) { return _this.searchService.highlightMatches(_this.readValue(r), q); };
            }
        },
        set: function (formatter) {
            this._resultFormatter = formatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "searchDelay", {
        set: function (delay) {
            this.searchService.searchDelay = delay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "isSearching", {
        get: function () {
            return this.searchService.isSearching;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "results", {
        get: function () {
            return this.searchService.results.slice(0, this.maxResults);
        },
        enumerable: true,
        configurable: true
    });
    SuiSearch.prototype.ngAfterViewInit = function () {
        this._menu.service = this.dropdownService;
    };
    SuiSearch.prototype.onLocaleUpdate = function () {
        this._localeValues = this._localizationService.get().search;
    };
    // Selects a result.
    // Selects a result.
    SuiSearch.prototype.select = 
    // Selects a result.
    function (result) {
        this.onResultSelected.emit(result);
        this.dropdownService.setOpenState(false);
        if (this.retainSelectedResult) {
            this.selectedResult = result;
            this.searchService.updateQuery(this.readValue(result));
        }
        else {
            this.searchService.updateQuery("");
        }
    };
    SuiSearch.prototype.onClick = function (e) {
        this.open();
    };
    SuiSearch.prototype.onFocusIn = function () {
        if (!this.dropdownService.isAnimating) {
            this.open();
        }
    };
    SuiSearch.prototype.open = function () {
        if (this.searchService.query.length > 0 || this.allowEmptyQuery) {
            // Only open on click when there is a query entered.
            this.dropdownService.setOpenState(true);
        }
    };
    SuiSearch.prototype.onFocusOut = function (e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
        }
    };
    SuiSearch.prototype.onDocumentClick = function (e) {
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    };
    // Reads the specified field from an item.
    // Reads the specified field from an item.
    SuiSearch.prototype.readValue = 
    // Reads the specified field from an item.
    function (object) {
        return Util.Object.readValue(object, this.searchService.optionsField);
    };
    SuiSearch.prototype.ngOnDestroy = function () {
        this._documentClickListener();
    };
    SuiSearch.decorators = [
        { type: Component, args: [{
                    selector: "sui-search",
                    template: "\n<div class=\"ui input\" [class.icon]=\"hasIcon\" (click)=\"onClick($event)\">\n    <input class=\"prompt\" type=\"text\" [attr.placeholder]=\"placeholder\" autocomplete=\"off\" [(ngModel)]=\"query\">\n    <i *ngIf=\"hasIcon\" class=\"search icon\"></i>\n</div>\n<div class=\"results\"\n     suiDropdownMenu\n     [menuTransition]=\"transition\"\n     [menuTransitionDuration]=\"transitionDuration\"\n     menuSelectedItemClass=\"active\">\n\n    <sui-search-result *ngFor=\"let r of results\"\n                       class=\"item\"\n                       [value]=\"r\"\n                       [query]=\"query\"\n                       [formatter]=\"resultFormatter\"\n                       [template]=\"resultTemplate\"\n                       (click)=\"select(r)\"></sui-search-result>\n\n    <div *ngIf=\"results.length == 0\" class=\"message empty\">\n        <div class=\"header\">{{ localeValues.noResults.header }}</div>\n        <div class=\"description\">{{ localeValues.noResults.message }}</div>\n    </div>\n</div>\n",
                    styles: ["\n/* Ensures results div has margin. */\n:host {\n    display: inline-block;\n}\n\n/* Fixes positioning when results are pushed above the search. */\n.results {\n    margin-bottom: .5em;\n}\n"]
                },] },
    ];
    /** @nocollapse */
    SuiSearch.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: SuiLocalizationService, },
    ]; };
    SuiSearch.propDecorators = {
        "_menu": [{ type: ViewChild, args: [SuiDropdownMenu,] },],
        "_searchClasses": [{ type: HostBinding, args: ["class.ui",] }, { type: HostBinding, args: ["class.search",] },],
        "isActive": [{ type: HostBinding, args: ["class.active",] },],
        "hasIcon": [{ type: Input },],
        "allowEmptyQuery": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "options": [{ type: Input },],
        "optionsFilter": [{ type: Input },],
        "optionsLookup": [{ type: Input },],
        "optionsField": [{ type: Input },],
        "resultFormatter": [{ type: Input },],
        "resultTemplate": [{ type: Input },],
        "retainSelectedResult": [{ type: Input },],
        "searchDelay": [{ type: Input },],
        "isSearching": [{ type: HostBinding, args: ["class.loading",] },],
        "maxResults": [{ type: Input },],
        "onResultSelected": [{ type: Output, args: ["resultSelected",] },],
        "transition": [{ type: Input },],
        "transitionDuration": [{ type: Input },],
        "onFocusIn": [{ type: HostListener, args: ["focusin",] },],
        "onFocusOut": [{ type: HostListener, args: ["focusout", ["$event"],] },],
    };
    return SuiSearch;
}());
export { SuiSearch };
//# sourceMappingURL=search.js.map