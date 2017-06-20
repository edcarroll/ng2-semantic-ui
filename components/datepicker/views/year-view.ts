
import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarYearItem } from "../directives/calendar-item";
import { Util } from "../../util/util";

@Component({
    selector: "sui-calendar-year-view",
    template: `
<table class="ui celled center aligned unstackable table three column year">
<thead>
    <tr>
        <th colspan="3">
            <span class="link" (click)="zoomOut()">{{ decadeStart }} - {{ decadeStart + 10 }}</span>
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
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
})
export class SuiCalendarYearView extends CalendarView {
    public get decadeStart():number {
        return Math.floor(this.renderedDate.getFullYear() / 10) * 10 + 1;
    }

    constructor() {
        super(CalendarViewType.Year, 3);

        this.renderItems();
    }

    public renderItems():void {
        const decadeStart = Util.Date.startOfYear(Util.Date.clone(this.renderedDate));
        decadeStart.setFullYear(this.decadeStart);
        const years:CalendarYearItem[] = [];

        Util.Array.range(12, this.decadeStart).forEach(y => {
            const date = Util.Date.clone(decadeStart);
            date.setFullYear(y);

            const isActive = !!this.selectedDate && Util.Date.yearsEqual(date, this.selectedDate);

            years.push(new CalendarYearItem(date, date.getFullYear().toString(), false, isActive));
        });

        this.renderedItems = Util.Array.group(years, 3);
    }

    public nextDateRange():void {
        this.renderedDate.setFullYear(this.renderedDate.getFullYear() + 10);
        this.renderItems();
    }

    public prevDateRange():void {
        this.renderedDate.setFullYear(this.renderedDate.getFullYear() - 10);
        this.renderItems();
    }
}
