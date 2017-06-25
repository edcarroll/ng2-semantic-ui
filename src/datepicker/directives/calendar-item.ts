
import { Directive, HostBinding, HostListener, Input, EventEmitter } from "@angular/core";
import { Util } from "../../util/util";
import { Comparer, YearComparer, MonthComparer, HourComparer, MinuteComparer, DateComparer } from "../classes/date-comparer";

export abstract class CalendarItem {
    protected get _comparer():Comparer {
        return new DateComparer(this.date);
    }

    public date:Date;
    public humanReadable:string;
    public isDisabled:boolean;
    public isActive:boolean;
    public isOutsideRange:boolean;

    public get isToday():boolean {
        return this.isEqualTo(new Date());
    }

    public get isVisuallyDisabled():boolean {
        return this.isDisabled;
    }

    constructor(date:Date, humanReadable:string, isDisabled:boolean, isActive:boolean, isOutsideRange:boolean) {
        this.date = date;
        this.humanReadable = humanReadable;
        this.isDisabled = isDisabled;
        this.isActive = isActive;
        this.isOutsideRange = isOutsideRange;
    }

    public isEqualTo(date:Date | undefined):boolean {
        return this._comparer.isEqualTo(date);
    }

    public isLessThan(date:Date | undefined):boolean {
        return this._comparer.isLessThan(date);
    }

    public isGreaterThan(date:Date | undefined):boolean {
        return this._comparer.isGreaterThan(date);
    }
}

export class CalendarYearItem extends CalendarItem {
    protected get _comparer():YearComparer {
        return new YearComparer(this.date);
    }
}

export class CalendarMonthItem extends CalendarItem {
    protected get _comparer():MonthComparer {
        return new MonthComparer(this.date);
    }
}

export class CalendarDateItem extends CalendarItem {
    public get isVisuallyDisabled():boolean {
        return this.isDisabled || this.isOutsideRange;
    }
}

export class CalendarTimeItem extends CalendarItem {
    public get isToday():boolean {
        return false;
    }
}

export class CalendarHourItem extends CalendarTimeItem {
    protected get _comparer():HourComparer {
        return new HourComparer(this.date);
    }
}

export class CalendarMinuteItem extends CalendarTimeItem {
    protected get _comparer():MinuteComparer {
        return new MinuteComparer(this.date);
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
        return this.item.isVisuallyDisabled;
    }

    @HostBinding("class.active")
    public get isActive():boolean {
        return this.item.isActive;
    }

    @HostBinding("class.today")
    public get isToday():boolean {
        return this.item.isToday;
    }

    @HostBinding("class.focus")
    public hasFocus:boolean;

    public onFocussed:EventEmitter<boolean>;

    constructor() {
        this.hasFocus = false;

        this.onFocussed = new EventEmitter<boolean>();
    }

    @HostListener("mousemove")
    public onMouseMove():void {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.onFocussed.emit(this.hasFocus);
        }
    }

    @HostListener("mouseleave")
    public onMouseLeave():void {
        this.hasFocus = false;
        this.onFocussed.emit(this.hasFocus);
    }
}
