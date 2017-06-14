import { Component } from "@angular/core";
import { ApiDefinition } from "../../components/api/api.component";

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
<sui-select [(ngModel)]="selectedOption"
            [options]="optionsLookup"
            labelField="name"
            valueField="id"
            [isSearchable]="true"
            #searchSelect>
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
<sui-multi-select class="fluid"
                  [(ngModel)]="selectedOptions"
                  [options]="options"
                  [isSearchable]="true"
                  [maxSelected]="5"
                  #searchSelect>
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
        <sui-select [(ngModel)]="selectedOption"
                    [options]="options"
                    labelField="name"
                    [optionTemplate]="optionTemplate"
                    [isSearchable]="true"
                    #select>
            <div class="header">
                <i class="users icon"></i>
                Custom Menu Markup!
                </div>
                <div class="divider"></div>
            <sui-select-option *ngFor="let option of select.availableOptions" [value]="option"></sui-select-option>
        </sui-select>
    </div>
    <div class="field">
        <sui-multi-select class="fluid"
                          [(ngModel)]="selectedOptions"
                          [options]="options"
                          valueField="name"
                          [optionTemplate]="optionTemplate"
                          #multiSelect>
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
    selector: "demo-page-select",
    templateUrl: "./select.page.html"
})
export class SelectPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-select>",
            properties: [
                {
                    name: "placeholder",
                    type: "string",
                    description: "Sets the placeholder string on the search box.",
                    defaultValue: "Select one"
                },
                {
                    name: "options",
                    type: "T[] | LookupFn<T>",
                    description: "Sets the options available to the select component. Can either " +
                                 "be an array, or a function that takes a query and returns either a " +
                                 "<code>Promise</code> (for remote lookups) or an array (for custom local searches)."
                },
                {
                    name: "labelField",
                    type: "string",
                    description: "Sets the property name that is used as a label for each option. " +
                                 "Supports dot notation for nested properties."
                },
                {
                    name: "valueField",
                    type: "string",
                    description: "Sets the property name that is used to bind to ngModel. Leaving this " +
                                 "blank uses the entire object. Supports dot notation for nested properties."
                },
                {
                    name: "isDisabled",
                    type: "boolean",
                    description: "Sets whether or not the select is disabled",
                    defaultValue: "false"
                },
                {
                    name: "isSearchable",
                    type: "boolean",
                    description: "Sets whether the select is searchable. If set to <code>true</code> the " +
                                 "<code>options</code> property must be used.",
                    defaultValue: "false"
                },
                {
                    name: "optionTemplate",
                    type: "TemplateRef",
                    description: "Sets the template to use when displaying options."
                },
                {
                    name: "noResultsMessage",
                    type: "string",
                    description: "Sets the message displayed when there are no available options",
                    defaultValue: "No results"
                },
                {
                    name: "ngModel",
                    type: "T",
                    description: "Bind the selected item to the value of the provided variable."
                },
                {
                    name: "transition",
                    type: "string",
                    description: "Sets the transition used when displaying the available options.",
                    defaultValue: "slide down"
                },
                {
                    name: "transitionDuration",
                    type: "number",
                    description: "Sets the duration for the available options transition.",
                    defaultValue: "200"
                }
            ],
            events: [
                {
                    name: "selectedOptionChange",
                    type: "T",
                    description: "Fires whenever the selected item is changed. The selected item is passed as <code>$event</code>."
                },
                {
                    name: "ngModelChange",
                    type: "T",
                    description: "Fires whenever the selected item is changed. <code>[(ngModel)]</code> syntax is supported."
                }
            ]
        },
        {
            selector: "<sui-multi-select>",
            properties: [
                {
                    name: "placeholder",
                    type: "string",
                    description: "Sets the placeholder string on the search box.",
                    defaultValue: "Select..."
                },
                {
                    name: "options",
                    type: "T[] | LookupFn<T>",
                    description: "Sets the options available to the select component. Can either " +
                                 "be an array, or a function that takes a query and returns either a " +
                                 "<code>Promise</code> (for remote lookups) or an array (for custom local searches).",
                    required: true
                },
                {
                    name: "labelField",
                    type: "string",
                    description: "Sets the property name that is used as a label for each option. " +
                                 "Supports dot notation for nested properties."
                },
                {
                    name: "valueField",
                    type: "string",
                    description: "Sets the property name that is used to bind to ngModel. Leaving this " +
                                 "blank uses the entire object. Supports dot notation for nested properties."
                },
                {
                    name: "isDisabled",
                    type: "boolean",
                    description: "Sets whether or not the multi select is disabled",
                    defaultValue: "false"
                },
                {
                    name: "isSearchable",
                    type: "boolean",
                    description: "Sets whether the multi select is searchable. If set to <code>true</code> the " +
                                 "<code>options</code> property must be used.",
                    defaultValue: "false"
                },
                {
                    name: "maxSelected",
                    type: "number",
                    description: "Sets the maximum number of values that can be selected at any one time."
                },
                {
                    name: "optionTemplate",
                    type: "TemplateRef",
                    description: "Sets the template to use when displaying options."
                },
                {
                    name: "noResultsMessage",
                    type: "string",
                    description: "Sets the message displayed when there are no available options",
                    defaultValue: "No results"
                },
                {
                    name: "ngModel",
                    type: "T[]",
                    description: "Bind the selected items to the value of the provided variable."
                },
                {
                    name: "transition",
                    type: "string",
                    description: "Sets the transition used when displaying the available options.",
                    defaultValue: "slide down"
                },
                {
                    name: "transitionDuration",
                    type: "number",
                    description: "Sets the duration for the available options transition.",
                    defaultValue: "200"
                }
            ],
            events: [
                {
                    name: "selectedOptionsChange",
                    type: "T[]",
                    description: "Fires whenever the selected items are changed. The selected items are passed as <code>$event</code>."
                },
                {
                    name: "ngModelChange",
                    type: "T[]",
                    description: "Fires whenever the selected items are changed. <code>[(ngModel)]</code> syntax is supported."
                }
            ]
        },
        {
            selector: "<sui-select-option>",
            properties: [
                {
                    name: "value",
                    type: "T",
                    description: "Sets the value of the option.",
                    required: true
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleOptionsTemplate:string = exampleOptionsTemplate;
    public exampleSearchTemplate:string = exampleSearchTemplate;
    public exampleSearchLookupTemplate:string = exampleSearchLookupTemplate;
    public searchLookupCode:string = `
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
    public exampleMultipleTemplate:string = exampleMultipleTemplate;
    public exampleMultipleSearchTemplate:string = exampleMultipleSearchTemplate;
    public exampleTemplateSearchTemplate:string = exampleTemplateSearchTemplate;
}

interface IOption {
    id?:number;
    name:string;
}

const options = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis", "Another"];
const namedOptions:IOption[] = options.map(name => ({ name }));
const idOptions:IOption[] = namedOptions.map(({ name }, id) => ({ name, id }));

@Component({
    selector: "example-select-standard",
    template: exampleStandardTemplate
})
export class SelectExampleStandard {
    public selectedGender:string;
}

@Component({
    selector: "example-select-options",
    template: exampleOptionsTemplate
})
export class SelectExampleOptions {
    public options:IOption[] = namedOptions;
    public selectedOption:IOption = this.options[0];

    public addOption():void {
        this.options.push({ name: "Dynamic Option" });
    }
}

@Component({
    selector: "example-select-search",
    template: exampleSearchTemplate
})
export class SelectExampleSearch {
    public options:IOption[] = namedOptions;

    public selectedOption:IOption;
}

@Component({
    selector: "example-select-search-lookup",
    template: exampleSearchLookupTemplate
})
export class SelectExampleLookupSearch {
    private _options:IOption[] = idOptions;
    public selectedOption:number = this._options[3]["id"];

    public optionsLookup = async (query:string, initial:number) => {
        if (initial !== undefined) {
            return new Promise<IOption>(resolve =>
                resolve(this._options.find(item => item.id === initial)));
        }

        const regex:RegExp = new RegExp(query, "i");
        return new Promise<IOption[]>(resolve =>
            resolve(this._options.filter(item => item.name.match(regex))));
    }

}

@Component({
    selector: "example-select-multiple",
    template: exampleMultipleTemplate
})
export class SelectExampleMultiple {
    public options:string[] = options;
    public selectedOptions:string[] = ["What", "Oranges"];
}

@Component({
    selector: "example-select-multiple-search",
    template: exampleMultipleSearchTemplate
})
export class SelectExampleMultipleSearch {
    public options:string[] = options;
    public selectedOptions:string[] = ["What", "Oranges"];
}

@Component({
    selector: "example-select-template-search",
    template: exampleTemplateSearchTemplate
})
export class SelectExampleTemplateSearch {
    public options:IOption[] = namedOptions;
    public selectedOption:IOption = this.options[5];
    public selectedOptions:IOption[];
}

export const SelectPageComponents = [
    SelectPage,

    SelectExampleStandard,
    SelectExampleOptions,
    SelectExampleSearch,
    SelectExampleLookupSearch,
    SelectExampleMultiple,
    SelectExampleMultipleSearch,
    SelectExampleTemplateSearch
];
