
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiLocalizationService } from "./services/localization.service";

const imports = [
    CommonModule
];

@NgModule({
    imports: [
        ...imports
    ],
    providers: [
        SuiLocalizationService
    ]
})
export class SuiLocalizationRootModule {}

@NgModule({
    imports: [
        ...imports
    ]
})
export class SuiLocalizationModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiLocalizationRootModule
        };
    }
}
