import {Component} from '@angular/core';
import {ApiDefinition} from '../../components/api/api.component';

const exampleStandardTemplate = `
<sui-search placeholder="Example Search..." [hasIcon]="hasIcon" [options]="options" [searchDelay]="0" (onItemSelected)="alertSelected($event)"></sui-search>
<div class="ui segment">
    <sui-checkbox [(ngModel)]="hasIcon">Has icon?</sui-checkbox>
</div>
`;

const exampleRemoteTemplate = `
<sui-search [options]="optionsSearch" optionsField="title" [(ngModel)]="selectedItem"></sui-search>
<div class="ui segment">
    <p>Currently selected: {{ selectedItem | json }}</p>
</div>
`;

@Component({
    selector: 'demo-page-search',
    templateUrl: './search.page.html'
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
                    name: "options",
                    type: "T[] | LookupFn<T>",
                    description: "Sets the options available to the search component. Can either be an array, or a function that takes a query and returns either a <code>Promise</code> (for remote lookups) or an array (for custom local searches).",
                    required: true
                },
                {
                    name: "optionsField",
                    type: "string",
                    description: "Sets the property name that the search element uses to lookup and display each option. Supports dot notation for nested properties."
                },
                {
                    name: "searchDelay",
                    type: "number",
                    description: "Sets the amount of time in milliseconds to wait after the last keypress before running a search.",
                    defaultValue: "200"
                },
                {
                    name: "hasIcon",
                    type: "boolean",
                    description: "Sets whether or not the search displays an icon. Loading state is automatically applied when searching.",
                    defaultValue: "true"
                },
                {
                    name: "ngModel",
                    type: "T",
                    description: "Bind the search selected item to the value of the provided variable."
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    type: "T",
                    description: "Fires whenever the search's selected item is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "itemSelected",
                    type: "T",
                    description: "Fires whenever the search's selected item is changed. The selected value is passed as <code>$event</code>."
                }
            ]
        }
    ];
    public exampleStandardTemplate = exampleStandardTemplate;
    public exampleRemoteTemplate = exampleRemoteTemplate;
}

@Component({
    selector: 'search-example-standard',
    template: exampleStandardTemplate
})
export class SearchExampleStandard {
    public hasIcon:boolean = true;
    public static standardOptions:Array<string> = ["Apple", "Bird", "Car", "Dog", "Elephant", "Finch", "Gate",
        "Horrify", "Indigo", "Jelly", "Keep", "Lemur", "Manifest", "None", "Orange", "Peel", "Quest",
        "Resist", "Suspend", "Terrify", "Underneath", "Violet", "Water", "Xylophone", "Yellow", "Zebra"];

    public get options():Array<string> {
        return SearchExampleStandard.standardOptions;
    }

    public alertSelected(selectedItem:string):void {
        alert(`You chose '${selectedItem}'!`);
    }
}

@Component({
    selector: 'search-example-remote',
    template: exampleRemoteTemplate
})
export class SearchExampleRemote extends SearchExampleStandard {
    public optionsSearch(query:string):Promise<Array<any>> {
        let options = SearchExampleStandard.standardOptions.map((o:string) => ({ title: o }));

        return new Promise((resolve, reject) => {
            let results = options.filter((o:any) => {
                return o.title.slice(0, query.length).toLowerCase() == query.toLowerCase();
            });
            setTimeout(() => {
                resolve(results);
            }, 300);
        });
    }

    public selectedItem = { title: "Apple" };
}

export const SearchPageComponents = [SearchPage, SearchExampleStandard, SearchExampleRemote];
