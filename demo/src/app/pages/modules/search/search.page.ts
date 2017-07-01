import { Component } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";
import { SuiModalService } from "../../../../../../src/public";
import { AlertModal } from "../../../modals/alert.modal";

const exampleStandardTemplate = `
<sui-search placeholder="Example Search..."
            [hasIcon]="hasIcon"
            [options]="options"
            [searchDelay]="0"
            (itemSelected)="alertSelected($event)"></sui-search>

<div class="ui segment">
    <sui-checkbox [(ngModel)]="hasIcon">Has icon?</sui-checkbox>
</div>
`;

const exampleRemoteTemplate = `
<sui-search [optionsLookup]="optionsSearch" optionsField="title" (itemSelected)="lastSelected = $event"></sui-search>
<div class="ui segment">
    <p>Last selected: {{ lastSelected | json }}</p>
</div>
`;

@Component({
    selector: "demo-page-search",
    templateUrl: "./search.page.html"
})
export class SearchPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-search>",
            properties: [
                {
                    name: "placeholder",
                    type: "string",
                    description: "Sets the placeholder string on the search box.",
                    defaultValue: "Search..."
                },
                {
                    name: "hasIcon",
                    type: "boolean",
                    description: "Sets whether or not the search displays an icon.",
                    defaultValue: "true"
                },
                {
                    name: "options",
                    type: "T[]",
                    description: "Sets the options available to the search component. " +
                                 "Cannot be used in conjunction with <code>optionsLookup</code>."
                },
                {
                    name: "optionsLookup",
                    type: "(query:string) => T[] | Promise<T[]>",
                    description: "A function to transform the provided query string into the array of results. " +
                                 "Can either return a <code>Promise</code> (for async lookups) or an <code>Array</code>. " +
                                 "This must be defined as an arrow function in your class."
                },
                {
                    name: "optionsField",
                    type: "string",
                    description: "Sets the property name that the search element uses to lookup and " +
                                 "display each option. Supports dot notation for nested properties."
                },
                {
                    name: "resultFormatter",
                    type: "(result:T, query:string) => string",
                    description: "A function to format a given result and query into a string to be displayed. " +
                                 "HTML markup is supported."
                },
                {
                    name: "resultTemplate",
                    type: "TemplateRef",
                    description: "Sets the template to use when displaying results."
                },
                {
                    name: "searchDelay",
                    type: "number",
                    description: "Sets the amount of time in milliseconds to wait after the last keypress before running a search.",
                    defaultValue: "200"
                },
                {
                    name: "maxResults",
                    type: "number",
                    description: "Sets the maximum number of results the search displays at once.",
                    defaultValue: "7"
                },
                {
                    name: "retainSelectedResult",
                    type: "boolean",
                    description: "Sets whether the search should retain a result in the input box after it is selected.",
                    defaultValue: "true"
                },
                {
                    name: "transition",
                    type: "string",
                    description: "Sets the transition used when displaying the search results.",
                    defaultValue: "scale"
                },
                {
                    name: "transitionDuration",
                    type: "number",
                    description: "Sets the duration for the search results transition.",
                    defaultValue: "200"
                },
                {
                    name: "localeOverrides",
                    type: "Partial<ISearchLocaleValues>",
                    description: "Overrides the values from the localization service."
                }
            ],
            events: [
                {
                    name: "resultSelected",
                    type: "T",
                    description: "Fires whenever the search's selected result is changed. " +
                                 "The selected result is passed as <code>$event</code>."
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleRemoteTemplate:string = exampleRemoteTemplate;
}

interface IOption {
    title:string;
}

@Component({
    selector: "example-search-standard",
    template: exampleStandardTemplate
})
export class SearchExampleStandard {
    public static standardOptions:string[] = [
        "Apple", "Bird", "Car", "Dog",
        "Elephant", "Finch", "Gate", "Horrify",
        "Indigo", "Jelly", "Keep", "Lemur",
        "Manifest", "None", "Orange", "Peel",
        "Quest", "Resist", "Suspend", "Terrify",
        "Underneath", "Violet", "Water", "Xylophone",
        "Yellow", "Zebra"];

    public hasIcon:boolean = true;

    public get options():string[] {
        return SearchExampleStandard.standardOptions;
    }

    constructor(public modalService:SuiModalService) {}

    public alertSelected(selectedItem:string):void {
        this.modalService.open(new AlertModal(`You chose '${selectedItem}'!`));
    }
}

@Component({
    selector: "example-search-remote",
    template: exampleRemoteTemplate
})
export class SearchExampleRemote extends SearchExampleStandard {
    public lastSelected:IOption;

    public async optionsSearch(query:string):Promise<IOption[]> {
        const options = SearchExampleStandard.standardOptions.map((o:string) => ({ title: o }));

        return new Promise<IOption[]>(resolve => {
            const results = options
                .filter(o => o.title.slice(0, query.length).toLowerCase() === query.toLowerCase());
            setTimeout(() => resolve(results), 300);
        });
    }
}

export const SearchPageComponents = [SearchPage, SearchExampleStandard, SearchExampleRemote];
