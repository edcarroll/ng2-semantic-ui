import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';
import {Search, SearchValueAccessor} from "../../../components/search/search.component";
import {TEMPLATE_DIRECTIVES} from "../../../components/template";

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES, TEMPLATE_DIRECTIVES, Search, SearchValueAccessor],
    template: `
<page-title>
    <div header>Test</div>
    <div sub-header>
        <p>Test component!</p>
    </div>
</page-title>
<div class="ui main container">
    <div class="ui dividing right rail"></div>
    <h2 class="ui dividing header">Examples</h2>
    <div class="ui segment">
        <sui-search [placeholder]="placeholder" [options]="optionsSearch" optionsField="test" [(ngModel)]="selected"></sui-search>
    </div>
    <div class="ui segment">
        <p>Selected option: {{ selected | json }}</p>
    </div>
</div>
`
})
export class TestComponentPage {
    public options:Array<any> = [{ test: "Example"}, { test: "Test"}, { test: "What"}, { test: "No"}, { test: "Benefit"}, { test: "Oranges"}, { test: "Artemis"}, { test: "Teeeest"}];
    public placeholder:string = "Search weirdness...";
    public optionsSearch(query:string):Promise<Array<any>> {
        var options = [{ test: "Example"}, { test: "Test"}, { test: "What"}, { test: "No"}, { test: "Benefit"}, { test: "Oranges"}, { test: "Artemis"}, { test: "Teeeest"}];
        return new Promise((resolve, reject) => {
            var results = options.filter((o:any) => {
                return o.test.slice(0, query.length).toLowerCase() == query.toLowerCase();
            });
            setTimeout(() => {
                resolve(results);
            }, 300);
        });
    }
}
