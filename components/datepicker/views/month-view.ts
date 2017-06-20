
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarMonthItem } from "../directives/calendar-item";
import { Util } from "../../util/util";

@Component({
    selector: "sui-calendar-month-view",
    template: `
<table class="ui celled center aligned unstackable table three column month">
<thead>
    <tr>
        <th colspan="3">
            <span class="link" (click)="zoomOut()">{{ year }}</span>
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
    <tr *ngFor="let group of renderedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            calendarFocusable
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
})
export class SuiCalendarMonthView extends CalendarView {
    public get year():number {
        return this.renderedDate.getFullYear();
    }

    constructor(public localizationService:SuiLocalizationService) {
        super(CalendarViewType.Month);

        this.renderItems();
    }

    public renderItems():void {
        const yearStart = Util.Date.startOfYear(Util.Date.clone(this.renderedDate));
        const months:CalendarMonthItem[] = [];

        Util.Array.range(12).forEach(m => {
            const date = Util.Date.clone(yearStart);
            date.setMonth(m);

            const hR = this.localizationService.getValues().datepicker.monthsShort[m];
            const isActive = !!this.selectedDate && Util.Date.monthsEqual(date, this.selectedDate);

            months.push(new CalendarMonthItem(date, hR, false, isActive));
        });

        this.renderedItems = Util.Array.group(months, 3);
    }

    public nextDateRange():void {
        this.renderedDate.setFullYear(this.year + 1);
        this.renderItems();
    }

    public prevDateRange():void {
        this.renderedDate.setFullYear(this.year - 1);
        this.renderItems();
    }
}
