import {Component} from '@angular/core';

@Component({
    selector: 'demo-page-test',
    templateUrl: './test.page.html'
})
export class TestPage {
    constructor() {}

    public options = ["this", "is", "a", "test"];
    public more = [{ test: "this" }, { test: "is" }, { test: "yet" }, { test: "another" }, { test: "test" }]

    public selected = this.more[0];
}
