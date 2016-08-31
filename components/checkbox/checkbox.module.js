var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SUI_CHECKBOX_DIRECTIVES } from "./checkbox";
import { SUI_RADIOBUTTON_DIRECTIVES } from "./radiobutton";
export var SuiCheckboxModule = (function () {
    function SuiCheckboxModule() {
    }
    SuiCheckboxModule = __decorate([
        NgModule({
            imports: [FormsModule],
            declarations: [SUI_CHECKBOX_DIRECTIVES, SUI_RADIOBUTTON_DIRECTIVES],
            exports: [SUI_CHECKBOX_DIRECTIVES, SUI_RADIOBUTTON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SuiCheckboxModule);
    return SuiCheckboxModule;
}());
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/checkbox/checkbox.module.js.map