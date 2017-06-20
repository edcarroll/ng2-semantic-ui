import { Component } from "@angular/core";
import { CalendarView } from "./calendar-view";
import { SuiLocalizationService } from "../../util/localization.service";
import { DateUtils } from "../date-utils";
import { ICalendarItem } from "../calendar-item";
import { Util } from "../../util/util";

@Component({
    selector: "sui-calendar-hour-view",
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
export class SuiCalendarHourView extends CalendarView {
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
        const dayStart = DateUtils.startOfDay(DateUtils.clone(this.renderedDate));
        const hours:ICalendarItem[] = [];

        Util.Array.range(24).forEach(h => {
            const date = DateUtils.clone(dayStart);
            date.setHours(h);

            hours.push({
                associatedDate: date,
                humanReadable: `${Util.String.padLeft(date.getHours().toString(), 2, "0")}:00`,
                isDisabled: false,
                isActive: !!this._selectedDate && DateUtils.hoursEqual(date, this._selectedDate)
            });
        });

        this.renderedItems = this.group(hours, 4);
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
