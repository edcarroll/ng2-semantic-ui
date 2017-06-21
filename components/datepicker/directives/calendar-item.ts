
import { Directive, HostBinding, HostListener, Input, ElementRef, EventEmitter, Renderer2 } from "@angular/core";
import { Util } from "../../util/util";

export abstract class CalendarItem {
    public date:Date;
    public humanReadable:string;
    public isDisabled:boolean;
    public isActive:boolean;
    public isOutsideRange:boolean;

    public get isToday():boolean {
        return this.compareDates(new Date());
    }

    constructor(date:Date, humanReadable:string, isDisabled:boolean, isActive:boolean, isOutsideRange:boolean) {
        this.date = date;
        this.humanReadable = humanReadable;
        this.isDisabled = isDisabled;
        this.isActive = isActive;
        this.isOutsideRange = isOutsideRange;
    }

    public compareDates(date:Date):boolean {
        return Util.Date.datesEqual(date, this.date);
    }
}

export class CalendarYearItem extends CalendarItem {
    public compareDates(date:Date):boolean {
        return Util.Date.yearsEqual(date, this.date);
    }
}

export class CalendarMonthItem extends CalendarItem {
    public compareDates(date:Date):boolean {
        return Util.Date.monthsEqual(date, this.date);
    }
}

export class CalendarDateItem extends CalendarItem {}

export class CalendarTimeItem extends CalendarItem {
    public get isToday():boolean {
        return false;
    }
}

export class CalendarHoursItem extends CalendarTimeItem {
    public compareDates(date:Date):boolean {
        return Util.Date.hoursEqual(date, this.date);
    }
}

export class CalendarMinutesItem extends CalendarTimeItem {
    public compareDates(date:Date):boolean {
        return Util.Date.hoursEqual(date, this.date) &&
               Util.Math.roundDown(date.getMinutes(), 5) === Util.Math.roundDown(this.date.getMinutes(), 5);
    }
}

@Directive({
    selector: "[calendarItem]"
})
export class SuiCalendarItem {
    @Input("calendarItem")
    public item:CalendarItem;

    @HostBinding("class.disabled")
    public get isDisabled():boolean {
        return this.item.isDisabled;
    }

    @HostBinding("class.active")
    public get isActive():boolean {
        return this.item.isActive;
    }

    @HostBinding("class.today")
    public get isToday():boolean {
        return this.item.isToday;
    }

    private _hasFocus:boolean;

    public get hasFocus():boolean {
        return this._hasFocus;
    }

    public set hasFocus(value:boolean) {
        this._hasFocus = value;

        if (value) {
            this._renderer.addClass(this.element.nativeElement, "focus");
        } else {
            this._renderer.removeClass(this.element.nativeElement, "focus");
        }
    }

    public onFocussed:EventEmitter<boolean>;

    constructor(private _renderer:Renderer2, public element:ElementRef) {
        this.hasFocus = false;

        this.onFocussed = new EventEmitter<boolean>();
    }

    @HostListener("mousemove")
    public onMouseMove():void {
        this.hasFocus = true;
        this.onFocussed.emit(this.hasFocus);
    }

    @HostListener("mouseleave")
    public onMouseLeave():void {
        this.hasFocus = false;
        this.onFocussed.emit(this.hasFocus);
    }
}
