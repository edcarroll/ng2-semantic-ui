import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {GettingStartedPage} from './home/getting-started.page'

import {TestComponentPage} from "./components/test.page";

import {AccordionComponentPage} from "./components/accordion.page";
import {CollapseComponentPage} from "./components/collapse.page";
import {DropdownComponentPage} from "./components/dropdown.page";

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
        path: '/components/collapse',
        name: 'CollapseComponent',
        component: CollapseComponentPage
    },
    {
        path: '/components/dropdown',
        name: 'DropdownComponent',
        component: DropdownComponentPage
    }
])
export class AppComponent { public test = "hi" }