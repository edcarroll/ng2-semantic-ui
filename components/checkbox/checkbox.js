var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SuiCheckbox = (function () {
    function SuiCheckbox() {
        this.classes = true;
        this.checked = false;
        this.checkChange = new EventEmitter(false);
        this.isDisabled = false;
        this.isReadonly = false;
    }
    Object.defineProperty(SuiCheckbox.prototype, "checkedAttribute", {
        get: function () {
            return this.checked ? "" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCheckbox.prototype, "isDisabledAttribute", {
        get: function () {
            return this.isDisabled ? "disabled" : null;
        },
        enumerable: true,
        configurable: true
    });
    SuiCheckbox.prototype.onClick = function () {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
        }
    };
    SuiCheckbox.prototype.toggle = function () {
        this.checked = !this.checked;
        this.checkChange.emit(this.checked);
    };
    SuiCheckbox.prototype.writeValue = function (value) {
        var _this = this;
        setTimeout(function () {
            _this.checked = value;
        });
    };
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.checkbox'), 
        __metadata('design:type', Object)
    ], SuiCheckbox.prototype, "classes", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], SuiCheckbox.prototype, "name", void 0);
    __decorate([
        HostBinding('class.checked'), 
        __metadata('design:type', Boolean)
    ], SuiCheckbox.prototype, "checked", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiCheckbox.prototype, "checkChange", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiCheckbox.prototype, "isDisabled", void 0);
    __decorate([
        HostBinding('class.read-only'),
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiCheckbox.prototype, "isReadonly", void 0);
    __decorate([
        HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SuiCheckbox.prototype, "onClick", null);
    SuiCheckbox = __decorate([
        Component({
            selector: 'sui-checkbox',
            exportAs: 'suiCheckbox',
            template: "\n<input class=\"hidden\" type=\"checkbox\" [attr.name]=\"name\" [attr.checked]=\"checkedAttribute\" [attr.disabled]=\"isDisabledAttribute\" [(ngModel)]=\"checked\">\n<label>\n    <ng-content></ng-content>\n</label>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], SuiCheckbox);
    return SuiCheckbox;
}());
export var CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SuiCheckboxValueAccessor; }),
    multi: true
};
export var SuiCheckboxValueAccessor = (function () {
    function SuiCheckboxValueAccessor(host) {
        this.host = host;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    SuiCheckboxValueAccessor.prototype.writeValue = function (value) {
        this.host.writeValue(!!value);
    };
    SuiCheckboxValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    SuiCheckboxValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    SuiCheckboxValueAccessor = __decorate([
        Directive({
            selector: 'sui-checkbox',
            host: { '(checkChange)': 'onChange($event)' },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [SuiCheckbox])
    ], SuiCheckboxValueAccessor);
    return SuiCheckboxValueAccessor;
}());
export var SUI_CHECKBOX_DIRECTIVES = [SuiCheckbox, SuiCheckboxValueAccessor];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/checkbox/checkbox.js.map