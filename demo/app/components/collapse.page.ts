import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'

import {COLLAPSE_EXAMPLES} from "./collapse/collapse.examples";

@Component({
    selector: 'collapse-component-page',
    directives: [PageTitle, Example, COLLAPSE_EXAMPLES],
    templateUrl: "app/components/collapse.page.html"
})
export class CollapseComponentPage { }