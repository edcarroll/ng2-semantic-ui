import {Component} from '@angular/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'
import {Api} from './../internal/api.component'

import {ACCORDION_EXAMPLES} from "./accordion/accordion.examples";

@Component({
    selector: 'accordion-component-page',
    directives: [PageTitle, Example, Api, ACCORDION_EXAMPLES],
    templateUrl: "app/components/accordion.page.html"
})
export class AccordionComponentPage {
    public api = [
        {
            selector: '<sui-accordion>',
            properties: [
                {
                    name: "closeOthers",
                    description: "Limits the number of open panels to 1 when <code>true</code>.",
                    defaultValue: "true"
                }
            ]
        },
        {
            selector: '<sui-accordion-panel>',
            properties: [
                {
                    name: "isOpen",
                    description: "Sets whether or not the panel is open.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    description: "Sets whether or not the panel is disabled (locks current state).",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "isOpenChange",
                    description: "Fires whenever the panel is toggled. <code>[(isOpen)]</code> syntax is supported."
                }
            ]
        }
    ]
}