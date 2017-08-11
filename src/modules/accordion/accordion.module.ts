import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCollapseModule } from "../collapse";
import { SuiTransitionModule } from "../transition";
import { SuiAccordion } from "./components/accordion";
import { SuiAccordionPanel } from "./components/accordion-panel";

const imports = [
    CommonModule
];

const declarations = [
    SuiAccordion,
    SuiAccordionPanel
];

const exports = [
    SuiAccordion,
    SuiAccordionPanel
];

@NgModule({
    imports: [
        ...imports,
        SuiCollapseModule.forRoot(),
        SuiTransitionModule.forRoot()
    ],
    declarations,
    exports
})
export class SuiAccordionRootModule {}

@NgModule({
    imports: [
        ...imports,
        SuiCollapseModule,
        SuiTransitionModule
    ],
    declarations,
    exports
})
export class SuiAccordionModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiAccordionRootModule
        };
    }
}
