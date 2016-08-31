var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, HostBinding } from '@angular/core';
export var SuiProgress = (function () {
    function SuiProgress() {
        this.classes = true;
        this._value = 0;
        this.unscaledValue = 0;
        this._maximum = 100;
        this.autoSuccess = true;
        this.progress = true;
        this.precision = 0;
    }
    Object.defineProperty(SuiProgress.prototype, "reachedMaximum", {
        get: function () {
            return this.value == this.maximum && this.autoSuccess;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            value = parseFloat(value);
            if (Number.isNaN(value)) {
                return;
            }
            value = Math.max(value, 0);
            //Keep this for when maximum changes
            this.unscaledValue = value;
            value = Math.min(value, this.maximum);
            this._value = parseFloat((value / this.maximum * 100).toFixed(Math.min(20, Math.max(this.precision, 0))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "maximum", {
        get: function () {
            return this._maximum;
        },
        set: function (value) {
            value = parseFloat(value);
            if (Number.isNaN(value)) {
                return;
            }
            value = Math.max(value, 0);
            this._maximum = value;
            this.value = this.unscaledValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "percentage", {
        get: function () {
            return this._value.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "classValue", {
        set: function (value) {
            if (value.includes("attached") || value.includes("tiny")) {
                this.progress = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.progress'), 
        __metadata('design:type', Object)
    ], SuiProgress.prototype, "classes", void 0);
    __decorate([
        HostBinding('class.success'), 
        __metadata('design:type', Object)
    ], SuiProgress.prototype, "reachedMaximum", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiProgress.prototype, "autoSuccess", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiProgress.prototype, "progress", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], SuiProgress.prototype, "precision", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SuiProgress.prototype, "value", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SuiProgress.prototype, "maximum", null);
    __decorate([
        HostBinding('attr.data-percent'), 
        __metadata('design:type', String)
    ], SuiProgress.prototype, "percentage", null);
    __decorate([
        Input('class'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SuiProgress.prototype, "classValue", null);
    SuiProgress = __decorate([
        Component({
            selector: 'sui-progress',
            exportAs: 'suiProgress',
            template: "\n<div class=\"bar\" [style.width.%]=\"percentage\">\n    <div class=\"progress\" *ngIf=\"progress\">{{ percentage }}%</div>\n</div>\n<div class=\"label\">\n    <ng-content></ng-content>\n</div>\n",
            styles: [".bar { transition-duration: 300ms !important; }"]
        }), 
        __metadata('design:paramtypes', [])
    ], SuiProgress);
    return SuiProgress;
}());
export var SUI_PROGRESS_DIRECTIVES = [SuiProgress];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/progress/progress.js.map