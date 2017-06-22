import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage {
    public date:Date = new Date(2017, 5, 14);

    public maxDate:Date = new Date(2017, 8, 5);

    constructor() {}

    public log(item:any):void {
        console.log(item);
    }
}
