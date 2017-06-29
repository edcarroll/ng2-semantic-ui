import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GettingStartedPage } from "./pages/getting-started/getting-started.page";

import { MessagePage } from "./pages/message/message.page";
import { PaginationPage } from "./pages/pagination/pagination.page";

import { AccordionPage } from "./pages/accordion/accordion.page";
import { CheckboxPage } from "./pages/checkbox/checkbox.page";
import { CollapsePage } from "./pages/collapse/collapse.page";
import { DatepickerPage } from "./pages/datepicker/datepicker.page";
import { DimmerPage } from "./pages/dimmer/dimmer.page";
import { DropdownPage } from "./pages/dropdown/dropdown.page";
import { ModalPage } from "./pages/modal/modal.page";
import { PopupPage } from "./pages/popup/popup.page";
import { ProgressPage } from "./pages/progress/progress.page";
import { RatingPage } from "./pages/rating/rating.page";
import { SearchPage } from "./pages/search/search.page";
import { SelectPage } from "./pages/select/select.page";
import { SidebarPage } from "./pages/sidebar/sidebar.page";
import { TabsPage } from "./pages/tabs/tabs.page";
import { TransitionPage } from "./pages/transition/transition.page";

import { TestPage } from "./pages/test/test.page";

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

    // Behaviours


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
