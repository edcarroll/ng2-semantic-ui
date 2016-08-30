import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {GettingStartedPage} from "./pages/getting-started/getting-started.page";

import {AccordionPage} from "./pages/accordion/accordion.page";
import {CheckboxPage} from "./pages/checkbox/checkbox.page";
import {CollapsePage} from "./pages/collapse/collapse.page";

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
        path: '**',
        redirectTo: '/getting-started',
        pathMatch: 'full'
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
