import { Component, HostBinding, EventEmitter, Output, Input } from "@angular/core";
import { DateUtils } from "./date-utils";
import { SuiLocalizationService } from "../util/localization.service";
import { ICalendarItem } from "./calendar-item";

@Component({
    selector: "sui-calendar-date-view",
    template: `
<table class="ui celled center aligned unstackable table seven column day">
<thead>
    <tr>
        <th colspan="7">
            <span class="link" (click)="onZoomOut.emit()">{{ month }} {{ year }}</span>
            <span class="prev link" (click)="prevMonth()">
                <i class="chevron left icon"></i>
            </span>
            <span class="next link" (click)="nextMonth()">
                <i class="chevron right icon"></i>
            </span>
        </th>
    </tr>
    <tr>
        <th *ngFor="let day of dynamicDays">{{ day }}</th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of displayedDates">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item.associatedDate)">{{ item.humanReadable }}
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
export class SuiCalendarDateView {
    public get dynamicDays():string[] {
        const days = this.localizationService.getValues().datepicker.weekdaysShort;
        return days.map((d, i) => days[(i + this.firstDayOfWeek) % days.length]);
    }

    public get year():number {
        return this._displayedDate.getFullYear();
    }

    public get month():string {
        return this.localizationService
            .getValues().datepicker.months[this._displayedDate.getMonth()];
    }

    public displayedDates:ICalendarItem[][];

    private _selectedDate:Date;
    private _displayedDate:Date;

    @Input()
    public set selectedDate(date:Date) {
        this._selectedDate = DateUtils.clone(date);
        this._displayedDate = DateUtils.clone(date);

        this.displayedDates = this.groupDates();
    }

    @Input()
    public firstDayOfWeek:number;

    @Output("dateSelected")
    public onDateSelected:EventEmitter<Date>;

    @Output("zoomOut")
    public onZoomOut:EventEmitter<void>;

    constructor(public localizationService:SuiLocalizationService) {
        this.firstDayOfWeek = this.localizationService
            .getValues().datepicker.firstDayOfWeek;

        this.selectedDate = new Date();

        this.onDateSelected = new EventEmitter<Date>();
        this.onZoomOut = new EventEmitter<void>();
    }

    public groupDates():ICalendarItem[][] {
        const monthStart = DateUtils.startOfMonth(DateUtils.clone(this._displayedDate));
        const month = monthStart.getMonth();
        monthStart.setDate((1 - monthStart.getDay() + this.firstDayOfWeek - 7) % 7);

        const dates:ICalendarItem[][] = [];
        const weeksToShow = 6;
        const weekLength = 7;
        for (let w = 0; w < weeksToShow; w++) {
            const week:ICalendarItem[] = [];

            for (let d = 0; d < weekLength; d++) {
                const date = DateUtils.clone(monthStart);
                date.setDate(date.getDate() + (w * weekLength + d));

                week.push({
                    associatedDate: date,
                    isDisabled: date.getMonth() !== month,
                    humanReadable: date.getDate().toString()
                });
            }

            dates.push(week);
        }

        return dates;
    }

    public nextMonth():void {
        this._displayedDate.setMonth(this._displayedDate.getMonth() + 1);
        this.displayedDates = this.groupDates();
    }

    public prevMonth():void {
        this._displayedDate.setMonth(this._displayedDate.getMonth() - 1);
        this.displayedDates = this.groupDates();
    }

    public setDate(date:Date):void {
        this._selectedDate = date;

        this.onDateSelected.emit(this._selectedDate);
    }
}
