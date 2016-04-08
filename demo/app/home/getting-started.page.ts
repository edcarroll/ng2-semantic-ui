import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Codeblock} from 'ng2-prism/codeblock';
import {Markup, Typescript} from "ng2-prism/languages";

@Component({
    selector: 'getting-started-page',
    directives: [PageTitle, Codeblock, Typescript, Markup],
    templateUrl: "app/home/getting-started.page.html"
})
export class GettingStartedPage { }