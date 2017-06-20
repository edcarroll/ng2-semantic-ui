
import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { DateUtils } from "./date-utils";
import { CalendarView } from "./calendar-view";
import { ICalendarItem } from "./calendar-item";

@Component({
    selector: "sui-calendar-year-view",
    template: `
<table class="ui celled center aligned unstackable table three column year">
<thead>
    <tr>
        <th colspan="3">
            <span class="link" (click)="onZoomOut.emit()">{{ decadeStart }} - {{ decadeStart + 10 }}</span>
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
`,
    styles: [`
:host {
    user-select: none;
}
`]
})
export class SuiCalendarYearView extends CalendarView {
    public get decadeStart():number {
        return Math.floor(this.renderedDate.getFullYear() / 10) * 10 + 1;
    }

    constructor() {
        super();

        this.renderItems();
    }

    public renderItems():void {
        const decadeStart = DateUtils.startOfYear(DateUtils.clone(this.renderedDate));
        decadeStart.setFullYear(this.decadeStart);

        const yearNumbers = Array<number>(12)
            .fill(this.decadeStart)
            .map((y, i) => y + i);

        const years:ICalendarItem[] = [];

        yearNumbers.forEach(y => {
            const date = DateUtils.clone(decadeStart);
            date.setFullYear(y);

            years.push({
                associatedDate: date,
                humanReadable: date.getFullYear().toString(),
                isDisabled: false,
                isActive: DateUtils.yearsEqual(date, this._selectedDate)
            });
        });

        this.renderedItems = [];

        while (years.length > 0) {
            this.renderedItems.push(years.splice(0, 3));
        }
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
