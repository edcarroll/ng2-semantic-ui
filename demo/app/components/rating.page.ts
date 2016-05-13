import {Component} from '@angular/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'
import {Api} from "../internal/api.component";

import {RATING_EXAMPLES} from "./rating/rating.examples";

@Component({
    selector: 'rating-component-page',
    directives: [PageTitle, Example, Api, RATING_EXAMPLES],
    templateUrl: "app/components/rating.page.html"
})
export class RatingComponentPage {
    public api = [
        {
            selector: "<sui-rating>",
            properties: [
                {
                    name: "max",
                    description: "Sets the highest value the rating allows as input.",
                    defaultValue: "5"
                },
                {
                    name: "ngModel",
                    description: "Bind the rating value to the value of the provided variable."
                },
                {
                    name: "isReadonly",
                    description: "Sets whether or not the rating is read-only. This only affects the UI, <code>[ngModel]</code> changes will still display.",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the rating value is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "valueChange",
                    description: "Fires whenever the rating value is changed."
                }
            ]
        },
    ]
}