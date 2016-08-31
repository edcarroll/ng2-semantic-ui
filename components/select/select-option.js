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
import { Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';
export var SuiSelectOption = (function () {
    function SuiSelectOption() {
        this.itemClass = true;
        this.selected = new EventEmitter();
        this.useTemplate = false;
        this.readValue = function (value) { return ""; };
    }
    SuiSelectOption.prototype.click = function (event) {
        event.stopPropagation();
        this.selected.emit(this.value);
        return false;
    };
    __decorate([
        HostBinding('class.item'), 
        __metadata('design:type', Object)
    ], SuiSelectOption.prototype, "itemClass", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SuiSelectOption.prototype, "value", void 0);
    __decorate([
        ViewChild('optionRenderTarget', { read: ViewContainerRef }), 
        __metadata('design:type', ViewContainerRef)
    ], SuiSelectOption.prototype, "viewContainerRef", void 0);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', Boolean)
    ], SuiSelectOption.prototype, "click", null);
    SuiSelectOption = __decorate([
        Component({
            selector: 'sui-select-option',
            template: "\n<span #optionRenderTarget></span>\n<span *ngIf=\"!useTemplate\">{{ readValue(value) }}</span>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], SuiSelectOption);
    return SuiSelectOption;
}());
export var SuiSelectMultiLabel = (function (_super) {
    __extends(SuiSelectMultiLabel, _super);
    function SuiSelectMultiLabel() {
        _super.apply(this, arguments);
        this.classes = true;
    }
    SuiSelectMultiLabel.prototype.click = function (event) {
        event.stopPropagation();
        return false;
    };
    SuiSelectMultiLabel.prototype.deselectOption = function () {
        event.stopPropagation();
        this.selected.emit(this.value);
        return false;
    };
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.label'), 
        __metadata('design:type', Object)
    ], SuiSelectMultiLabel.prototype, "classes", void 0);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', Boolean)
    ], SuiSelectMultiLabel.prototype, "click", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SuiSelectMultiLabel.prototype, "value", void 0);
    __decorate([
        ViewChild('optionRenderTarget', { read: ViewContainerRef }), 
        __metadata('design:type', ViewContainerRef)
    ], SuiSelectMultiLabel.prototype, "viewContainerRef", void 0);
    SuiSelectMultiLabel = __decorate([
        Component({
            selector: 'sui-select-multi-label',
            template: "\n<span #optionRenderTarget></span>\n<span *ngIf=\"!useTemplate\">{{ readValue(value) }}</span>\n<i class=\"delete icon\" (click)=\"deselectOption()\"></i>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], SuiSelectMultiLabel);
    return SuiSelectMultiLabel;
}(SuiSelectOption));
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/select/select-option.js.map