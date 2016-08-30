import {NgModule} from "@angular/core";

import {SuiCollapseModule} from "./collapse/collapse.module";
import {SuiAccordionModule} from "./accordion/accordion.module";
import {SuiCheckboxModule} from "./checkbox/checkbox.module";

@NgModule({
    exports: [
        SuiAccordionModule,
        SuiCheckboxModule,
        SuiCollapseModule
    ]
})
export class SuiModule {
}
