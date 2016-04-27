import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';
import {SELECT_DIRECTIVES} from "../../../components/select";
import {TEMPLATE_DIRECTIVES} from "../../../components/template";

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES, TEMPLATE_DIRECTIVES, SELECT_DIRECTIVES],
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
    <!--<div class="ui segment">-->
        <!--<sui-select [placeholder]="placeholder" [options]="testOptions" [(ngModel)]="selected" [isSearchable]="true" #select>-->
            <!--<sui-select-option *ngFor="#result of select.results" [value]="result"><i class="af flag"></i>{{ result }}</sui-select-option>-->
        <!--</sui-select>-->
    <!--</div>-->
    <!--<div class="ui segment">-->
        <!--<p>Selected option: {{ selected | json }}</p>-->
    <!--</div>-->
    <div class="ui segment">
        <sui-select class="fluid" [options]="testOptions" [(ngModel)]="selectedItems" [isSearchable]="true" [allowMultiple]="true" [maxSelected]="3" #multiSelect>
            <sui-select-option *ngFor="#result of multiSelect.results" [value]="result"><i class="af flag"></i>{{ result }}</sui-select-option>
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
    public testOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    public selected = 6;
    public selectedItems = [3, 6];
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
