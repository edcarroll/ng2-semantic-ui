
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { DateComparer } from "../classes/date-comparer";
import { CalendarRangeService } from "../services/calendar-range.service";

export class CalendarRangeMonthService extends CalendarRangeService {
    public calcItem(date:Date, baseDate:Date, comparer:DateComparer):CalendarItem {
        return new CalendarItem(
            date,
            this.service.localizationValues.datepicker.monthsShort[date.getMonth()],
            !comparer.isBetween(date, this.service.minDate, this.service.maxDate),
            comparer.isEqualTo(date, this.service.selectedDate),
            false,
            comparer.isEqualTo(date, new Date()));
    }
}

@Component({
    selector: "sui-calendar-month-view",
    template: `
<table class="ui celled center aligned unstackable table three column month">
<thead>
    <tr>
        <th colspan="3">
            <span class="link" (click)="zoomOut()">{{ year }}</span>
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
export class SuiCalendarMonthView extends CalendarView {
    public get year():string {
        return Util.String.padLeft(this.currentDate.getFullYear().toString(), 4, "0");
    }

    constructor() {
        super(CalendarViewType.Month, new CalendarRangeMonthService(DatePrecision.Year, 4, 3));
    }
}
