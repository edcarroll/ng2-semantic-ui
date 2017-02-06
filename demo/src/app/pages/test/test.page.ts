import {Component} from '@angular/core';

@Component({
    selector: 'demo-page-test',
    templateUrl: './test.page.html'
})
export class TestPage {
    constructor() {}

    public options = ["this", "is", "a", "test"];

    public optionsLookup = (query:string) => {
        return new Promise<string[]>(resolve => {
            setTimeout(() => 
                resolve(this.options
                    .filter(o => o
                        .match(query.toLowerCase()))), 200);
        });
    }
}
