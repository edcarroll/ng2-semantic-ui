import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GettingStartedPage } from "./pages/getting-started/getting-started.page";

// Collections
import { MessagePage } from "./pages/collections/message/message.page";
import { PaginationPage } from "./pages/collections/pagination/pagination.page";

// Modules
import { AccordionPage } from "./pages/modules/accordion/accordion.page";
import { CheckboxPage } from "./pages/modules/checkbox/checkbox.page";
import { CollapsePage } from "./pages/modules/collapse/collapse.page";
import { DatepickerPage } from "./pages/modules/datepicker/datepicker.page";
import { DimmerPage } from "./pages/modules/dimmer/dimmer.page";
import { DropdownPage } from "./pages/modules/dropdown/dropdown.page";
import { ModalPage } from "./pages/modules/modal/modal.page";
import { PopupPage } from "./pages/modules/popup/popup.page";
import { ProgressPage } from "./pages/modules/progress/progress.page";
import { RatingPage } from "./pages/modules/rating/rating.page";
import { SearchPage } from "./pages/modules/search/search.page";
import { SelectPage } from "./pages/modules/select/select.page";
import { SidebarPage } from "./pages/modules/sidebar/sidebar.page";
import { TabsPage } from "./pages/modules/tabs/tabs.page";
import { TransitionPage } from "./pages/modules/transition/transition.page";

// Behaviors
import { LocalizationPage } from "./pages/behaviors/localization/localization.page";

// Development
import { TestPage } from "./pages/development/test/test.page";

const appRoutes:Routes = [
    {
        path: "getting-started",
        component: GettingStartedPage
    },

    // Collections
    {
        path: "collections/message",
        component: MessagePage
    },
    {
        path: "collections/pagination",
        component: PaginationPage
    },

    // Modules
    {
        path: "modules/accordion",
        component: AccordionPage
    },
    {
        path: "modules/checkbox",
        component: CheckboxPage
    },
    {
        path: "modules/collapse",
        component: CollapsePage
    },
    {
        path: "modules/datepicker",
        component: DatepickerPage
    },
    {
        path: "modules/dimmer",
        component: DimmerPage
    },
    {
        path: "modules/dropdown",
        component: DropdownPage
    },
    {
        path: "modules/modal",
        component: ModalPage
    },
    {
        path: "modules/popup",
        component: PopupPage
    },
    {
        path: "modules/progress",
        component: ProgressPage
    },
    {
        path: "modules/rating",
        component: RatingPage
    },
    {
        path: "modules/search",
        component: SearchPage
    },
    {
        path: "modules/select",
        component: SelectPage
    },
    {
        path: "modules/sidebar",
        component: SidebarPage
    },
    {
        path: "modules/tabs",
        component: TabsPage
    },
    {
        path: "modules/transition",
        component: TransitionPage
    },

    // Behaviors
    {
        path: "behaviors/localization",
        component: LocalizationPage
    },

    // Development
    {
        path: "development/test",
        component: TestPage
    },

    {
        path: "**",
        redirectTo: "/getting-started",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class DemoRoutingModule {}
