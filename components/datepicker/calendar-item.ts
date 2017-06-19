
import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: "td.calendar.item"
})
export class SuiCalendarItem {
    @HostBinding("class.link")
    private _classes:boolean;

    @HostBinding("class.active")
    public isFocussed:boolean;

    constructor() {
        this._classes = true;
        this.isFocussed = false;
    }

    @HostListener("mouseenter", ["$event"])
    public onMouseEnter(e:MouseEvent):void {
        this.isFocussed = true;
    }

    @HostListener("mouseleave", ["$event"])
    public onMouseLeave(e:MouseEvent):void {
        this.isFocussed = false;
    }
}
