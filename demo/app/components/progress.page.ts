import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'
import {Api} from "../internal/api.component";

import {PROGRESS_EXAMPLES} from "./progress/progress.examples";

@Component({
    selector: 'progress-component-page',
    directives: [PageTitle, Example, Api, PROGRESS_EXAMPLES],
    templateUrl: "app/components/progress.page.html"
})
export class ProgressComponentPage {
    public api = [
        {
            selector: "<sui-progress>",
            properties: [
                {
                    name: "value",
                    description: "Sets whether or not the element is collapsed. Values not in <code>[0, ..., maximum]</code> are automatically bounded.",
                    defaultValue: "0"
                },
                {
                    name: "maximum",
                    description: "Sets the maximum value. When <code>value > maximum</code> the progress bar is full. Use the 1st example to try out this functionality.",
                    defaultValue: "100"
                },
                {
                    name: "progress",
                    description: "Whether or not the current progress label is displayed.",
                    defaultValue: "true"
                },
                {
                    name: "precision",
                    description: "Sets the number of decimal places on the current progress label.",
                    defaultValue: "0"
                },
                {
                    name: "autoSuccess",
                    description: "Sets whether or not the progress bar automatically turns green when <code>value == maximum</code>.",
                    defaultValue: "true"
                },
            ]
        }
    ]
}