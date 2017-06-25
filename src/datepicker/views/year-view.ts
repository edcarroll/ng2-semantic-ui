
import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarYearItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { YearComparer } from "../classes/date-comparer";
import { CalendarRangeService } from "../services/calendar-range.service";

export class CalendarRangeYearService extends CalendarRangeService {
    public calcItem(date:Date, baseDate:Date):CalendarYearItem {
        const comparer = new YearComparer(date);
        return new CalendarYearItem(
            date,
            Util.String.padLeft(date.getFullYear().toString(), 4, "0"),
            !comparer.isBetween(this.service.minDate, this.service.maxDate),
            comparer.isEqualTo(this.service.selectedDate),
            date.getFullYear() >= baseDate.getFullYear() + 10);
    }
}


@Component({
    selector: "sui-calendar-year-view",
    template: `
<table class="ui celled center aligned unstackable table three column year">
<thead>
    <tr>
        <th colspan="3">
            <span class="link" (click)="zoomOut()">{{ pad(decadeStart) }} - {{ pad(decadeStart + 10) }}</span>
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
export class SuiCalendarYearView extends CalendarView {
    public get decadeStart():number {
        return Math.floor(this.service.currentDate.getFullYear() / 10) * 10 + 1;
    }

    constructor() {
        super(CalendarViewType.Year, new CalendarRangeYearService(DatePrecision.Decade, 4, 3));
    }

    public pad(year:number):string {
        return Util.String.padLeft(year.toString(), 4, "0");
    }
}
