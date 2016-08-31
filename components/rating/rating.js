var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Directive, Input, Output, EventEmitter, HostBinding, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SuiRating = (function () {
    function SuiRating() {
        this.ratingClasses = true;
        this._value = 0;
        this._max = 5;
        this.valueChange = new EventEmitter(false);
        this._hoveredIndex = -1;
        this.isReadonly = false;
    }
    Object.defineProperty(SuiRating.prototype, "max", {
        set: function (value) {
            this._max = parseInt(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiRating.prototype, "icons", {
        get: function () {
            return Array(this._max);
        },
        enumerable: true,
        configurable: true
    });
    SuiRating.prototype.mouseover = function (i) {
        this._hoveredIndex = i;
    };
    SuiRating.prototype.mouseout = function () {
        this._hoveredIndex = -1;
    };
    SuiRating.prototype.click = function (i) {
        if (!this.isReadonly) {
            this._value = i + 1;
            this.valueChange.emit(this._value);
        }
    };
    SuiRating.prototype.writeValue = function (value) {
        this._value = value;
    };
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.rating'), 
        __metadata('design:type', Object)
    ], SuiRating.prototype, "ratingClasses", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SuiRating.prototype, "max", null);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiRating.prototype, "valueChange", void 0);
    __decorate([
        HostListener('mouseout'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SuiRating.prototype, "mouseout", null);
    __decorate([
        HostBinding('class.read-only'),
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiRating.prototype, "isReadonly", void 0);
    SuiRating = __decorate([
        Component({
            selector: 'sui-rating',
            exportAs: 'suiRating',
            template: "\n<i class=\"icon\"\n   *ngFor=\"let icon of icons; let i = index\"\n   (mouseover)=\"mouseover(i)\"\n   (click)=\"click(i)\"\n   [class.selected]=\"_hoveredIndex >= i && !isReadonly\"\n   [class.active]=\"_value > i\">\n</i>\n",
            styles: ["\n:host.read-only .icon {\ncursor: auto\n}\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], SuiRating);
    return SuiRating;
}());
export var CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SuiRatingValueAccessor; }),
    multi: true
};
export var SuiRatingValueAccessor = (function () {
    function SuiRatingValueAccessor(host) {
        this.host = host;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    SuiRatingValueAccessor.prototype.writeValue = function (value) {
        this.host.writeValue(value);
    };
    SuiRatingValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    SuiRatingValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    SuiRatingValueAccessor = __decorate([
        Directive({
            selector: 'sui-rating',
            host: { '(valueChange)': 'onChange($event)' },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [SuiRating])
    ], SuiRatingValueAccessor);
    return SuiRatingValueAccessor;
}());
export var SUI_RATING_DIRECTIVES = [SuiRating, SuiRatingValueAccessor];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/rating/rating.js.map