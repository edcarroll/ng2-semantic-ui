import { Component } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarHoursItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { HourComparer } from "../classes/date-comparer";

@Component({
    selector: "sui-calendar-hour-view",
    template: `
<table class="ui celled center aligned unstackable table four column hour">
<thead *ngIf="service.mode != 1">
    <tr>
        <th colspan="4">
            <span class="link" (click)="zoomOut()">{{ date }}</span>
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
export class SuiCalendarHourView extends CalendarView {
    public get date():string {
        const month = this.localizationService
            .getValues().datepicker.months[this.renderedDate.getMonth()];
        const date = this.renderedDate.getDate();
        const year = this.renderedDate.getFullYear();

        return `${month} ${date}, ${year}`;
    }

    constructor(public localizationService:SuiLocalizationService) {
        super(CalendarViewType.Hour, 4);
    }

    public calculateItems():void {
        const dayStart = Util.Date.startOf(DatePrecision.Date, Util.Date.clone(this.renderedDate));
        this.calculatedItems = [];

        Util.Array.range(24).forEach(h => {
            const date = Util.Date.clone(dayStart);
            date.setHours(h);
            const comparer = new HourComparer(date);

            this.calculatedItems.push(
                new CalendarHoursItem(
                    date,
                    `${Util.String.padLeft(date.getHours().toString(), 2, "0")}:00`,
                    !comparer.isBetween(this.service.minDate, this.service.maxDate),
                    !!this.selectedDate && Util.Date.equal(DatePrecision.Hour, date, this.selectedDate),
                    false));
        });
    }

    public nextDateRange():void {
        this.renderedDate.setDate(this.renderedDate.getDate() + 1);
        this.updateItems();
    }

    public prevDateRange():void {
        this.renderedDate.setDate(this.renderedDate.getDate() - 1);
        this.updateItems();
    }
}
