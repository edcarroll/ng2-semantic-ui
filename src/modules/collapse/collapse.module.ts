import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCollapse } from "./directives/collapse";

const imports = [
    CommonModule
];

const declarations = [
    SuiCollapse
];

const exports = [
    SuiCollapse
];

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiCollapseRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiCollapseModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiCollapseRootModule
        };
    }
}
