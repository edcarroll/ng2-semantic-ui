var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, Output, HostBinding, EventEmitter, ElementRef, HostListener, ContentChild } from '@angular/core';
import { SuiDropdownService } from './dropdown.service';
import { SuiDropdownMenu } from './dropdown-menu';
export var SuiDropdown = (function () {
    function SuiDropdown(el) {
        this._service = new SuiDropdownService();
        this._service.dropdownElement = el;
    }
    Object.defineProperty(SuiDropdown.prototype, "isOpen", {
        get: function () {
            return this._service.isOpen;
        },
        set: function (value) {
            this._service.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "autoClose", {
        get: function () {
            return this._service.autoClose;
        },
        set: function (value) {
            this._service.autoClose = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "onToggle", {
        get: function () {
            return this._service.onToggle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isOpenChange", {
        get: function () {
            return this._service.isOpenChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isDisabled", {
        get: function () {
            return this._service.isDisabled;
        },
        set: function (value) {
            this._service.isDisabled = value;
        },
        enumerable: true,
        configurable: true
    });
    SuiDropdown.prototype.ngAfterContentInit = function () {
        this._menu.service = this._service;
    };
    SuiDropdown.prototype.click = function (event) {
        event.stopPropagation();
        if (!this._service.menuElement.nativeElement.contains(event.target)) {
            this._service.toggle();
        }
        return false;
    };
    __decorate([
        ContentChild(SuiDropdownMenu), 
        __metadata('design:type', SuiDropdownMenu)
    ], SuiDropdown.prototype, "_menu", void 0);
    __decorate([
        HostBinding('class.visible'),
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiDropdown.prototype, "isOpen", null);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], SuiDropdown.prototype, "autoClose", null);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiDropdown.prototype, "onToggle", null);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiDropdown.prototype, "isOpenChange", null);
    __decorate([
        HostBinding('class.disabled'),
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiDropdown.prototype, "isDisabled", null);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', Boolean)
    ], SuiDropdown.prototype, "click", null);
    SuiDropdown = __decorate([
        Directive({
            selector: '[suiDropdown]'
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], SuiDropdown);
    return SuiDropdown;
}());
export var SUI_DROPDOWN_DIRECTIVES = [SuiDropdown, SuiDropdownMenu];
export var SUI_DROPDOWN_PROVIDERS = [SuiDropdownService];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/dropdown/dropdown.js.map