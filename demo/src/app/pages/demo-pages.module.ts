import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SuiModule } from "ng2-semantic-ui";
import { DemoComponentsModule } from "../components/demo-components.module";

import { GettingStartedPage } from "./getting-started/getting-started.page";

// Collections
import { MessagePageComponents } from "./collections/message/message.page";
import { PaginationPageComponents } from "./collections/pagination/pagination.page";

// Modules
import { AccordionPageComponents } from "./modules/accordion/accordion.page";
import { CheckboxPageComponents } from "./modules/checkbox/checkbox.page";
import { CollapsePageComponents } from "./modules/collapse/collapse.page";
import { DatepickerPageComponents } from "./modules/datepicker/datepicker.page";
import { DimmerPageComponents } from "./modules/dimmer/dimmer.page";
import { DropdownPageComponents } from "./modules/dropdown/dropdown.page";
import { ModalPageComponents, ConfirmModalComponent } from "./modules/modal/modal.page";
import { PopupPageComponents } from "./modules/popup/popup.page";
import { ProgressPageComponents } from "./modules/progress/progress.page";
import { RatingPageComponents } from "./modules/rating/rating.page";
import { SearchPageComponents } from "./modules/search/search.page";
import { SelectPageComponents } from "./modules/select/select.page";
import { SidebarPageComponents } from "./modules/sidebar/sidebar.page";
import { TabsPageComponents } from "./modules/tabs/tabs.page";
import { TransitionPageComponents } from "./modules/transition/transition.page";

// Behaviors
import { LocalizationPageComponents } from "./behaviors/localization/localization.page";

// Development
import { TestPage } from "./development/test/test.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SuiModule,
        DemoComponentsModule
    ],
    declarations: [
        GettingStartedPage,

        // Collections
        MessagePageComponents,
        PaginationPageComponents,

        // Modules
        AccordionPageComponents,
        CheckboxPageComponents,
        CollapsePageComponents,
        DatepickerPageComponents,
        DimmerPageComponents,
        DropdownPageComponents,
        ModalPageComponents,
        PopupPageComponents,
        ProgressPageComponents,
        RatingPageComponents,
        SearchPageComponents,
        SelectPageComponents,
        SidebarPageComponents,
        TabsPageComponents,
        TransitionPageComponents,

        // Behaviors
        LocalizationPageComponents,

        // Development
        TestPage
    ],
    exports: [],
    entryComponents: [
        ConfirmModalComponent
    ]
})
export class DemoPagesModule {}
