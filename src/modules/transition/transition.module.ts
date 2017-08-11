import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransition } from "./directives/transition";

const imports = [
    CommonModule
];

const declarations = [
    SuiTransition
];

const exports = [
    SuiTransition
];

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiTransitionRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiTransitionModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiTransitionRootModule
        };
    }
}
