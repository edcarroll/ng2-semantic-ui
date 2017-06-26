import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage {
    public date:Date = new Date(2017, 5, 14, new Date().getHours(), new Date().getMinutes());

    public minDate:Date = new Date(2017, 4, 20);
    public maxDate:Date = new Date(2017, 8, 5);

    constructor() {
        // console.log(this.minDate);
        // console.log(this.maxDate);
    }

    public log(item:any):void {
        console.log(item);
    }
}
