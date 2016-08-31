import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.css']
})
export class SearchPage {
    public api = [
        {
            selector: "<sui-search>",
            properties: [
                {
                    name: "placeholder",
                    description: "Sets the placeholder string on the search box.",
                    defaultValue: "Search..."
                },
                {
                    name: "options",
                    description: "Sets the options available to the search component. Can either be an array or a function that takes a query and returns a Promise for remote lookup."
                },
                {
                    name: "optionsField",
                    description: "Sets the property name that the search element uses to display each option. Supports dot notation for nested properties."
                },
                {
                    name: "searchDelay",
                    description: "Sets the amount of time in milliseconds to wait after the last keypress before running a search.",
                    defaultValue: "200"
                },
                {
                    name: "icon",
                    description: "Sets whether or not the search displays an icon. Loading state is automatically applied when searching.",
                    defaultValue: "true"
                },
                {
                    name: "ngModel",
                    description: "Bind the search selected item to the value of the provided variable."
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the search's selected item is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "onItemSelected",
                    description: "Fires whenever the search's selected item is changed. The selected value is passed as <code>$event</code>."
                }
            ]
        }
    ]
}

@Component({
    selector: 'search-example-standard',
    template: `
<sui-search placeholder="Example Search..." [icon]="icon" [options]="options" [searchDelay]="0" (onItemSelected)="alertSelected($event)"></sui-search>
<div class="ui segment">
    <sui-checkbox [(ngModel)]="icon">Has icon?</sui-checkbox>
</div>
`
})
export class SearchExampleStandard {
    public icon:boolean = true;
    public static standardOptions:Array<string> = ["Apple", "Bird", "Car", "Dog", "Elephant", "Finch", "Gate",
        "Horrify", "Indigo", "Jelly", "Keep", "Lemur", "Manifest", "None", "Orange", "Peel", "Quest",
        "Resist", "Suspend", "Terrify", "Underneath", "Violet", "Water", "Xylophone", "Yellow", "Zebra"];
    //noinspection JSMethodCanBeStatic
    public get options():Array<string> {
        return SearchExampleStandard.standardOptions;
    }
    //noinspection JSMethodCanBeStatic
    public alertSelected(selectedItem:string):void {
        alert(`You chose '${selectedItem}'!`);
    }
}

@Component({
    selector: 'search-example-remote',
    template: `
<sui-search [options]="optionsSearch" optionsField="title" [(ngModel)]="selectedItem"></sui-search>
<div class="ui segment">
    <p>Currently selected: {{ selectedItem | json }}</p>
</div>
`
})
export class SearchExampleRemote extends SearchExampleStandard {
    //noinspection TypeScriptUnresolvedVariable
    public optionsSearch(query:string):Promise<Array<any>> {
        var options = SearchExampleStandard.standardOptions.map((o:string) => ({ title: o }));
        //noinspection TypeScriptUnresolvedFunction
        return new Promise((resolve, reject) => {
            var results = options.filter((o:any) => {
                return o.title.slice(0, query.length).toLowerCase() == query.toLowerCase();
            });
            setTimeout(() => {
                resolve(results);
            }, 300);
        });
    }
}

export const SEARCH_EXAMPLES:Array<any> = [SearchExampleStandard, SearchExampleRemote];
