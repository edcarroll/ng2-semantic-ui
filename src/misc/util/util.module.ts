import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiComponentFactory } from "./services/component-factory.service";

const imports = [
    CommonModule
];

const providers = [
    SuiComponentFactory
];

@NgModule({
    imports: [
        ...imports
    ],
    providers
})
export class SuiUtilityRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    providers
})
export class SuiUtilityModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiUtilityModule
        };
    }
}
