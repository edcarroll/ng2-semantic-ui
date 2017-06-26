import { Component, HostBinding, EventEmitter, Output, Input } from "@angular/core";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarItem } from "../directives/calendar-item";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { DateComparer } from "../classes/date-comparer";
import { CalendarRangeService } from "../services/calendar-range.service";

export class CalendarRangeDateService extends CalendarRangeService {
    public calcStart(start:Date):Date {
        const monthStart = Util.Date.startOf(DatePrecision.Month, Util.Date.clone(start));
        monthStart.setDate((1 - monthStart.getDay() + this.service.firstDayOfWeek - 7) % 7);
        return monthStart;
    }

    public calcItem(date:Date, baseDate:Date, comparer:DateComparer):CalendarItem {
        return new CalendarItem(
            date,
            date.getDate().toString(),
            !comparer.isBetween(date, this.service.minDate, this.service.maxDate),
            comparer.isEqualTo(date, this.service.selectedDate),
            date.getMonth() !== baseDate.getMonth(),
            comparer.isEqualTo(date, new Date()));
    }
}

@Component({
    selector: "sui-calendar-date-view",
    template: `
<table class="ui celled center aligned unstackable table seven column day">
<thead>
    <tr>
        <th colspan="7">
            <span class="link" (click)="zoomOut()">{{ month }} {{ year }}</span>
            <span class="prev link" [class.disabled]="!ranges.canMovePrevious" (click)="ranges.movePrevious()">
                <i class="chevron left icon"></i>
            </span>
            <span class="next link" [class.disabled]="!ranges.canMoveNext" (click)="ranges.moveNext()">
                <i class="chevron right icon"></i>
            </span>
        </th>
    </tr>
    <tr>
        <th *ngFor="let day of days">{{ day }}</th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of ranges.current.groupedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
})
export class SuiCalendarDateView extends CalendarView {
    public get days():string[] {
        const days = this.service.localizationValues.datepicker.weekdaysShort;
        return days.map((d, i) => days[(i + this.service.firstDayOfWeek) % days.length]);
    }

    public get year():number {
        return this.currentDate.getFullYear();
    }

    public get month():string {
        return this.service.localizationValues.datepicker.months[this.currentDate.getMonth()];
    }

    constructor() {
        super(CalendarViewType.Date, new CalendarRangeDateService(DatePrecision.Month, 6, 7));
    }
}
