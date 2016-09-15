import {NgModule} from '@angular/core';
import {SUI_ACCORDION_DIRECTIVES, SUI_ACCORDION_PROVIDERS} from "./accordion";
import {SuiCollapseModule} from "../collapse/collapse.module";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule, SuiCollapseModule],
    declarations: SUI_ACCORDION_DIRECTIVES,
    exports: SUI_ACCORDION_DIRECTIVES,
    providers: SUI_ACCORDION_PROVIDERS
})
export class SuiAccordionModule {}
