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
import { Component, Directive, ViewChild, HostBinding, ElementRef, HostListener, forwardRef, ViewContainerRef, QueryList, ContentChildren, ViewChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SuiDropdownMenu } from "../dropdown/dropdown-menu";
import { SuiSearch, SuiSearchValueAccessor } from "../search/search";
import { SuiSelectOption, SuiSelectMultiLabel } from "./select-option";
import { KEYCODE } from '../../components/dropdown/dropdown.service';
export var SuiSelect = (function (_super) {
    __extends(SuiSelect, _super);
    function SuiSelect(el) {
        var _this = this;
        _super.call(this, el);
        this.el = el;
        this.renderedOptionsSubscriptions = [];
        this.renderedSelectedOptionsSubscriptions = [];
        this.searchClasses = true;
        this.isSearchable = false;
        this.allowMultiple = false;
        this.searchDelay = 0;
        this._loading = false;
        this.placeholder = "Select one";
        this.selectedOptions = [];
        this.maxSelectedReached = false;
        this._allowEmptyQuery = true;
        this._service.autoClose = "outsideClick";
        this._service.itemClass = "item";
        this._service.itemSelectedClass = "selected";
        this._service.isOpenChange.subscribe(function (isOpen) {
            if (isOpen) {
                if (_this.isSearchable && !_this._service.selectedItem) {
                    _this._service.selectNextItem();
                }
            }
            else {
                if (_this.query && !_this.allowMultiple) {
                    if (_this._service.selectedItem) {
                        _this._service.selectedItem.click();
                        return;
                    }
                    _this._query = "";
                }
            }
        });
    }
    Object.defineProperty(SuiSelect.prototype, "isOpen", {
        get: function () {
            return this._service.isOpen;
        },
        set: function (value) {
            this._service.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelect.prototype, "results", {
        get: function () {
            var _this = this;
            this.maxSelectedReached = false;
            var results = this.options;
            if (this.isSearchable || this._optionsLookup) {
                results = this._results;
            }
            if (this.allowMultiple) {
                results = results.filter(function (r) { return (_this.selectedOptions || []).indexOf(r) == -1; });
                if (this.selectedOptions && this.maxSelected == this.selectedOptions.length) {
                    this.maxSelectedReached = true;
                    results = [];
                }
            }
            return results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelect.prototype, "availableOptions", {
        get: function () {
            return this.results;
        },
        enumerable: true,
        configurable: true
    });
    SuiSelect.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.isSearchable) {
            //Initialise initial results
            this.search();
        }
        this.renderedOptionsSubscribe();
        this.renderedOptions.changes.subscribe(function () { return _this.renderedOptionsSubscribe(); });
        setTimeout(function () {
            if (!_this.allowMultiple) {
                _this.renderSelectedItem();
            }
        });
    };
    SuiSelect.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        this.renderedSelectedOptionsSubscribe();
        this.renderedSelectedOptions.changes.subscribe(function () { return _this.renderedSelectedOptionsSubscribe(); });
    };
    SuiSelect.prototype.renderedOptionsSubscribe = function () {
        var _this = this;
        this.renderedOptionsSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this.renderedOptionsSubscriptions = [];
        this.renderedOptions.forEach(function (option) {
            _this.renderedOptionsSubscriptions.push(option.selected.subscribe(function (value) {
                _this.selectOption(value);
            }));
            setTimeout(function () {
                option.useTemplate = !!_this.optionTemplate;
                option.readValue = function (v) { return _this.readValue(v); };
                if (option.useTemplate) {
                    option.viewContainerRef.clear();
                    option.viewContainerRef.createEmbeddedView(_this.optionTemplate, { option: option.value });
                }
            });
        });
    };
    SuiSelect.prototype.renderedSelectedOptionsSubscribe = function () {
        var _this = this;
        this.renderedSelectedOptionsSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this.renderedSelectedOptionsSubscriptions = [];
        this.renderedSelectedOptions.forEach(function (label) {
            _this.renderedSelectedOptionsSubscriptions.push(label.selected.subscribe(function (value) {
                _this.deselectOption(value);
            }));
            setTimeout(function () {
                label.useTemplate = !!_this.optionTemplate;
                label.readValue = function (v) { return _this.readValue(v); };
                if (label.useTemplate) {
                    label.viewContainerRef.clear();
                    label.viewContainerRef.createEmbeddedView(_this.optionTemplate, { option: label.value });
                }
            });
        });
    };
    SuiSelect.prototype.renderSelectedItem = function () {
        if (this.selectedOption && this.optionTemplate) {
            this.selectedOptionContainer.clear();
            this.selectedOptionContainer.createEmbeddedView(this.optionTemplate, { option: this.selectedOption });
        }
    };
    SuiSelect.prototype.selectOption = function (value) {
        if (!this.allowMultiple) {
            _super.prototype.select.call(this, value);
            this.renderSelectedItem();
        }
        else {
            this.selectedOptions = this.selectedOptions || [];
            this.selectedOptions.push(value);
            this.selectedOptionChange.emit(this.selectedOptions);
            this.onItemSelected.emit(value);
        }
        if (this.isSearchable) {
            this.focusFirstItem();
            this.focusSearch();
        }
        this._query = "";
        if (this.isSearchable) {
            this.search();
        }
    };
    SuiSelect.prototype.deselectOption = function (option) {
        var index = this.selectedOptions.indexOf(option);
        this.selectedOptions.splice(index, 1);
        this.selectedOptionChange.emit(this.selectedOptions);
        if (this.isSearchable) {
            this.focusFirstItem();
        }
    };
    SuiSelect.prototype.focusSearch = function () {
        if (this.isSearchable) {
            this._service.dropdownElement.nativeElement.querySelector("input").focus();
        }
    };
    SuiSelect.prototype.focusFirstItem = function () {
        var _this = this;
        setTimeout(function () {
            _this._service.selectedItem = null;
            _this._service.selectNextItem();
        });
    };
    SuiSelect.prototype.writeValue = function (value) {
        var _this = this;
        if (this.allowMultiple) {
            //This allows all of the possible results to load in first, so we can set the innerHTML correctly without using a template.
            setTimeout(function () {
                _this.selectedOptions = value;
            });
            return;
        }
        this.selectedOption = value;
    };
    SuiSelect.prototype.click = function (event) {
        var _this = this;
        event.stopPropagation();
        if (!this._service.menuElement.nativeElement.contains(event.target)) {
            if (!this.isOpen) {
                this.search(function () {
                    _this._loading = false;
                    _this.isOpen = true;
                    _this.focusSearch();
                });
            }
            else if (event.target.tagName != "INPUT") {
                this.isOpen = false;
            }
        }
        return false;
    };
    SuiSelect.prototype.searchKeyDown = function (event) {
        if (event.which == KEYCODE.BACKSPACE && !this._query) {
            var selectedOptions = this.selectedOptions || [];
            var lastSelectedOption = selectedOptions[selectedOptions.length - 1];
            if (lastSelectedOption) {
                this.deselectOption(lastSelectedOption);
            }
        }
    };
    __decorate([
        ViewChild(SuiDropdownMenu), 
        __metadata('design:type', SuiDropdownMenu)
    ], SuiSelect.prototype, "_menu", void 0);
    __decorate([
        ViewChild('selectedOptionRenderTarget', { read: ViewContainerRef }), 
        __metadata('design:type', ViewContainerRef)
    ], SuiSelect.prototype, "selectedOptionContainer", void 0);
    __decorate([
        ContentChildren(SuiSelectOption), 
        __metadata('design:type', QueryList)
    ], SuiSelect.prototype, "renderedOptions", void 0);
    __decorate([
        ViewChildren(SuiSelectMultiLabel), 
        __metadata('design:type', QueryList)
    ], SuiSelect.prototype, "renderedSelectedOptions", void 0);
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.selection'),
        HostBinding('class.dropdown'), 
        __metadata('design:type', Object)
    ], SuiSelect.prototype, "searchClasses", void 0);
    __decorate([
        HostBinding('class.search'), 
        __metadata('design:type', Boolean)
    ], SuiSelect.prototype, "isSearchable", void 0);
    __decorate([
        HostBinding('class.multiple'), 
        __metadata('design:type', Boolean)
    ], SuiSelect.prototype, "allowMultiple", void 0);
    __decorate([
        HostBinding('class.loading'), 
        __metadata('design:type', Boolean)
    ], SuiSelect.prototype, "_loading", void 0);
    __decorate([
        HostBinding('class.active'), 
        __metadata('design:type', Boolean)
    ], SuiSelect.prototype, "isOpen", null);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', Boolean)
    ], SuiSelect.prototype, "click", null);
    SuiSelect = __decorate([
        Component({
            selector: 'sui-select',
            exportAs: 'suiSelect',
            directives: [SuiSelectMultiLabel],
            inputs: ['placeholder', 'options', 'optionsField', 'isSearchable', 'searchDelay', 'isDisabled', 'allowMultiple', 'maxSelected', 'optionTemplate'],
            outputs: ['selectedOptionChange'],
            host: {
                '[class.visible]': 'isOpen',
                '[class.disabled]': 'isDisabled'
            },
            template: "\n<i class=\"dropdown icon\"></i>\n<!-- Multi-select labels -->\n<sui-select-multi-label *ngFor=\"let selected of selectedOptions;\" [value]=\"selected\"></sui-select-multi-label>\n<!-- Search input box -->\n<input *ngIf=\"isSearchable\" class=\"search\" type=\"text\" autocomplete=\"off\" [(ngModel)]=\"query\" (keydown)=\"searchKeyDown($event)\">\n<!-- Single-select label -->\n<div *ngIf=\"!selectedOption\" class=\"default text\" [class.filtered]=\"query\">{{ placeholder }}</div>\n<div [hidden]=\"!selectedOption\" class=\"text\" [class.filtered]=\"query\">\n    <span #selectedOptionRenderTarget></span>\n    <span *ngIf=\"!optionTemplate\">{{ deepValue(selectedOption, optionsField) }}</span>\n</div>\n<!-- Select dropdown menu -->\n<div class=\"menu\" suiDropdownMenu>\n    <ng-content></ng-content>\n    <div *ngIf=\"isSearchable && !results.length && !maxSelectedReached\" class=\"message\">No Results</div>\n    <div *ngIf=\"!results.length && maxSelectedReached\" class=\"message\">Max {{ maxSelected }} selections</div>\n</div>\n",
            styles: ["\n:host input.search {\n    width: 12em !important;\n} \n.selected-results {\n    display: none;\n}\n"]
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], SuiSelect);
    return SuiSelect;
}(SuiSearch));
export var CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SuiSelectValueAccessor; }),
    multi: true
};
export var SuiSelectValueAccessor = (function (_super) {
    __extends(SuiSelectValueAccessor, _super);
    function SuiSelectValueAccessor(host) {
        _super.call(this, host);
    }
    SuiSelectValueAccessor = __decorate([
        Directive({
            selector: 'sui-select',
            host: { '(selectedOptionChange)': 'onChange($event)' },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [SuiSelect])
    ], SuiSelectValueAccessor);
    return SuiSelectValueAccessor;
}(SuiSearchValueAccessor));
export var SUI_SELECT_DIRECTIVES = [SuiSelect, SuiSelectOption, SuiSelectValueAccessor];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/select/select.js.map