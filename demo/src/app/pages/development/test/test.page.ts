import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage {
    progress: number;
    constructor() {
        this.progress = 0;
        setInterval(() => {
            this.progress = this.progress == 100 ? 0 : this.progress + 1;
        }, 100);
    }
}
