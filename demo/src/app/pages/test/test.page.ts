import {Component} from '@angular/core';

@Component({
    selector: 'demo-page-test',
    templateUrl: './test.page.html'
})
export class TestPage {
    public test = [];

    constructor() {
        setTimeout(() => this.test = [1,2], 1000);
        setTimeout(() => this.test = [], 3000);
    }
}
