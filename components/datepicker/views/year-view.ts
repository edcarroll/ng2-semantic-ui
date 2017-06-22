
import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarYearItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { YearComparer } from "../classes/date-comparer";

@Component({
    selector: "sui-calendar-year-view",
    template: `
<table class="ui celled center aligned unstackable table three column year">
<thead>
    <tr>
        <th colspan="3">
            <span class="link" (click)="zoomOut()">{{ decadeStart }} - {{ decadeStart + 10 }}</span>
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
export class SuiCalendarYearView extends CalendarView {
    public get decadeStart():number {
        return Math.floor(this.renderedDate.getFullYear() / 10) * 10 + 1;
    }

    constructor() {
        super(CalendarViewType.Year, 3, DatePrecision.Decade);
    }

    public calculateItems():void {
        const decadeStart = Util.Date.clone(this.renderedDate);
        decadeStart.setFullYear(this.decadeStart);
        this.calculatedItems = [];

        Util.Array.range(12, this.decadeStart).forEach(y => {
            const date = Util.Date.clone(decadeStart);
            date.setFullYear(y);
            const comparer = new YearComparer(date);

            this.calculatedItems.push(
                new CalendarYearItem(
                    date,
                    Util.String.padLeft(date.getFullYear().toString(), 4, "0"),
                    !comparer.isBetween(this.service.minDate, this.service.maxDate),
                    comparer.isEqualTo(this.selectedDate),
                    date.getFullYear() >= this.decadeStart + 10));
        });
    }
}
