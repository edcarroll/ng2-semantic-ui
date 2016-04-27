import {Component} from 'angular2/core';

import {CHECKBOX_DIRECTIVES} from '../../../../components/checkbox';
import {SEARCH_DIRECTIVES} from '../../../../components/search';
// import {CHECKBOX_DIRECTIVES, SEARCH_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'search-example-standard',
    directives: [CHECKBOX_DIRECTIVES, SEARCH_DIRECTIVES],
    templateUrl: "app/components/search/standard.example.html"
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
    directives: [SEARCH_DIRECTIVES],
    templateUrl: "app/components/search/remote.example.html"
})
export class SearchExampleRemote extends SearchExampleStandard {
    public optionsSearch(query:string):Promise<Array<any>> {
        var options = SearchExampleStandard.standardOptions.map((o:string) => ({ title: o }));
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