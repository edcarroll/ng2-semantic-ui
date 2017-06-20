
import { Directive, HostBinding, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: "[calendarFocusable]"
})
export class SuiCalendarFocusable {
    @HostBinding("attr.tabindex")
    public tabIndex:number;

    constructor(private _element:ElementRef) {
        this.tabIndex = 0;
    }

    @HostListener("mousemove")
    public onMouseMove():void {
        this._element.nativeElement.focus();
    }

    @HostListener("mouseleave")
    public onMouseLeave():void {
        this._element.nativeElement.blur();
    }
}
