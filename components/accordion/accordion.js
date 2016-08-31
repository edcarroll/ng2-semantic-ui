var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, HostBinding, ContentChildren, QueryList } from "@angular/core";
import { SuiAccordionPanel } from "./accordion-panel";
import { SuiAccordionService } from "./accordion.service";
export var SuiAccordion = (function () {
    function SuiAccordion() {
        this.classes = true;
        this._service = new SuiAccordionService();
    }
    Object.defineProperty(SuiAccordion.prototype, "closeOthers", {
        get: function () {
            return this._service.closeOthers;
        },
        set: function (value) {
            this._service.closeOthers = value;
        },
        enumerable: true,
        configurable: true
    });
    SuiAccordion.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.panels.forEach(function (p) { return _this._service.addPanel(p); });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiAccordion.prototype, "closeOthers", null);
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.accordion'), 
        __metadata('design:type', Object)
    ], SuiAccordion.prototype, "classes", void 0);
    __decorate([
        ContentChildren(SuiAccordionPanel), 
        __metadata('design:type', QueryList)
    ], SuiAccordion.prototype, "panels", void 0);
    SuiAccordion = __decorate([
        Component({
            selector: 'sui-accordion',
            exportAs: 'suiAccordion',
            template: "\n<ng-content></ng-content>\n",
            styles: ["\n/* Fix for general styling issues */\n:host {\n    display: block;\n}\n/* Fix for styled border issue */\n:host.styled sui-accordion-panel:first-child .title {\n    border-top: none\n}\n\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], SuiAccordion);
    return SuiAccordion;
}());
export var SUI_ACCORDION_DIRECTIVES = [SuiAccordion, SuiAccordionPanel];
export var SUI_ACCORDION_PROVIDERS = [SuiAccordionService];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/accordion/accordion.js.map