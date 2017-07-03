import { HostBinding, Directive, Input } from "@angular/core";

@Directive({
    selector: "[suiTabContent]"
})
export class SuiTabContent {
    @HostBinding("class.tab")
    private _contentClasses:boolean;

    @Input("suiTabContent")
    public id:string;

    @HostBinding("class.active")
    public isActive:boolean;

    constructor() {
        this.isActive = false;

        this._contentClasses = true;
    }
}
