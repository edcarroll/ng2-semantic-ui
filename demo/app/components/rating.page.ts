import {Component} from 'angular2/core';

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
                    name: "suiCollapse",
                    description: "Sets whether or not the element is collapsed."
                }
            ]
        }
    ]
}