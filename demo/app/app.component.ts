import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";
import {GettingStartedPage} from './home/getting-started.page'

import {TestComponentPage} from "./components/test.page";

import {AccordionComponentPage} from "./components/accordion.page";
import {CheckboxComponentPage} from "./components/checkbox.page";
import {CollapseComponentPage} from "./components/collapse.page";
import {DimmerComponentPage} from "./components/dimmer.page";
import {DropdownComponentPage} from "./components/dropdown.page";
import {ProgressComponentPage} from "./components/progress.page";
import {MessageComponentPage} from "./components/message.page";
import {TabComponentPage} from "./components/tab.page";
import {SearchComponentPage} from "./components/search.page";
import {RatingComponentPage} from "./components/rating.page";

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/app.component.html'
})
@RouteConfig([
    {
        path: '/',
        name: 'GettingStarted',
        component: GettingStartedPage,
        useAsDefault: true
    },
    {
        path: '/components/test',
        name: 'TestComponent',
        component: TestComponentPage
    },

    {
        path: '/components/accordion',
        name: 'AccordionComponent',
        component: AccordionComponentPage
    },
    {
        path: '/components/checkbox',
        name: 'CheckboxComponent',
        component: CheckboxComponentPage
    },
    {
        path: '/components/collapse',
        name: 'CollapseComponent',
        component: CollapseComponentPage
    },
    {
        path: '/components/dimmer',
        name: 'DimmerComponent',
        component: DimmerComponentPage
    },
    {
        path: '/components/dropdown',
        name: 'DropdownComponent',
        component: DropdownComponentPage
    },
    {
        path: '/components/message',
        name: 'MessageComponent',
        component: MessageComponentPage
    },
    {
        path: '/components/progress',
        name: 'ProgressComponent',
        component: ProgressComponentPage
    },
    {
        path: '/components/rating',
        name: 'RatingComponent',
        component: RatingComponentPage
    },
    {
        path: '/components/search',
        name: 'SearchComponent',
        component: SearchComponentPage
    },
    {
        path: '/components/tab',
        name: 'TabComponent',
        component: TabComponentPage
    }
])
export class AppComponent { public test = "hi" }