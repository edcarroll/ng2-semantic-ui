var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
export var SuiAccordionPanel = (function () {
    function SuiAccordionPanel() {
        this.isOpenChange = new EventEmitter(false);
        this._isOpen = false;
    }
    Object.defineProperty(SuiAccordionPanel.prototype, "service", {
        set: function (service) {
            this._service = service;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordionPanel.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            this._isOpen = value;
            if (value && this._service) {
                this._service.closeOtherPanels(this);
            }
            this.isOpenChange.emit(this._isOpen);
        },
        enumerable: true,
        configurable: true
    });
    SuiAccordionPanel.prototype.toggleOpen = function (event) {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiAccordionPanel.prototype, "isDisabled", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiAccordionPanel.prototype, "isOpen", null);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiAccordionPanel.prototype, "isOpenChange", void 0);
    SuiAccordionPanel = __decorate([
        Component({
            selector: 'sui-accordion-panel',
            exportAs: 'suiAccordionPanel',
            template: "\n<div class=\"title\" [class.active]=\"isOpen\" (click)=\"toggleOpen($event)\">\n    <ng-content select=\"[title]\"></ng-content>\n</div>\n<div [suiCollapse]=\"!isOpen\">\n    <div class=\"content\" [class.active]=\"isOpen\">\n        <ng-content select=\"[content]\"></ng-content>\n    </div>\n</div>\n",
            styles: ["\n.content {\n    padding: .5em 0 1em\n}\n\n:host:last-child .content {\n    padding-bottom: 0\n}\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], SuiAccordionPanel);
    return SuiAccordionPanel;
}());
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/accordion/accordion-panel.js.map