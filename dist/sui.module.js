import { NgModule } from "@angular/core";
import { SuiMessageModule, SuiPaginationModule } from "./collections";
import { SuiAccordionModule, SuiCheckboxModule, SuiCollapseModule, SuiDatepickerModule, SuiDimmerModule, SuiDropdownModule, SuiModalModule, SuiPopupModule, SuiProgressModule, SuiRatingModule, SuiSearchModule, SuiSidebarModule, SuiTabsModule, SuiSelectModule, SuiTransitionModule } from "./modules";
import { SuiLocalizationModule } from "./behaviors";
import { SuiUtilityModule } from "./misc";
var SuiModule = /** @class */ (function () {
    function SuiModule() {
    }
    SuiModule.decorators = [
        { type: NgModule, args: [{
                    exports: [
                        SuiMessageModule,
                        SuiPaginationModule,
                        SuiAccordionModule,
                        SuiCheckboxModule,
                        SuiCollapseModule,
                        SuiDatepickerModule,
                        SuiDimmerModule,
                        SuiDropdownModule,
                        SuiModalModule,
                        SuiPopupModule,
                        SuiProgressModule,
                        SuiRatingModule,
                        SuiSearchModule,
                        SuiSelectModule,
                        SuiSidebarModule,
                        SuiTabsModule,
                        SuiTransitionModule,
                        SuiLocalizationModule,
                        SuiUtilityModule
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiModule.ctorParameters = function () { return []; };
    return SuiModule;
}());
export { SuiModule };
//# sourceMappingURL=sui.module.js.map