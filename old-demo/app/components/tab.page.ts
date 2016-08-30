import {Component} from '@angular/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'
import {Api} from "../internal/api.component";

import {TAB_EXAMPLES} from "./tab/tab.examples";

@Component({
    selector: 'tab-component-page',
    directives: [PageTitle, Example, Api, TAB_EXAMPLES],
    templateUrl: "app/components/tab.page.html"
})
export class TabComponentPage {
    public api = [
        {
            selector: "<sui-tabset>"
        },
        {
            selector: "[suiTabHeader]",
            properties: [
                {
                    name: "suiTabHeader",
                    description: "Specifies the ID so the content can be linked to a <code>[suiTabContent]</code>. This must be unique.",
                    required: true
                },
                {
                    name: "isActive",
                    description: "Sets whether the tab is active. Supports being set to <code>false</code> at which time the closest available tab is activated.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    description: "Sets whether not the tab is disabled. If the tab is active when it is disabled, the closest available tab is activated.",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "isActiveChange",
                    description: "Fires when the tab's active status is changed. Using the <code>[(isActive)]</code> syntax is recommended so that the value is updated when the active tab changes."
                },
                {
                    name: "onActivate",
                    description: "Fires when the tab becomes active."
                }
            ]
        },
        {
            selector: "[suiTabContent]",
            properties: [
                {
                    name: "suiTabContent",
                    description: "Specifies the ID so the content can be linked to a <code>[suiTabHeader]</code>. This must be unique.",
                    required: true
                }
            ]
        }
    ]
}