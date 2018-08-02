import { Component, Renderer2 } from "@angular/core";
import { DatePrecision } from "../../../misc/util/internal";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarItem } from "../directives/calendar-item";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";

export class CalendarRangeMonthService extends CalendarRangeService {
    public configureItem(item:CalendarItem, baseDate:Date):void {
        item.humanReadable = this.service.localeValues.monthsShort[item.date.getMonth()];
        item.isOutsideRange = false;
    }
}

@Component({
    selector: "sui-calendar-month-view",
    template: `
<table class="ui celled center aligned unstackable table three column month">
<thead>
    <tr>
        <th colspan="3">
            <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
                {{ year }}
            </sui-calendar-view-title>
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
        return new DateParser(this.service.localeValues.formats.year, this.service.localeValues).format(this.currentDate);
    }

    constructor(renderer:Renderer2) {
        super(renderer, CalendarViewType.Month, new CalendarRangeMonthService(DatePrecision.Year, 4, 3));
    }
}
