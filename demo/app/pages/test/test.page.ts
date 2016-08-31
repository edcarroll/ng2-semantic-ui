import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-test',
  templateUrl: 'test.page.html',
  styleUrls: ['test.page.css']
})
export class TestPage {
    public options:Array<any> = [{ test: "Example"}, { test: "Test"}, { test: "What"}, { test: "No"}, { test: "Benefit"}, { test: "Oranges"}, { test: "Artemis"}, { test: "Teeeest"}];
    public placeholder:string = "Select Weirdness";
    public testOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    public selected = 6;
    public selectedItems = [3, 6];
    public maxOptions = 3;
    //noinspection TypeScriptUnresolvedVariable
    public optionsSearch(query:string):Promise<Array<any>> {
        var options = [{ test: "Example"}, { test: "Test"}, { test: "What"}, { test: "No"}, { test: "Benefit"}, { test: "Oranges"}, { test: "Artemis"}, { test: "Teeeest"}];
        //noinspection TypeScriptUnresolvedFunction
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
