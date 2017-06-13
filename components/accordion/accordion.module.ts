import {NgModule} from "@angular/core";
import {SuiCollapseModule} from "../collapse/collapse.module";
import {CommonModule} from "@angular/common";
import {SuiAccordion} from "./accordion";
import {SuiAccordionPanel} from "./accordion-panel";
import {SuiTransitionModule} from "../transition/transition.module";

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
