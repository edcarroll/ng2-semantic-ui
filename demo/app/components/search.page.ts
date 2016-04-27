import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'
import {Api} from "../internal/api.component";

import {SEARCH_EXAMPLES} from "./search/search.examples";

@Component({
    selector: 'search-component-page',
    directives: [PageTitle, Example, Api, SEARCH_EXAMPLES],
    templateUrl: "app/components/search.page.html"
})
export class SearchComponentPage {
    public api = [
        {
            selector: "<sui-search>",
            properties: [
                {
                    name: "placeholder",
                    description: "Sets the placeholder string on the search box.",
                    defaultValue: "Search..."
                },
                {
                    name: "options",
                    description: "Sets the options available to the search component. Can either be an array or a function that takes a query and returns a Promise for remote lookup."
                },
                {
                    name: "optionsField",
                    description: "Sets the property name that the search element uses to display each option. Supports dot notation for nested properties."
                },
                {
                    name: "searchDelay",
                    description: "Sets the amount of time in milliseconds to wait after the last keypress before running a search.",
                    defaultValue: "200"
                },
                {
                    name: "icon",
                    description: "Sets whether or not the search displays an icon. Loading state is automatically applied when searching.",
                    defaultValue: "true"
                },
                {
                    name: "ngModel",
                    description: "Bind the search selected item to the value of the provided variable."
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the search's selected item is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "onItemSelected",
                    description: "Fires whenever the search's selected item is changed. The selected value is passed as <code>$event</code>."
                }
            ]
        }
    ]
}