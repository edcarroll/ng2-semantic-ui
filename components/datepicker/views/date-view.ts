import { Component, HostBinding, EventEmitter, Output, Input } from "@angular/core";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarDateItem } from "../directives/calendar-item";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { DateComparer } from "../classes/date-comparer";

@Component({
    selector: "sui-calendar-date-view",
    template: `
<table class="ui celled center aligned unstackable table seven column day">
<thead>
    <tr>
        <th colspan="7">
            <span class="link" (click)="zoomOut()">{{ month }} {{ year }}</span>
            <span class="prev link" (click)="ranges.movePrevious()">
                <i class="chevron left icon"></i>
            </span>
            <span class="next link" (click)="ranges.moveNext()">
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
        const days = this.localizationService.getValues().datepicker.weekdaysShort;
        return days.map((d, i) => days[(i + this.firstDayOfWeek) % days.length]);
    }

    public get year():number {
        return this.renderedDate.getFullYear();
    }

    public get month():string {
        return this.localizationService
            .getValues().datepicker.months[this.renderedDate.getMonth()];
    }

    @Input()
    public firstDayOfWeek:number;

    constructor(public localizationService:SuiLocalizationService) {
        super(CalendarViewType.Date, 6, 7, DatePrecision.Month);

        this.firstDayOfWeek = this.localizationService
            .getValues().datepicker.firstDayOfWeek;
    }

    public calculateRangeStart(start:Date):Date {
        const monthStart = Util.Date.startOf(DatePrecision.Month, Util.Date.clone(start));
        monthStart.setDate((1 - monthStart.getDay() + this.firstDayOfWeek - 7) % 7);
        return monthStart;
    }

    public calculateItem(date:Date, baseDate:Date):CalendarDateItem {
        const comparer = new DateComparer(date);
        return new CalendarDateItem(
            date,
            date.getDate().toString(),
            !comparer.isBetween(this.service.minDate, this.service.maxDate),
            comparer.isEqualTo(this.selectedDate),
            date.getMonth() !== baseDate.getMonth());
    }
}
