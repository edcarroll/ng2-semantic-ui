import { Component, AfterViewInit, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage implements OnInit {
    private _interval: any;
    public ngOnInit(): void {
        this._interval = setInterval(() => {
            this._progress = this._progress + 1;
            if (this._progress === 100) {
                clearInterval(this._interval);
            }
        },
            100);
    }
    private _progress: number;
    constructor() {
        this._progress = 0;
    }
}
