import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {GettingStartedPage} from "./pages/getting-started/getting-started.page";

import {AccordionPage} from "./pages/accordion/accordion.page";
import {CheckboxPage} from "./pages/checkbox/checkbox.page";
import {CollapsePage} from "./pages/collapse/collapse.page";
import {DimmerPage} from "./pages/dimmer/dimmer.page";
import {DropdownPage} from "./pages/dropdown/dropdown.page";
import {MessagePage} from "./pages/message/message.page";
import {ProgressPage} from "./pages/progress/progress.page";
import {RatingPage} from "./pages/rating/rating.page";
import {SearchPage} from "./pages/search/search.page";
import {TabsPage} from "./pages/tabs/tabs.page";
import {TestPage} from "./pages/test/test.page";
import {SelectPage} from "./pages/select/select.page";

const appRoutes: Routes = [
    {
        path: 'getting-started',
        component: GettingStartedPage,
    },
    {
        path: 'accordion',
        component: AccordionPage
    },
    {
        path: 'checkbox',
        component: CheckboxPage
    },
    {
        path: 'collapse',
        component: CollapsePage
    },
    {
        path: 'dimmer',
        component: DimmerPage
    },
    {
        path: 'dropdown',
        component: DropdownPage
    },
    {
        path: 'message',
        component: MessagePage
    },
    {
        path: 'progress',
        component: ProgressPage
    },
    {
        path: 'rating',
        component: RatingPage
    },
    {
        path: 'search',
        component: SearchPage
    },
    {
        path: 'select',
        component: SelectPage
    },
    {
        path: 'tabs',
        component: TabsPage
    },
    {
        path: 'test',
        component: TestPage
    },
    {
        path: '**',
        redirectTo: '/getting-started',
        pathMatch: 'full'
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
