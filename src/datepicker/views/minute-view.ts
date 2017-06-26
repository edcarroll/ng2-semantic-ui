import { Component } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { DateComparer } from "../classes/date-comparer";
import { CalendarMode } from "../services/calendar.service";
import { CalendarRangeService } from "../services/calendar-range.service";

export class CalendarRangeMinuteService extends CalendarRangeService {
    public calcStart(start:Date):Date {
        return Util.Date.startOf(DatePrecision.Hour, Util.Date.clone(start), true);
    }

    public calcDates(start:Date):Date[] {
        return Util.Array
            .range(this.length)
            .map(i => Util.Date.add(DatePrecision.Minute, Util.Date.clone(start), i * 5));
    }

    public calcItem(date:Date, baseDate:Date, comparer:DateComparer):CalendarItem {
        const hs = Util.String.padLeft(date.getHours().toString(), 2, "0");
        const ms = Util.String.padLeft(date.getMinutes().toString(), 2, "0");

        return new CalendarItem(
            date,
            `${hs}:${ms}`,
            !comparer.isBetween(date, this.service.minDate, this.service.maxDate),
            comparer.isEqualTo(date, this.service.selectedDate),
            false,
            false);
    }
}

@Component({
    selector: "sui-calendar-minute-view",
    template: `
<table class="ui celled center aligned unstackable table three column minute">
<thead>
    <tr>
        <th colspan="4">
            <span class="link" (click)="zoomOut()">{{ date }}</span>
            <span class="prev link" [class.disabled]="!ranges.canMovePrevious" (click)="ranges.movePrevious()">
                <i class="chevron left icon"></i>
            </span>
            <span class="next link" [class.disabled]="!ranges.canMoveNext" (click)="ranges.moveNext()">
                <i class="chevron right icon"></i>
            </span>
        </th>
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
export class SuiCalendarMinuteView extends CalendarView {
    public get date():string {
        const year = this.currentDate.getFullYear();
        const month = this.service.localizationValues.datepicker
            .months[this.currentDate.getMonth()];
        const date = this.currentDate.getDate();
        const hour = Util.String.padLeft(this.currentDate.getHours().toString(), 2, "0");

        let formatted = `${hour}:00`;
        if (this.service.config.mode !== CalendarMode.TimeOnly) {
            formatted = `${month} ${date}, ${year} ${formatted}`;
        }

        return formatted;
    }

    constructor() {
        super(CalendarViewType.Minute, new CalendarRangeMinuteService(DatePrecision.Hour, 4, 3));
    }
}
