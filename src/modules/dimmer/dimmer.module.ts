import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition";
import { SuiDimmer } from "./components/dimmer";

const imports = [
    CommonModule
];

const declarations = [
    SuiDimmer
];

const exports = [
    SuiDimmer
];

@NgModule({
    imports: [
        ...imports,
        SuiTransitionModule.forRoot()
    ],
    declarations,
    exports
})
export class SuiDimmerRootModule {}

@NgModule({
    imports: [
        ...imports,
        SuiTransitionModule
    ],
    declarations,
    exports
})
export class SuiDimmerModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiDimmerRootModule
        };
    }
}
