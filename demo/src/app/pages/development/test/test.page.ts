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
        let interval = setInterval(() => {
            this.progress = this.progress + 1;
            if (this.progress === 100) {
                clearInterval(interval);
            }
        }, 100);
    }
}
