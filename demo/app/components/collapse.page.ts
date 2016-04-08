import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'
import {Api} from "../internal/api.component";

import {COLLAPSE_EXAMPLES} from "./collapse/collapse.examples";

@Component({
    selector: 'collapse-component-page',
    directives: [PageTitle, Example, Api, COLLAPSE_EXAMPLES],
    templateUrl: "app/components/collapse.page.html"
})
export class CollapseComponentPage {
    public api = [
        {
            selector: "[suiCollapse]",
            properties: [
                {
                    name: "suiCollapse",
                    description: "Sets whether or not the element is collapsed."
                }
            ]
        }
    ]
}