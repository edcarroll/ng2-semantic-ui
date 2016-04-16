import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';
import {Select, SelectValueAccessor, SelectOption} from "../../../components/select/select.component";
import {TEMPLATE_DIRECTIVES} from "../../../components/template";

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES, TEMPLATE_DIRECTIVES, Select, SelectValueAccessor, SelectOption],
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
        <sui-select [placeholder]="placeholder" [options]="options" optionsField="test" [(ngModel)]="selected" [isSearchable]="true" #select>
            <sui-select-option *ngFor="#result of select.results" [value]="result"><i class="af flag"></i>{{ result.test }}</sui-select-option>
        </sui-select>
    </div>
    <div class="ui segment">
        <p>Selected option: {{ selected | json }}</p>
    </div>
    <div class="ui segment">
        <sui-select class="fluid" [options]="options" optionsField="test" [(ngModel)]="selectedItems" [isSearchable]="false" [allowMultiple]="true" #multiSelect>
            <sui-select-option *ngFor="#result of multiSelect.results" [value]="result"><i class="af flag"></i>{{ result.test }}</sui-select-option>
        </sui-select>
    </div>
    <div class="ui segment">
        <p>Selected items: {{ selectedItems | json }}</p>
    </div>
</div>
`
})
export class TestComponentPage {
    public options:Array<any> = [{ test: "Example"}, { test: "Test"}, { test: "What"}, { test: "No"}, { test: "Benefit"}, { test: "Oranges"}, { test: "Artemis"}, { test: "Teeeest"}];
    public placeholder:string = "Select Weirdness";
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
