import { NgModule, ModuleWithProviders } from "@angular/core";

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

// Misc
import {
    SuiUtilityModule
} from "./misc";

const suiModules = [
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

    // Behaviors
    SuiLocalizationModule,

    // Misc
    SuiUtilityModule
];

@NgModule({
    imports: suiModules.map(m => m.forRoot()),
    exports: suiModules
})
export class SuiRootModule {}

@NgModule({
    imports: suiModules,
    exports: suiModules
})
export class SuiModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiRootModule
        };
    }
}
