var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';
export var SuiDimmer = (function () {
    function SuiDimmer() {
        this.classes = true;
        this.isClickable = true;
        this.isDimmed = false;
        this.isDimmedChange = new EventEmitter(false);
    }
    SuiDimmer.prototype.click = function () {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    };
    __decorate([
        HostBinding('class.ui'),
        HostBinding('class.dimmer'), 
        __metadata('design:type', Object)
    ], SuiDimmer.prototype, "classes", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiDimmer.prototype, "isClickable", void 0);
    __decorate([
        HostBinding('class.active'),
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiDimmer.prototype, "isDimmed", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiDimmer.prototype, "isDimmedChange", void 0);
    __decorate([
        HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SuiDimmer.prototype, "click", null);
    SuiDimmer = __decorate([
        Component({
            selector: 'sui-dimmer',
            exportAs: 'suiDimmer',
            template: "\n<div class=\"content\">\n    <div class=\"center\">\n        <ng-content></ng-content>\n    </div>\n</div>\n",
            styles: ["\n:host.dimmer {\n    transition: visibility 0.3s, opacity 0.3s ease;\n    display: block;\n    visibility: hidden;\n}\n\n:host.active {\n    visibility: visible;\n}\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], SuiDimmer);
    return SuiDimmer;
}());
export var SUI_DIMMER_DIRECTIVES = [SuiDimmer];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/dimmer/dimmer.js.map