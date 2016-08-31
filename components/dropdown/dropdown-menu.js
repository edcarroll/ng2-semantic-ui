var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, HostBinding } from '@angular/core';
export var SuiDropdownMenu = (function () {
    function SuiDropdownMenu(el) {
        this.el = el;
    }
    Object.defineProperty(SuiDropdownMenu.prototype, "service", {
        set: function (service) {
            this._service = service;
            this._service.menuElement = this.el;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenu.prototype, "isOpen", {
        get: function () {
            if (this._service) {
                return this._service.isOpen;
            }
            return;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        HostBinding('class.visible'),
        HostBinding('class.transition'), 
        __metadata('design:type', Boolean)
    ], SuiDropdownMenu.prototype, "isOpen", null);
    SuiDropdownMenu = __decorate([
        Directive({
            selector: '[suiDropdownMenu]'
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], SuiDropdownMenu);
    return SuiDropdownMenu;
}());
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/dropdown/dropdown-menu.js.map