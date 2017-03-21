import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-select',
  templateUrl: './select.page.html'
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
                    description: "Sets the options available to the select component.",
                    required: true
                },
                {
                    name: "labelField",
                    description: "Sets the property name that is used as a label for each option. Supports dot notation for nested properties."
                },
                {
                    name: "valueField",
                    description: "Sets the property name that is used to bind to ngModel. Leaving this blank uses the entire object. Supports dot notation for nested properties."
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
                    name: "optionTemplate",
                    description: "Sets the template to use when displaying options."
                },
                {
                    name: "noResultsMessage",
                    description: "Sets the message displayed when there are no available options",
                    defaultValue: "No results"
                },
                {
                    name: "ngModel",
                    description: "Bind the selected item to the value of the provided variable."
                }
            ],
            events: [
                {
                    name: "selectedOptionChange",
                    description: "Fires whenever the selected item is changed. The selected item is passed as <code>$event</code>."
                },
                {
                    name: "ngModelChange",
                    description: "Fires whenever the selected item is changed. <code>[(ngModel)]</code> syntax is supported."
                }
            ]
        },
        {
            selector: '<sui-multi-select>',
            properties: [
                {
                    name: "placeholder",
                    description: "Sets the placeholder string on the search box.",
                    defaultValue: "Select..."
                },
                {
                    name: "options",
                    description: "Sets the options available to the multi select component.",
                    required: true
                },
                {
                    name: "labelField",
                    description: "Sets the property name that is used as a label for each option. Supports dot notation for nested properties."
                },
                {
                    name: "valueField",
                    description: "Sets the property name that is used to bind to ngModel. Leaving this blank uses the entire object. Supports dot notation for nested properties."
                },
                {
                    name: "isDisabled",
                    description: "Sets whether or not the multi select is disabled",
                    defaultValue: "false"
                },
                {
                    name: "isSearchable",
                    description: "Sets whether the multi select is searchable. If set to <code>true</code> the <code>options</code> property must be used.",
                    defaultValue: "false"
                },
                {
                    name: "maxSelected",
                    description: "Sets the maximum number of values that can be selected at any one time."
                },
                {
                    name: "optionTemplate",
                    description: "Sets the template to use when displaying options."
                },
                {
                    name: "noResultsMessage",
                    description: "Sets the message displayed when there are no available options",
                    defaultValue: "No results"
                },
                {
                    name: "ngModel",
                    description: "Bind the selected items to the value of the provided variable."
                }
            ],
            events: [
                {
                    name: "selectedOptionsChange",
                    description: "Fires whenever the selected items are changed. The selected items are passed as <code>$event</code>."
                },
                {
                    name: "ngModelChange",
                    description: "Fires whenever the selected items are changed. <code>[(ngModel)]</code> syntax is supported."
                }
            ]
        },
        {
            selector: '<sui-select-option>',
            properties: [
                {
                    name: "value",
                    description: "Sets the value of the option.",
                    required: true
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = `
<sui-select [(ngModel)]="selectedGender" placeholder="Gender">
    <sui-select-option value="Male"></sui-select-option>
    <sui-select-option value="Female"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedGender | json }}</p>
</div>
`;
    public exampleOptionsTemplate:string = `
<sui-select [(ngModel)]="selectedOption" [options]="options" labelField="name" #select>
    <sui-select-option *ngFor="let option of select.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOption | json }}</p>
    <button class="ui button" (click)="addOption()">Add Option</button>
</div>
`;
    public exampleSearchTemplate:string = `
<p>You can also use the keyboard to navigate.</p>
<sui-select [(ngModel)]="selectedOption" [options]="options" labelField="name" [isSearchable]="true" #searchSelect>
    <sui-select-option *ngFor="let option of searchSelect.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOption | json }}</p>
</div>
`;
    public exampleMultipleTemplate:string = `
<sui-multi-select class="fluid" [(ngModel)]="selectedOptions" [options]="options" #multiSelect>
    <sui-select-option *ngFor="let option of multiSelect.availableOptions" [value]="option"></sui-select-option>
</sui-multi-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOptions | json }}</p>
</div>
`;
    public exampleMultipleSearchTemplate:string = `
<sui-multi-select class="fluid" [(ngModel)]="selectedOptions" [options]="options" [isSearchable]="true" [maxSelected]="5" #searchSelect>
    <sui-select-option *ngFor="let option of searchSelect.availableOptions" [value]="option"></sui-select-option>
</sui-multi-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOptions | json }}</p>
</div>
`;
    public exampleTemplateSearchTemplate:string = `
<template let-option #optionTemplate>
    <i class="child icon"></i>{{ option.name }}
</template>
<div class="ui form">
    <div class="field">
        <sui-select [(ngModel)]="selectedOption" [options]="options" labelField="name" [optionTemplate]="optionTemplate" [isSearchable]="true" #select>
            <div class="header">
                <i class="users icon"></i>
                Custom Menu Markup!
                </div>
                <div class="divider"></div>
            <sui-select-option *ngFor="let option of select.availableOptions" [value]="option"></sui-select-option>
        </sui-select>
    </div>
    <div class="field">
        <sui-multi-select class="fluid" [(ngModel)]="selectedOptions" [options]="options" valueField="name" [optionTemplate]="optionTemplate" #multiSelect>
            <sui-select-option *ngFor="let option of multiSelect.availableOptions" [value]="option"></sui-select-option>
        </sui-multi-select>
    </div>
</div>
<div class="ui segment">
    <p>Singly selected: {{ selectedOption | json }}</p>
    <p>Multi selected: {{ selectedOptions | json }}</p>
</div>
`;
}

@Component({
    selector: 'select-example-standard',
    template: new SelectPage().exampleStandardTemplate
})
export class SelectExampleStandard {

}

@Component({
    selector: 'select-example-options',
    template: new SelectPage().exampleOptionsTemplate
})
export class SelectExampleOptions {
    public options:Array<any> = [{ name: "Example" }, { name: "Test" }, { name: "What" }, { name: "No" }, { name: "Benefit" }, { name: "Oranges" }, { name: "Artemis" }, { name: "Another" }];
    public addOption() {
        this.options.push({ name: "Dynamic Option" });
    }
    public selectedOption = this.options[0];
}

@Component({
    selector: 'select-example-search',
    template: new SelectPage().exampleSearchTemplate
})
export class SelectExampleSearch {
    public options:Array<any> = [{ name: "Example" }, { name: "Test" }, { name: "What" }, { name: "No" }, { name: "Benefit" }, { name: "Oranges" }, { name: "Artemis" }, { name: "Another" }];
}

@Component({
    selector: 'select-example-multiple',
    template: new SelectPage().exampleMultipleTemplate
})
export class SelectExampleMultiple {
    public options:Array<any> = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis", "Another"];
    public selectedOptions = ["What", "Oranges"];
}

@Component({
    selector: 'select-example-multiple-search',
    template: new SelectPage().exampleMultipleSearchTemplate
})
export class SelectExampleMultipleSearch {
    public options:Array<any> = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis", "Another"];
    public selectedOptions = ["What", "Oranges"];
}

@Component({
    selector: 'select-example-template-search',
    template: new SelectPage().exampleTemplateSearchTemplate
})
export class SelectExampleTemplateSearch {
    public options:Array<any> = [{ name: "Example"}, { name: "Test"}, { name: "What"}, { name: "No"}, { name: "Benefit"}, { name: "Oranges"}, { name: "Artemis"}, { name: "Another"}];
    public selectedOption = this.options[5];
}

export const SelectPageComponents:Array<any> = [SelectPage, SelectExampleStandard, SelectExampleOptions, SelectExampleSearch, SelectExampleMultiple, SelectExampleMultipleSearch, SelectExampleTemplateSearch];
