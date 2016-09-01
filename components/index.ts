import {NgModule} from "@angular/core";

import {SuiAccordionModule} from "./accordion/accordion.module";
import {SuiCheckboxModule} from "./checkbox/checkbox.module";
import {SuiCollapseModule} from "./collapse/collapse.module";
import {SuiDimmerModule} from "./dimmer/dimmer.module";
import {SuiDropdownModule} from "./dropdown/dropdown.module";
import {SuiMessageModule} from "./message/message.module";
import {SuiProgressModule} from "./progress/progress.module";
import {SuiRatingModule} from "./rating/rating.module";
import {SuiSearchModule} from "./search/search.module";
import {SuiTabsModule} from "./tabs/tab.module";
import {SuiSelectModule} from "./select/select.module";

@NgModule({
    exports: [
        SuiAccordionModule,
        SuiCheckboxModule,
        SuiCollapseModule,
        SuiDimmerModule,
        SuiDropdownModule,
        SuiMessageModule,
        SuiProgressModule,
        SuiRatingModule,
        SuiSearchModule,
        SuiSelectModule,
        SuiTabsModule
    ]
})
export class SuiModule {}

export {SuiAccordionModule};
export {SuiCheckboxModule};
export {SuiCollapseModule};
export {SuiDimmerModule};
export {SuiDropdownModule};
export {SuiMessageModule};
export {SuiProgressModule};
export {SuiRatingModule};
export {SuiSearchModule};
export {SuiTabsModule};
export {SuiSelectModule};
