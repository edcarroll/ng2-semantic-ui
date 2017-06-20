
import { Directive, HostBinding, HostListener, Input, ElementRef } from "@angular/core";
import { Util } from "../../util/util";

export class CalendarDateItem {
    public date:Date;
    public humanReadable:string;
    public isDisabled:boolean;
    public isActive:boolean;

    public get isToday():boolean {
        return Util.Date.datesEqual(new Date(), this.date);
    }

    constructor(date:Date, humanReadable:string, isDisabled:boolean, isActive:boolean) {
        this.date = date;
        this.humanReadable = humanReadable;
        this.isDisabled = isDisabled;
        this.isActive = isActive;
    }
}

export class CalendarYearItem extends CalendarDateItem {
    public get isToday():boolean {
        return Util.Date.yearsEqual(new Date(), this.date);
    }
}

export class CalendarMonthItem extends CalendarDateItem {
    public get isToday():boolean {
        return Util.Date.monthsEqual(new Date(), this.date);
    }
}

export class CalendarTimeItem extends CalendarDateItem {
    public get isToday():boolean {
        return false;
    }
}

@Directive({
    selector: "[calendarItem]"
})
export class SuiCalendarItem {
    @Input("calendarItem")
    public item:CalendarDateItem;

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
}
