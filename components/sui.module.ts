import { NgModule } from "@angular/core";

import { SuiAccordionModule } from "./accordion/accordion.module";
import { SuiCheckboxModule } from "./checkbox/checkbox.module";
import { SuiCollapseModule } from "./collapse/collapse.module";
import { SuiDimmerModule } from "./dimmer/dimmer.module";
import { SuiDropdownModule } from "./dropdown/dropdown.module";
import { SuiMessageModule } from "./message/message.module";
import { SuiModalModule } from "./modal/modal.module";
import { SuiPopupModule } from "./popup/popup.module";
import { SuiProgressModule } from "./progress/progress.module";
import { SuiRatingModule } from "./rating/rating.module";
import { SuiSearchModule } from "./search/search.module";
import { SuiSidebarModule } from "./sidebar/sidebar.module";
import { SuiTabsModule } from "./tabs/tab.module";
import { SuiSelectModule } from "./select/select.module";
import { SuiTransitionModule } from "./transition/transition.module";
import { SuiPaginationModule } from "./pagination/pagination.module";

@NgModule({
    exports: [
        SuiAccordionModule,
        SuiCheckboxModule,
        SuiCollapseModule,
        SuiDimmerModule,
        SuiDropdownModule,
        SuiMessageModule,
        SuiModalModule,
        SuiPopupModule,
        SuiProgressModule,
        SuiRatingModule,
        SuiSearchModule,
        SuiSelectModule,
        SuiSidebarModule,
        SuiTabsModule,
        SuiTransitionModule,
        SuiPaginationModule
    ]
})
export class SuiModule {}
