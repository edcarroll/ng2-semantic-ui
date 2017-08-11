import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiProgress } from "./components/progress";

const imports = [
    CommonModule
];

const declarations = [
    SuiProgress
];

const exports = [
    SuiProgress
];

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiProgressRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiProgressModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiProgressModule
        };
    }
}
