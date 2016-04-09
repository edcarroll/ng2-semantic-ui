import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component';
import {Api} from './../internal/api.component';

import {DROPDOWN_EXAMPLES} from './dropdown/dropdown.examples';

@Component({
    selector: 'dropdown-component-page',
    directives: [PageTitle, Example, Api, DROPDOWN_EXAMPLES],
    templateUrl: "app/components/dropdown.page.html"
})
export class DropdownComponentPage {
    public api = [
        {
            selector: "[suiDropdown]",
            properties: [
                {
                    name: "isOpen",
                    description: "Sets whether or not the dropdown is open.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    description: "Sets whether or not the dropdown is disabled",
                    defaultValue: "false"
                },
                {
                    name: "autoClose",
                    description: "Defines when the dropdown is closed. Options are: <code>itemClick</code>, <code>outsideClick</code> & <code>disabled</code>.",
                    defaultValue: "itemClick"
                }
            ],
            events: [
                {
                    name: "isOpenChange",
                    description: "Fires whenever the dropdown is toggled. <code>[(isOpen)]</code> syntax is supported."
                },
                {
                    name: "onToggle",
                    description: "Fires whenever the dropdown is toggled, as above."
                }
            ]
        },
        {
            selector: "[suiDropdownMenu]"
        }
    ]
}