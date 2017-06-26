import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GettingStartedPage } from "./pages/getting-started/getting-started.page";

import { AccordionPage } from "./pages/accordion/accordion.page";
import { CheckboxPage } from "./pages/checkbox/checkbox.page";
import { CollapsePage } from "./pages/collapse/collapse.page";
import { DatepickerPage } from "./pages/datepicker/datepicker.page";
import { DimmerPage } from "./pages/dimmer/dimmer.page";
import { DropdownPage } from "./pages/dropdown/dropdown.page";
import { MessagePage } from "./pages/message/message.page";
import { ModalPage } from "./pages/modal/modal.page";
import { PaginationPage } from "./pages/pagination/pagination.page";
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
    {
        path: "components/accordion",
        component: AccordionPage
    },
    {
        path: "components/checkbox",
        component: CheckboxPage
    },
    {
        path: "components/collapse",
        component: CollapsePage
    },
    {
        path: "components/datepicker",
        component: DatepickerPage
    },
    {
        path: "components/dimmer",
        component: DimmerPage
    },
    {
        path: "components/dropdown",
        component: DropdownPage
    },
    {
        path: "components/message",
        component: MessagePage
    },
    {
        path: "components/modal",
        component: ModalPage
    },
    {
        path: "components/pagination",
        component: PaginationPage
    },
    {
        path: "components/popup",
        component: PopupPage
    },
    {
        path: "components/progress",
        component: ProgressPage
    },
    {
        path: "components/rating",
        component: RatingPage
    },
    {
        path: "components/search",
        component: SearchPage
    },
    {
        path: "components/select",
        component: SelectPage
    },
    {
        path: "components/sidebar",
        component: SidebarPage
    },
    {
        path: "components/tabs",
        component: TabsPage
    },
    {
        path: "components/transition",
        component: TransitionPage
    },
    {
        path: "test",
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
