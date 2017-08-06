import { Component } from "@angular/core";
import { Util, DateUtil, DatePrecision } from "../../../misc/util";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarItem } from "../directives/calendar-item";
import { CalendarMode } from "../services/calendar.service";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";

export class CalendarRangeMinuteService extends CalendarRangeService {
    public calcStart(start:Date):Date {
        return DateUtil.startOf(DatePrecision.Hour, DateUtil.clone(start), true);
    }

    public calcDates(start:Date):Date[] {
        return Util.Array
            .range(this.length)
            .map(i => DateUtil.add(DatePrecision.Minute, DateUtil.clone(start), i * 5));
    }

    public configureItem(item:CalendarItem, baseDate:Date):void {
        item.humanReadable = new DateParser(this.service.localeValues.formats.time, this.service.localeValues).format(item.date);
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
        if (this.service.config.mode !== CalendarMode.TimeOnly) {
            const dateTimeFormat:string = this.service.localeValues.formats.datetime.replace(/m/g, "0");
            return new DateParser(dateTimeFormat, this.service.localeValues).format(this.currentDate);
        } else {
            const timeFormat:string = this.service.localeValues.formats.time.replace(/m/g, "0");
            return new DateParser(timeFormat, this.service.localeValues).format(this.currentDate);
        }
    }

    constructor() {
        super(CalendarViewType.Minute, new CalendarRangeMinuteService(DatePrecision.Hour, 4, 3));
    }
}
