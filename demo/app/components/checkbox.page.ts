import {Component} from '@angular/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from "../internal/example.component";
import {Api} from "../internal/api.component";

import {CHECKBOX_EXAMPLES} from './checkbox/checkbox.examples';

@Component({
    selector: 'checkbox-component-page',
    directives: [PageTitle, Example, Api, CHECKBOX_EXAMPLES],
    templateUrl: 'app/components/checkbox.page.html'
})
export class CheckboxComponentPage {
    public api = [
        {
            selector: "<sui-checkbox>",
            properties: [
                {
                    name: "name",
                    description: "Sets the name on the internal <code>&lt;input&gt;</code> element."
                },
                {
                    name: "ngModel",
                    description: "Bind the checkbox value to the value of the provided variable."
                },
                {
                    name: "isDisabled",
                    description: " Sets whether or not the checkbox is disabled. (This only affects the UI, state can still be changed programatically)",
                    defaultValue: "false"
                },
                {
                    name: "isReadonly",
                    description: "Sets whether or not the checkbox is read-only. (UI only, as above)",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the checkbox check is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "checkChange",
                    description: "Fires whenever the checkbox check is changed."
                }
            ]
        },
        {
            selector: "<sui-radio-button>",
            properties: [
                {
                    name: "name",
                    description: "Sets the name on the internal <code>&lt;input&gt;</code> component."
                },
                {
                    name: "value",
                    description: "Sets the value that selecting this radio button returns. Supports binding any object."
                },
                {
                    name: "ngModel",
                    description: "Bind the radio button value to the value of the provided variable.",
                    required: true
                },
                {
                    name: "isDisabled",
                    description: " Sets whether or not the radio button is disabled. (This only affects the UI, state can still be changed programatically)",
                    defaultValue: "false"
                },
                {
                    name: "isReadonly",
                    description: "Sets whether or not the radio button is read-only. (UI only, as above)",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the radio button check is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "currentValueChange",
                    description: "Fires whenever the radio button check is changed."
                }
            ]
        }
    ]
}