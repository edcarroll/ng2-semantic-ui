import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'
import {Api} from "../internal/api.component";

import {DIMMER_EXAMPLES} from "./dimmer/dimmer.examples";

@Component({
    selector: 'dimmer-component-page',
    directives: [PageTitle, Example, Api, DIMMER_EXAMPLES],
    templateUrl: "app/components/dimmer.page.html"
})
export class DimmerComponentPage {
    public api = [
        {
            selector: "<sui-dimmer>",
            properties: [
                {
                    name: "isDimmed",
                    description: "Sets whether or not the dimmer is active.",
                    defaultValue: "false"
                },
                {
                    name: "isClickable",
                    description: "Sets whether or not clicking the dimmer will dismiss it.",
                    defaultValue: "true"
                }
            ],
            events: [
                {
                    name: "isDimmedChange",
                    description: "Fires whenever the dimmer is toggled. Use the <code>[(isDimmed)]</code> syntax to update when the user clicks out of the dimmer."
                }
            ]
        }
    ]
}