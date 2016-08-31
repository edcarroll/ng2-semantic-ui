import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-select',
  templateUrl: 'select.page.html',
  styleUrls: ['select.page.css']
})
export class SelectPage {
    public api = [
        {
            selector: '<sui-select>',
            properties: [
                {
                    name: "placeholder",
                    description: "Sets the placeholder string on the search box.",
                    defaultValue: "Select one"
                },
                {
                    name: "options",
                    description: "Sets the options available to the select component. Can either be an array or a function that takes a query and returns a Promise for remote lookup."
                },
                {
                    name: "optionsField",
                    description: "Sets the property name that the select element uses to display each option. Supports dot notation for nested properties."
                },
                {
                    name: "isDisabled",
                    description: "Sets whether or not the select is disabled",
                    defaultValue: "false"
                },
                {
                    name: "isSearchable",
                    description: "Sets whether the select is searchable. If set to <code>true</code> the <code>options</code> property must be used.",
                    defaultValue: "false"
                },
                {
                    name: "searchDelay",
                    description: "If searching is enabled, this sets the amount of time in milliseconds to wait after the last keypress before running a search.",
                    defaultValue: "0"
                },
                {
                    name: "allowMultiple",
                    description: "Whether the select allows multiple values to be selected.",
                    defaultValue: "false"
                },
                {
                    name: "maxSelected",
                    description: "If multiple selection is enabled, this sets the maximum number of values that can be selected at any one time."
                },
                {
                    name: "optionTemplate",
                    description: "Sets the template to use when displaying options."
                },
                {
                    name: "ngModel",
                    description: "Bind the search selected item to the value of the provided variable."
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the select's selected item is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "selectedOptionChange",
                    description: "Fires whenever the select's selected item is changed. The selected value is passed as <code>$event</code>."
                }
            ]
        },
        {
            selector: '<sui-select-option>',
            properties: [
                {
                    name: "value",
                    description: "Sets the value of the options."
                }
            ]
        }
    ]
}

@Component({
    selector: 'select-example-standard',
    template: `
<sui-select [(ngModel)]="selectedGender" placeholder="Gender">
    <sui-select-option value="Male"></sui-select-option>
    <sui-select-option value="Female"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedGender | json }}</p>
</div>
`
})
export class SelectExampleStandard {}

@Component({
    selector: 'select-example-options',
    template: `
<sui-select [(ngModel)]="selectedOption" [options]="options" optionsField="name" #select>
    <sui-select-option *ngFor="let option of select.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOption | json }}</p>
    <button class="ui button" (click)="addOption()">Add Option</button>
</div>
`
})
export class SelectExampleOptions {
    public options:Array<any> = [{ name: "Example"}, { name: "Test"}, { name: "What"}, { name: "No"}, { name: "Benefit"}, { name: "Oranges"}, { name: "Artemis"}, { name: "Another"}];
    public addOption() {
        this.options.push({ name: "Dynamic Option" });
    }
}

@Component({
    selector: 'select-example-search',
    template: `
<p>You can also use the keyboard to navigate.</p>
<sui-select [(ngModel)]="selectedOption" [options]="options" optionsField="name" [isSearchable]="true" #searchSelect>
    <sui-select-option *ngFor="let option of searchSelect.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOption | json }}</p>
</div>
`
})
export class SelectExampleSearch {
    public options:Array<any> = [{ name: "Example"}, { name: "Test"}, { name: "What"}, { name: "No"}, { name: "Benefit"}, { name: "Oranges"}, { name: "Artemis"}, { name: "Another"}];
}

@Component({
    selector: 'select-example-multiple',
    template: `
<sui-select class="fluid" [(ngModel)]="selectedOptions" [options]="options" [allowMultiple]="true" #multiSelect>
    <sui-select-option *ngFor="let option of multiSelect.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOptions | json }}</p>
</div>
`
})
export class SelectExampleMultiple {
    public options:Array<any> = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis", "Another"];
    public selectedOptions = ["What", "Oranges"];
}

@Component({
    selector: 'select-example-multiple-search',
    template: `
<sui-select class="fluid" [(ngModel)]="selectedOptions" [options]="options" [isSearchable]="true" [allowMultiple]="true" [maxSelected]="5" #searchSelect>
    <sui-select-option *ngFor="let option of searchSelect.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOptions | json }}</p>
</div>
`
})
export class SelectExampleMultipleSearch {
    public options:Array<any> = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis", "Another"];
    public selectedOptions = ["What", "Oranges"];
}

@Component({
    selector: 'select-example-template-search',
    template: `
<template let-option="option" #optionTemplate>
    <i class="child icon"></i>{{ option.name }}
</template>
<div class="ui form">
    <div class="field">
        <sui-select [(ngModel)]="selectedOption" [options]="options" optionsField="name" [optionTemplate]="optionTemplate" [isSearchable]="true" #select>
            <sui-select-option *ngFor="let option of select.availableOptions" [value]="option"></sui-select-option>
        </sui-select>
    </div>
    <div class="field">
        <sui-select class="fluid" [(ngModel)]="selectedOptions" [options]="options" optionsField="name" [optionTemplate]="optionTemplate" [allowMultiple]="true" #multiSelect>
            <sui-select-option *ngFor="let option of multiSelect.availableOptions" [value]="option"></sui-select-option>
        </sui-select>
    </div>
</div>
<div class="ui segment">
    <p>Singly selected: {{ selectedOption | json }}</p>
    <p>Multi selected: {{ selectedOptions | json }}</p>
</div>
`
})
export class SelectExampleTemplateSearch {
    public options:Array<any> = [{ name: "Example"}, { name: "Test"}, { name: "What"}, { name: "No"}, { name: "Benefit"}, { name: "Oranges"}, { name: "Artemis"}, { name: "Another"}];
}

export const SELECT_EXAMPLES:Array<any> = [SelectExampleStandard, SelectExampleOptions, SelectExampleSearch, SelectExampleMultiple, SelectExampleMultipleSearch, SelectExampleTemplateSearch];
