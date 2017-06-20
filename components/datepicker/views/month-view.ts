
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import { DateUtils } from "../date-utils";
import { SuiLocalizationService } from "../../util/localization.service";
import { CalendarView } from "../calendar-view";
import { ICalendarItem } from "../calendar-item";

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
export class SuiCalendarMonthView extends CalendarView {
    public get year():number {
        return this.renderedDate.getFullYear();
    }

    constructor(public localizationService:SuiLocalizationService) {
        super();

        this.renderItems();
    }

    public renderItems():void {
        const yearStart = DateUtils.startOfYear(DateUtils.clone(this.renderedDate));

        const monthNumbers = Array<number>(12)
            .fill(0)
            .map((y, i) => y + i);

        const months:ICalendarItem[] = [];

        monthNumbers.forEach(m => {
            const date = DateUtils.clone(yearStart);
            date.setMonth(m);

            months.push({
                associatedDate: date,
                humanReadable: this.localizationService.getValues().datepicker.monthsShort[m],
                isDisabled: false,
                isActive: !!this._selectedDate && DateUtils.monthsEqual(date, this._selectedDate)
            });
        });

        this.renderedItems = [];

        while (months.length > 0) {
            this.renderedItems.push(months.splice(0, 3));
        }
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
