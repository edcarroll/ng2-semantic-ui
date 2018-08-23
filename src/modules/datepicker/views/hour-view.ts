import { Component, Renderer2 } from "@angular/core";
import { DatePrecision } from "../../../misc/util/internal";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarItem } from "../directives/calendar-item";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";

export class CalendarRangeHourService extends CalendarRangeService {
    public configureItem(item:CalendarItem, baseDate:Date):void {
        // Set minutes and seconds to 0
        const customFormat:string = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
        item.humanReadable = new DateParser(customFormat, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    }
}

@Component({
    selector: "sui-calendar-hour-view",
    template: `
<table class="ui celled center aligned unstackable table four column hour">
<thead *ngIf="service.config.mode != 1">
    <tr>
        <th colspan="4">
            <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
                {{ date }}
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
export class SuiCalendarHourView extends CalendarView {

    public get date():string {
        return new DateParser(this.service.localeValues.formats.date, this.service.localeValues).format(this.currentDate);
    }

    constructor(renderer:Renderer2) {
        super(renderer, CalendarViewType.Hour, new CalendarRangeHourService(DatePrecision.Date, 6, 4));
    }
}
