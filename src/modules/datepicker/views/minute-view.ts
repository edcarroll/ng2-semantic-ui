import { Component } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarItem } from "../directives/calendar-item";
import { CalendarMode } from "../services/calendar.service";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";

export class CalendarRangeMinuteService extends CalendarRangeService {
    public calcStart(start:Date):Date {
        return Util.Date.startOf(DatePrecision.Hour, Util.Date.clone(start), true);
    }

    public calcDates(start:Date):Date[] {
        return Util.Array
            .range(this.length)
            .map(i => Util.Date.add(DatePrecision.Minute, Util.Date.clone(start), i * 5));
    }

    public configureItem(item:CalendarItem, baseDate:Date):void {
        const hs = Util.String.padLeft(item.date.getHours().toString(), 2, "0");
        const ms = Util.String.padLeft(item.date.getMinutes().toString(), 2, "0");

        item.humanReadable = `${hs}:${ms}`;
        item.isOutsideRange = false;
        item.isToday = false;
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
        const [time, date] = new DateParser("HH:00|MMMM D, YYYY", this.service.localeValues)
            .format(this.currentDate)
            .split("|");

        if (this.service.config.mode !== CalendarMode.TimeOnly) {
            return `${date} ${time}`;
        }

        return time;
    }

    constructor() {
        super(CalendarViewType.Minute, new CalendarRangeMinuteService(DatePrecision.Hour, 4, 3));
    }
}
