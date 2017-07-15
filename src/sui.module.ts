import { NgModule } from "@angular/core";
import { SuiMessageModule, SuiPaginationModule } from "./collections";
import {
    SuiAccordionModule,
    SuiCheckboxModule,
    SuiCollapseModule,
    SuiDatepickerModule,
    SuiDimmerModule,
    SuiDropdownModule,
    SuiModalModule,
    SuiPopupModule,
    SuiProgressModule,
    SuiRangeModule,
    SuiRatingModule,
    SuiSearchModule,
    SuiSidebarModule,
    SuiTabsModule,
    SuiSelectModule,
    SuiTransitionModule
} from "./modules";
import { SuiLocalizationModule } from "./behaviors";
import { SuiUtilityModule } from "./misc";

// Collections

// Modules

// Behaviors

// Misc

@NgModule({
    exports: [
        // Collections
        SuiMessageModule,
        SuiPaginationModule,

        // Modules
        SuiAccordionModule,
        SuiCheckboxModule,
        SuiCollapseModule,
        SuiDatepickerModule,
        SuiDimmerModule,
        SuiDropdownModule,
        SuiModalModule,
        SuiPopupModule,
        SuiProgressModule,
        SuiRangeModule,
        SuiRatingModule,
        SuiSearchModule,
        SuiSelectModule,
        SuiSidebarModule,
        SuiTabsModule,
        SuiTransitionModule,

        // Behaviors
        SuiLocalizationModule,

        // Misc
        SuiUtilityModule
    ]
})
export class SuiModule {}
