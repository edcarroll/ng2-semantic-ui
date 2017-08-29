import { Component, AfterViewInit, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage implements OnInit {
    private _interval: any;
    public progress: number;

    constructor() {
        this.progress = 0;
    }

    public ngOnInit():void {
        this._interval = setInterval(
            () => {
                this.progress = this.progress + 1;
                if (this.progress === 100) {
                    clearInterval(this._interval);
                }
            },
            100);
    }
}
