import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'

import {ACCORDION_EXAMPLES} from "./accordion/accordion.examples";

@Component({
    selector: 'accordion-component-page',
    directives: [PageTitle, Example, ACCORDION_EXAMPLES],
    templateUrl: "/app/components/accordion.page.html"
})
export class AccordionComponentPage { }