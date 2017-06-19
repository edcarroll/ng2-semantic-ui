import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage {
    public date:Date = new Date();

    public log(item:any):void {
        console.log(item);
    }
}
