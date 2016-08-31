var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Directive, HostListener, HostBinding, ElementRef, ViewChild, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SuiDropdownMenu } from "../dropdown/dropdown-menu";
import { SuiDropdown } from "../dropdown/dropdown";
export var SuiSearch = (function (_super) {
    __extends(SuiSearch, _super);
    function SuiSearch(el) {
        _super.call(this, el);
        this.searchClasses = true;
        this.placeholder = "Search...";
        this.searchDelay = 200;
        this.icon = true;
        this.selectedOptionChange = new EventEmitter(false);
        this.onItemSelected = new EventEmitter(false);
        this._options = [];
        this._allowEmptyQuery = false;
        this._query = "";
        this._results = [];
        this._resultsCache = {};
        this._loading = false;
        this._service.itemClass = "result";
        this._service.itemSelectedClass = "active";
    }
    Object.defineProperty(SuiSearch.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            if (typeof (value) == "function") {
                this._optionsLookup = value;
                return;
            }
            this._options = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "query", {
        get: function () {
            return this._query;
        },
        set: function (value) {
            var _this = this;
            this._query = value;
            clearTimeout(this._queryTimer);
            if (value || this._allowEmptyQuery) {
                this._queryTimer = setTimeout(function () {
                    _this.search(function () {
                        _this.isOpen = true;
                    });
                }, this.searchDelay);
                return;
            }
            if (!this._allowEmptyQuery) {
                this.isOpen = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "results", {
        get: function () {
            return this._results;
        },
        enumerable: true,
        configurable: true
    });
    SuiSearch.prototype.search = function (callback) {
        var _this = this;
        this._loading = true;
        if (this._optionsLookup) {
            if (this._resultsCache[this._query]) {
                this._results = this._resultsCache[this._query];
                this._loading = false;
                if (callback) {
                    callback();
                }
                return;
            }
            this._optionsLookup(this._query).then(function (results) {
                _this._resultsCache[_this._query] = results;
                _this.search(callback);
            });
            return;
        }
        this._results = this.options.filter(function (o) { return _this.readValue(o).toString().slice(0, _this.query.length).toLowerCase() == _this.query.toLowerCase(); });
        this._loading = false;
        if (callback) {
            callback();
        }
    };
    SuiSearch.prototype.result = function (i) {
        return this.readValue(this._results[i]);
    };
    //noinspection JSMethodCanBeStatic
    SuiSearch.prototype.deepValue = function (object, path) {
        if (!object) {
            return;
        }
        if (!path) {
            return object;
        }
        for (var i = 0, p = path.split('.'), len = p.length; i < len; i++) {
            object = object[p[i]];
        }
        return object;
    };
    SuiSearch.prototype.readValue = function (object) {
        return this.deepValue(object, this.optionsField);
    };
    SuiSearch.prototype.select = function (result) {
        this.selectedOption = result;
        this.selectedOptionChange.emit(result);
        this.onItemSelected.emit(result);
        this._query = this.readValue(result);
        this.isOpen = false;
    };
    SuiSearch.prototype.writeValue = function (value) {
        this.selectedOption = value;
        this._query = this.readValue(value);
    };
    SuiSearch.prototype.ngAfterContentInit = function () {
        //Override this
        return;
    };
    SuiSearch.prototype.ngAfterViewInit = function () {
        this._menu.service = this._service;
    };
    SuiSearch.prototype.click = function (event) {
        var _this = this;
        event.stopPropagation();
        if (!this._service.menuElement.nativeElement.contains(event.target)) {
            if (!this.isOpen && this.query) {
                if (this.results.length) {
                    this.isOpen = true;
                }
                this._loading = true;
                this.search(function () {
                    _this.isOpen = true;
                    _this._loading = false;
                });
            }
        }
        return false;
    };
    __decorate([
        ViewChild(SuiDropdownMenu), 
        __metadata('design:type', SuiDropdownMenu)
    ], SuiSearch.prototype, "_menu", void 0);
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.search'), 
        __metadata('design:type', Object)
    ], SuiSearch.prototype, "searchClasses", void 0);
    __decorate([
        HostBinding('class.loading'), 
        __metadata('design:type', Boolean)
    ], SuiSearch.prototype, "_loading", void 0);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', Boolean)
    ], SuiSearch.prototype, "click", null);
    SuiSearch = __decorate([
        Component({
            selector: 'sui-search',
            exportAs: 'suiSearch',
            inputs: ['placeholder', 'options', 'optionsField', 'searchDelay', 'icon'],
            outputs: ['selectedOptionChange', 'onItemSelected'],
            host: {
                '[class.visible]': 'isOpen',
                '[class.disabled]': 'isDisabled'
            },
            template: "\n<div class=\"ui icon input\">\n    <input class=\"prompt\" type=\"text\" [attr.placeholder]=\"placeholder\" autocomplete=\"off\" [(ngModel)]=\"query\">\n    <i *ngIf=\"icon\" class=\"search icon\"></i>\n  </div>\n<div class=\"results\" suiDropdownMenu>\n    <a class=\"result\" *ngFor=\"let r of results; let i = index\" (click)=\"select(r)\">\n        <div class=\"title\">{{ result(i) }}</div>\n    </a>\n    <div *ngIf=\"!results.length\" class=\"message empty\">\n        <div class=\"header\">No Results</div>\n        <div class=\"description\">Your search returned no results.</div>\n    </div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], SuiSearch);
    return SuiSearch;
}(SuiDropdown));
export var CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SuiSearchValueAccessor; }),
    multi: true
};
export var SuiSearchValueAccessor = (function () {
    function SuiSearchValueAccessor(host) {
        this.host = host;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    SuiSearchValueAccessor.prototype.writeValue = function (value) {
        this.host.writeValue(value);
    };
    SuiSearchValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    SuiSearchValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    SuiSearchValueAccessor = __decorate([
        Directive({
            selector: 'sui-search',
            host: { '(selectedOptionChange)': 'onChange($event)' },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [SuiSearch])
    ], SuiSearchValueAccessor);
    return SuiSearchValueAccessor;
}());
export var SUI_SEARCH_DIRECTIVES = [SuiSearch, SuiSearchValueAccessor];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/search/search.js.map