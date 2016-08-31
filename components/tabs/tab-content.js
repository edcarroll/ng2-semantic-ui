var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, HostBinding } from '@angular/core';
export var SuiTabContent = (function () {
    function SuiTabContent() {
        this.tabClass = true;
        this.isActive = false;
    }
    Object.defineProperty(SuiTabContent.prototype, "suiTabContent", {
        set: function (value) {
            if (!this.id) {
                this.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SuiTabContent.prototype, "suiTabContent", null);
    __decorate([
        HostBinding('class.tab'), 
        __metadata('design:type', Object)
    ], SuiTabContent.prototype, "tabClass", void 0);
    __decorate([
        HostBinding('class.active'), 
        __metadata('design:type', Boolean)
    ], SuiTabContent.prototype, "isActive", void 0);
    SuiTabContent = __decorate([
        Directive({
            selector: '[suiTabContent]'
        }), 
        __metadata('design:paramtypes', [])
    ], SuiTabContent);
    return SuiTabContent;
}());
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/tabs/tab-content.js.map