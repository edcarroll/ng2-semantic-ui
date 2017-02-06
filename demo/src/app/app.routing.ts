import {Routes, RouterModule} from '@angular/router';
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
import {TransitionPage} from "./pages/transition/transition.page";
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
    {
        path: 'getting-started',
        component: GettingStartedPage,
    },
    {
        path: 'components/accordion',
        component: AccordionPage
    },
    {
        path: 'components/checkbox',
        component: CheckboxPage
    },
    {
        path: 'components/collapse',
        component: CollapsePage
    },
    {
        path: 'components/dimmer',
        component: DimmerPage
    },
    {
        path: 'components/dropdown',
        component: DropdownPage
    },
    {
        path: 'components/message',
        component: MessagePage
    },
    {
        path: 'components/progress',
        component: ProgressPage
    },
    {
        path: 'components/rating',
        component: RatingPage
    },
    // {
    //     path: 'components/search',
    //     component: SearchPage
    // },
    // {
    //     path: 'components/select',
    //     component: SelectPage
    // },
    {
        path: 'components/tabs',
        component: TabsPage
    },
    {
        path: 'components/transition',
        component: TransitionPage
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

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class DemoRoutingModule {}