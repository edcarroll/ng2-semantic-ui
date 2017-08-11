import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTabset } from "./components/tabset";
import { SuiTabHeader } from "./directives/tab-header";
import { SuiTabContent } from "./directives/tab-content";

const imports = [
    CommonModule
];

const declarations = [
    SuiTabset,
    SuiTabHeader,
    SuiTabContent
];

const exports = [
    SuiTabset,
    SuiTabHeader,
    SuiTabContent
];

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiTabsRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiTabsModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiTabsRootModule
        };
    }
}
