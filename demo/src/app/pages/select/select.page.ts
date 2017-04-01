import {Component} from '@angular/core';

const exampleStandardTemplate = `
<sui-select [(ngModel)]="selectedGender" placeholder="Gender">
    <sui-select-option value="Male"></sui-select-option>
    <sui-select-option value="Female"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedGender | json }}</p>
</div>
`;

const exampleOptionsTemplate = `
<sui-select [(ngModel)]="selectedOption" [options]="options" labelField="name" #select>
    <sui-select-option *ngFor="let option of select.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOption | json }}</p>
    <button class="ui button" (click)="addOption()">Add Option</button>
</div>
`;

const exampleSearchTemplate = `
<p>You can also use the keyboard to navigate.</p>
<sui-select [(ngModel)]="selectedOption" [options]="options" labelField="name" [isSearchable]="true" #searchSelect>
    <sui-select-option *ngFor="let option of searchSelect.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOption | json }}</p>
</div>
`;

const exampleSearchLookupTemplate = `
<p>You can also use the keyboard to navigate.</p>
<sui-select [(ngModel)]="selectedOption" [options]="optionsLookup" labelField="name" valueField="id" [isSearchable]="true" #searchSelect>
    <sui-select-option *ngFor="let option of searchSelect.availableOptions" [value]="option"></sui-select-option>
</sui-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOption | json }}</p>
</div>
`;

const exampleMultipleTemplate = `
<sui-multi-select class="fluid" [(ngModel)]="selectedOptions" [options]="options" #multiSelect>
    <sui-select-option *ngFor="let option of multiSelect.availableOptions" [value]="option"></sui-select-option>
</sui-multi-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOptions | json }}</p>
</div>
`;

const exampleMultipleSearchTemplate = `
<sui-multi-select class="fluid" [(ngModel)]="selectedOptions" [options]="options" [isSearchable]="true" [maxSelected]="5" #searchSelect>
    <sui-select-option *ngFor="let option of searchSelect.availableOptions" [value]="option"></sui-select-option>
</sui-multi-select>
<div class="ui segment">
    <p>Currently selected: {{ selectedOptions | json }}</p>
</div>
`;

const exampleTemplateSearchTemplate = `
<ng-template let-option #optionTemplate>
    <i class="child icon"></i>{{ option.name }}
</ng-template>
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
                    description: "Sets the options available to the select component. Can either be an array or a function that takes a query and returns a Promise for remote lookup."
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
                    description: "Sets the options available to the multi select component. Can either be an array or a function that takes a query and returns a Promise for remote lookup.",
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
    public exampleStandardTemplate = exampleStandardTemplate;
    public exampleOptionsTemplate = exampleOptionsTemplate;
    public exampleSearchTemplate = exampleSearchTemplate;
    public exampleSearchLookupTemplate = exampleSearchLookupTemplate;
    public searchLookupCode = `
// The 2nd argument's type is that of the property specified by 'valueField'.
let selectLookup = (query:string, initial:number) => {
    if (initial != undefined) {
        // Return a promise that resolves with the specified item.
        return externalApi.findById(initial);
    }
    // Return a promise that resolves with a list of query results.
    return externalApi.query(query);
};

// For a multi select lookup, the lookup is slightly different:
let multiSelectLookup = (query:string, initials:number[]) => {
    if (initial != undefined) {
        // Return a promise that resolves with the specified items.
        return externalApi.findByIds(initials);
    }
    // Return a promise that resolves with a list of query results.
    return externalApi.query(query);
};
`;
    public exampleMultipleTemplate = exampleMultipleTemplate;
    public exampleMultipleSearchTemplate = exampleMultipleSearchTemplate;
    public exampleTemplateSearchTemplate = exampleTemplateSearchTemplate;
}

@Component({
    selector: 'select-example-standard',
    template: exampleStandardTemplate
})
export class SelectExampleStandard {
    public selectedGender;
}

@Component({
    selector: 'select-example-options',
    template: exampleOptionsTemplate
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
    template: exampleSearchTemplate
})
export class SelectExampleSearch {
    public options:Array<any> = [{ name: "Example" }, { name: "Test" }, { name: "What" }, { name: "No" }, { name: "Benefit" }, { name: "Oranges" }, { name: "Artemis" }, { name: "Another" }];
    public selectedOption;
}

@Component({
    selector: 'select-example-search-lookup',
    template: exampleSearchLookupTemplate
})
export class SelectExampleLookupSearch {
    private _options:Array<any> = [{ id: 1, name: "Example" }, { id: 2, name: "Test" }, { id: 3, name: "What" }, { id: 4, name: "No" }, { id: 5, name: "Benefit" }, { id: 6, name: "Oranges" }, { id: 7, name: "Artemis" }, { id: 8, name: "Another" }];
    public optionsLookup = (query:string, initial:number) => {
        if (initial != undefined) {
            return new Promise((resolve, reject) => {
                resolve(this._options.find((item) => item.id == initial));
            });
        }
        else {
            let regex:RegExp = new RegExp(query, 'i');
            return new Promise((resolve, reject) => {
                resolve(this._options.filter((item) => item.name.match(regex)));
            });
        }
    };
    public selectedOption = this._options[3]['id'];
}

@Component({
    selector: 'select-example-multiple',
    template: exampleMultipleTemplate
})
export class SelectExampleMultiple {
    public options:Array<any> = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis", "Another"];
    public selectedOptions = ["What", "Oranges"];
}

@Component({
    selector: 'select-example-multiple-search',
    template: exampleMultipleSearchTemplate
})
export class SelectExampleMultipleSearch {
    public options:Array<any> = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis", "Another"];
    public selectedOptions = ["What", "Oranges"];
}

@Component({
    selector: 'select-example-template-search',
    template: exampleTemplateSearchTemplate
})
export class SelectExampleTemplateSearch {
    public options:Array<any> = [{ name: "Example"}, { name: "Test"}, { name: "What"}, { name: "No"}, { name: "Benefit"}, { name: "Oranges"}, { name: "Artemis"}, { name: "Another"}];
    public selectedOption = this.options[5];
    public selectedOptions:any;
}

export const SelectPageComponents = [SelectPage, SelectExampleStandard, SelectExampleOptions, SelectExampleSearch, SelectExampleLookupSearch, SelectExampleMultiple, SelectExampleMultipleSearch, SelectExampleTemplateSearch];
