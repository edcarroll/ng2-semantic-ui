import { Component } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { DateComparer } from "../classes/date-comparer";
import { CalendarRangeService } from "../services/calendar-range.service";

export class CalendarRangeHourService extends CalendarRangeService {
    public configureItem(item:CalendarItem, baseDate:Date):void {
        item.humanReadable = `${Util.String.padLeft(item.date.getHours().toString(), 2, "0")}:00`;
        item.isOutsideRange = false;
        item.isToday = false;
    }
}

@Component({
    selector: "sui-calendar-hour-view",
    template: `
<table class="ui celled center aligned unstackable table four column hour">
<thead *ngIf="service.config.mode != 1">
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
export class SuiCalendarHourView extends CalendarView {
    public get date():string {
        const month = this.service.localizationValues.months[this.currentDate.getMonth()];
        const date = this.currentDate.getDate();
        const year = this.currentDate.getFullYear();

        return `${month} ${date}, ${year}`;
    }

    constructor() {
        super(CalendarViewType.Hour, new CalendarRangeHourService(DatePrecision.Date, 6, 4));
    }
}
