import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage {
    public date:Date = new Date();

    public minDate:Date;
    public maxDate:Date;

    constructor() {
        const today = new Date();

        this.minDate = new Date(today.getFullYear(), today.getMonth() - 2);
        this.maxDate = new Date(today.getFullYear(), today.getMonth() + 2);

        console.log(this.minDate);
        console.log(this.maxDate);
    }

    public log(item:any):void {
        console.log(item);
    }
}
