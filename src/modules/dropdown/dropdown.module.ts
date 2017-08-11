import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition";
import { SuiDropdown } from "./directives/dropdown";
import { SuiDropdownMenu, SuiDropdownMenuItem } from "./directives/dropdown-menu";

const imports = [
    CommonModule
];

const declarations = [
    SuiDropdown,
    SuiDropdownMenu,
    SuiDropdownMenuItem
];

const exports = [
    SuiDropdown,
    SuiDropdownMenu,
    SuiDropdownMenuItem
];

@NgModule({
    imports: [
        ...imports,
        SuiTransitionModule.forRoot()
    ],
    declarations,
    exports
})
export class SuiDropdownRootModule {}

@NgModule({
    imports: [
        ...imports,
        SuiTransitionModule
    ],
    declarations,
    exports
})
export class SuiDropdownModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiDropdownRootModule
        };
    }
}
