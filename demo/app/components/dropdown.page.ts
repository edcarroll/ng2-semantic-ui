import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component';

import {Codeblock} from 'ng2-prism/codeblock';
import {Typescript} from 'ng2-prism/languages';

@Component({
    selector: 'dropdown-component-page',
    directives: [PageTitle, Example, Codeblock, Typescript],
    templateUrl: "app/components/dropdown.page.html"
})
export class DropdownComponentPage { }