var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from "@angular/core";
import { SuiCollapseModule } from "./collapse/collapse.module";
import { SuiAccordionModule } from "./accordion/accordion.module";
import { SuiCheckboxModule } from "./checkbox/checkbox.module";
import { SuiDimmerModule } from "./dimmer/dimmer.module";
import { SuiDropdownModule } from "./dropdown/dropdown.module";
import { SuiMessageModule } from "./message/message.module";
import { SuiProgressModule } from "./progress/progress.module";
import { SuiRatingModule } from "./rating/rating.module";
import { SuiSearchModule } from "./search/search.module";
import { SuiTabsModule } from "./tabs/tab.module";
import { SuiSelectModule } from "./select/select.module";
export var SuiModule = (function () {
    function SuiModule() {
    }
    SuiModule = __decorate([
        NgModule({
            exports: [
                SuiAccordionModule,
                SuiCheckboxModule,
                SuiCollapseModule,
                SuiDimmerModule,
                SuiDropdownModule,
                SuiMessageModule,
                SuiProgressModule,
                SuiRatingModule,
                SuiSearchModule,
                SuiSelectModule,
                SuiTabsModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SuiModule);
    return SuiModule;
}());
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/index.js.map