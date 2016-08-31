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
import { SUI_RATING_DIRECTIVES } from "./rating";
import { CommonModule } from "@angular/common";
export var SuiRatingModule = (function () {
    function SuiRatingModule() {
    }
    SuiRatingModule = __decorate([
        NgModule({
            imports: [FormsModule, CommonModule],
            declarations: SUI_RATING_DIRECTIVES,
            exports: SUI_RATING_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [])
    ], SuiRatingModule);
    return SuiRatingModule;
}());
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/rating/rating.module.js.map