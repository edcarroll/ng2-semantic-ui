import { Component } from "@angular/core";
import { CalendarView } from "./calendar-view";
import { SuiLocalizationService } from "../../util/localization.service";
import { DateUtils } from "../date-utils";
import { ICalendarItem } from "../calendar-item";
import { padLeft } from "../../util/util";

@Component({
    selector: "sui-calendar-minute-view",
    template: `
<table class="ui celled center aligned unstackable table four column hour">
<thead>
    <tr>
        <th colspan="4">
            <span class="link" (click)="zoomOut()">{{ date }}</span>
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
export class SuiCalendarMinuteView extends CalendarView {
    public get date():string {
        const month = this.localizationService
            .getValues().datepicker.months[this.renderedDate.getMonth()];
        const date = this.renderedDate.getDate();
        const year = this.renderedDate.getFullYear();

        return `${month} ${date}, ${year}`;
    }

    constructor(public localizationService:SuiLocalizationService) {
        super();

        this.renderItems();
    }

    public renderItems():void {
        const dayStart = DateUtils.startOfHour(DateUtils.clone(this.renderedDate));

        const minuteNumbers = Array<number>(12)
            .fill(0)
            .map((m, i) => m + i * 5);

        const minutes:ICalendarItem[] = [];

        minuteNumbers.forEach(m => {
            const date = DateUtils.clone(dayStart);
            date.setMinutes(m);

            const hs = padLeft(date.getHours().toString(), 2, "0");
            const ms = padLeft(date.getMinutes().toString(), 2, "0");

            minutes.push({
                associatedDate: date,
                humanReadable: `${hs}:${ms}`,
                isDisabled: false,
                isActive: !!this._selectedDate && DateUtils.minutesEqual(date, this._selectedDate)
            });
        });

        this.renderedItems = [];

        while (minutes.length > 0) {
            this.renderedItems.push(minutes.splice(0, 3));
        }
    }

    public nextDateRange():void {
        this.renderedDate.setDate(this.renderedDate.getDate() + 1);
        this.renderItems();
    }

    public prevDateRange():void {
        this.renderedDate.setDate(this.renderedDate.getDate() - 1);
        this.renderItems();
    }
}
