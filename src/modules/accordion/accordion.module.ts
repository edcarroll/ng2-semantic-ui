import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCollapseModule } from "../collapse";
import { SuiTransitionModule } from "../transition";
import { SuiAccordion } from "./components/accordion";
import { SuiAccordionPanel } from "./components/accordion-panel";

@NgModule({
    imports: [
        CommonModule,
        SuiCollapseModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiAccordion,
        SuiAccordionPanel
    ],
    exports: [
        SuiAccordion,
        SuiAccordionPanel
    ],
    providers: []
})
export class SuiAccordionModule {}
