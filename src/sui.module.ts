import { NgModule } from "@angular/core";

// Collections
import {
    SuiMessageModule,
    SuiPaginationModule
} from "./collections";

// Modules
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
    SuiRatingModule,
    SuiSearchModule,
    SuiSidebarModule,
    SuiTabsModule,
    SuiSelectModule,
    SuiTransitionModule
} from "./modules";

// Behaviors
import {
    SuiLocalizationModule
} from "./behaviors";

// Elements
import {
    SuiLoadingElement
} from "./elements";

// Misc
import {
    SuiUtilityModule
} from "./misc";

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
        SuiRatingModule,
        SuiSearchModule,
        SuiSelectModule,
        SuiSidebarModule,
        SuiTabsModule,
        SuiTransitionModule,

        // Elements
        SuiLoadingElement,

        // Behaviors
        SuiLocalizationModule,

        // Misc
        SuiUtilityModule
    ]
})
export class SuiModule {}
