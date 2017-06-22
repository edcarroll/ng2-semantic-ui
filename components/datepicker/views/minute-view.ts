import { Component } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarMinutesItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { MinuteComparer } from "../classes/date-comparer";
import { CalendarMode } from "../services/calendar.service";

@Component({
    selector: "sui-calendar-minute-view",
    template: `
<table class="ui celled center aligned unstackable table three column minute">
<thead>
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
export class SuiCalendarMinuteView extends CalendarView {
    public get date():string {
        const year = this.renderedDate.getFullYear();
        const month = this.localizationService
            .getValues().datepicker.months[this.renderedDate.getMonth()];
        const date = this.renderedDate.getDate();
        const hour = Util.String.padLeft(this.renderedDate.getHours().toString(), 2, "0");

        let formatted = `${hour}:00`;
        if (this.service.config.mode !== CalendarMode.TimeOnly) {
            formatted = `${month} ${date}, ${year} ${formatted}`;
        }

        return formatted;
    }

    constructor(public localizationService:SuiLocalizationService) {
        super(CalendarViewType.Minute, 3, DatePrecision.Hour);
    }

    public calculateItems():void {
        const dayStart = Util.Date.startOf(DatePrecision.Hour, Util.Date.clone(this.renderedDate));
        this.calculatedItems = [];

        Util.Array.range(12).forEach(i => {
            const date = Util.Date.startOf(DatePrecision.Minute, Util.Date.clone(dayStart));
            date.setMinutes(i * 5);
            const comparer = new MinuteComparer(date);

            const hs = Util.String.padLeft(date.getHours().toString(), 2, "0");
            const ms = Util.String.padLeft(date.getMinutes().toString(), 2, "0");

            this.calculatedItems.push(new CalendarMinutesItem(
                date,
                `${hs}:${ms}`,
                !comparer.isBetween(this.service.minDate, this.service.maxDate),
                comparer.isEqualTo(this.selectedDate),
                false));
        });
    }
}
