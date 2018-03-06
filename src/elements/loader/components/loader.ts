import { Component, Input, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: "sui-loader",
    template: `
    <div #loaderDiv class="ui {{loaderClass}} dimmer" [ngClass]="{'active': active}">
      <div class="ui {{loaderSize}} text loader">{{ loaderText }}</div>
    </div>`
})

export class SuiLoader {
    @ViewChild("loaderDiv")
    public loaderDiv:ElementRef;

    private _active:boolean;

    @Input()
    public set active(val:boolean) {
        this._active = val;
    }

    public get active():boolean {
        return this._active;
    }

    @Input()
    public loaderText:string;

    @Input()
    public loaderSize:string;

    @Input()
    public loaderClass:string;

    constructor() {
    }
}
