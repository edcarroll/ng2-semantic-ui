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
export var SuiMessage = (function () {
    function SuiMessage() {
        this.dismissible = true;
        this.onDismiss = new EventEmitter(false);
        this.dismissed = false;
        this.classes = "";
    }
    SuiMessage.prototype.dismiss = function () {
        this.dismissed = true;
        this.onDismiss.emit(this);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SuiMessage.prototype, "dismissible", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiMessage.prototype, "onDismiss", void 0);
    __decorate([
        Input("class"), 
        __metadata('design:type', String)
    ], SuiMessage.prototype, "classes", void 0);
    SuiMessage = __decorate([
        Component({
            selector: 'sui-message',
            exportAs: 'suiMessage',
            template: "\n<div class=\"ui message {{ classes }}\" *ngIf=\"!dismissed\">\n    <i class=\"close icon\" *ngIf=\"dismissible\" (click)=\"dismiss()\"></i>\n    <ng-content></ng-content>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], SuiMessage);
    return SuiMessage;
}());
export var SUI_MESSAGE_DIRECTIVES = [SuiMessage];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/message/message.js.map