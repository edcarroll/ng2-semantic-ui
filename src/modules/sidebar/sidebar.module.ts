import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiSidebar } from "./components/sidebar";
import { SuiSidebarContainer } from "./components/sidebar-container";
import { SuiSidebarSibling } from "./components/sidebar-sibling";

const imports = [
    CommonModule
];

const declarations = [
    SuiSidebar,
    SuiSidebarContainer,
    SuiSidebarSibling
];

const exports = [
    SuiSidebar,
    SuiSidebarContainer,
    SuiSidebarSibling
];

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiSidebarRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiSidebarModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiSidebarRootModule
        };
    }
}
