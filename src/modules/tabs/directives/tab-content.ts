import { HostBinding, Directive, Input } from "@angular/core";

@Directive({
    selector: "[suiTabContent]"
})
export class SuiTabContent {
    @HostBinding("class.tab")
    public hasClasses:boolean;

    @Input("suiTabContent")
    public id:string;

    @HostBinding("class.active")
    public isActive:boolean;

    constructor() {
        this.isActive = false;

        this.hasClasses = true;
    }
}
