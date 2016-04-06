import {Component} from 'angular2/core';

import {ExampleComponent} from './../internal/example.component'

import {Codeblock} from 'ng2-prism/codeblock';
import {Markup} from 'ng2-prism/languages';

@Component({
    directives: [ExampleComponent, Codeblock, Markup],
    templateUrl: "/app/components/dropdown.page.html"
})
export class DropdownComponentPage { }