
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarMonthItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { MonthComparer } from "../classes/date-comparer";

@Component({
    selector: "sui-calendar-month-view",
    template: `
<table class="ui celled center aligned unstackable table three column month">
<thead>
    <tr>
        <th colspan="3">
            <span class="link" (click)="zoomOut()">{{ year }}</span>
            <span class="prev link" (click)="prevDateRange()">
                <i class="chevron left icon"></i>
            </span>
            <span class="next link" (click)="nextDateRange()">
                <i class="chevron right icon"></i>
            </span>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of groupedItems">
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
export class SuiCalendarMonthView extends CalendarView {
    public get year():number {
        return this.renderedDate.getFullYear();
    }

    constructor(public localizationService:SuiLocalizationService) {
        super(CalendarViewType.Month, 3, DatePrecision.Year);
    }

    public calculateItems():void {
        const yearStart = Util.Date.startOf(DatePrecision.Year, Util.Date.clone(this.renderedDate));
        this.calculatedItems = [];

        Util.Array.range(12).forEach(m => {
            const date = Util.Date.clone(yearStart);
            date.setMonth(m);
            if (date.getMonth() !== m) {
                date.setDate(0);
            }
            const comparer = new MonthComparer(date);

            this.calculatedItems.push(
                new CalendarMonthItem(
                    date,
                    this.localizationService.getValues().datepicker.monthsShort[m],
                    !comparer.isBetween(this.service.minDate, this.service.maxDate),
                    comparer.isEqualTo(this.selectedDate),
                    false));
        });
    }
}
