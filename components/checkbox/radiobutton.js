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
export var SuiRadioButton = (function () {
    function SuiRadioButton() {
        this.classes = true;
        this.value = "";
        this.isDisabled = false;
        this.isReadonly = false;
        this.checked = false;
        this.currentValueChange = new EventEmitter(false);
    }
    Object.defineProperty(SuiRadioButton.prototype, "checkedAttribute", {
        get: function () {
            return this.checked ? "" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiRadioButton.prototype, "isDisabledAttribute", {
        get: function () {
            return this.isDisabled ? "disabled" : null;
        },
        enumerable: true,
        configurable: true
    });
    SuiRadioButton.prototype.onClick = function () {
        if (!this.isDisabled && !this.isReadonly) {
            this.currentValue = this.value;
            this.currentValueChange.emit(this.currentValue);
            this.update();
        }
    };
    SuiRadioButton.prototype.update = function () {
        var _this = this;
        //This is a horrible hack - need to rewrite!
        setTimeout(function () {
            _this.checked = _this.currentValue == _this.value;
        });
    };
    SuiRadioButton.prototype.writeValue = function (value) {
        this.currentValue = value;
        this.update();
    };
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.radio'),
        HostBinding('class.checkbox'), 
        __metadata('design:type', Object)
    ], SuiRadioButton.prototype, "classes", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], SuiRadioButton.prototype, "name", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SuiRadioButton.prototype, "value", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiRadioButton.prototype, "isDisabled", void 0);
    __decorate([
        HostBinding('class.read-only'),
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiRadioButton.prototype, "isReadonly", void 0);
    __decorate([
        HostBinding('class.checked'), 
        __metadata('design:type', Boolean)
    ], SuiRadioButton.prototype, "checked", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiRadioButton.prototype, "currentValueChange", void 0);
    __decorate([
        HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SuiRadioButton.prototype, "onClick", null);
    SuiRadioButton = __decorate([
        Component({
            selector: 'sui-radio-button[ngModel]',
            exportAs: 'suiRadioButton',
            template: "\n<input class=\"hidden\"\n       type=\"checkbox\"\n       [attr.name]=\"name\"\n       [attr.checked]=\"checkedAttribute\"\n       [attr.disabled]=\"isDisabledAttribute\"\n       [ngModel]=\"checked\"\n       (ngModel)=\"currentValue = value\">\n<label>\n    <ng-content></ng-content>\n</label>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], SuiRadioButton);
    return SuiRadioButton;
}());
export var CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SuiRadioButtonValueAccessor; }),
    multi: true
};
export var SuiRadioButtonValueAccessor = (function () {
    function SuiRadioButtonValueAccessor(host) {
        this.host = host;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    SuiRadioButtonValueAccessor.prototype.writeValue = function (value) {
        this.host.writeValue(value);
    };
    SuiRadioButtonValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    SuiRadioButtonValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    SuiRadioButtonValueAccessor = __decorate([
        Directive({
            selector: 'sui-radio-button',
            host: { '(currentValueChange)': 'onChange($event)' },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [SuiRadioButton])
    ], SuiRadioButtonValueAccessor);
    return SuiRadioButtonValueAccessor;
}());
export var SUI_RADIOBUTTON_DIRECTIVES = [SuiRadioButton, SuiRadioButtonValueAccessor];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/checkbox/radiobutton.js.map