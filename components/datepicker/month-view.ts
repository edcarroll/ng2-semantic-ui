
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import { DateUtils } from "./date-utils";
import { SuiLocalizationService } from "../util/localization.service";

@Component({
    selector: "sui-calendar-month-view",
    template: `
<table class="ui celled center aligned unstackable table three column month">
<thead>
    <tr>
        <th colspan="3">
            <span class="link" (click)="onZoomOut.emit()">{{ year }}</span>
            <span class="prev link" (click)="prevYear()">
                <i class="chevron left icon"></i>
            </span>
            <span class="next link" (click)="nextYear()">
                <i class="chevron right icon"></i>
            </span>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of groupedMonths">
        <td class="link"
            *ngFor="let month of group"
            (click)="setMonth(month)">{{ months[month] }}</td>
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
export class SuiCalendarMonthView {
    @HostBinding("class.ui")
    @HostBinding("class.calendar")
    private _calendarClasses:boolean = true;

    public get year():number {
        return this._displayedDate.getFullYear();
    }

    public get months():string[] {
        return this.localizationService.getValues().datepicker.months;
    }
    public groupedMonths:number[][];

    private _selectedDate:Date;
    private _displayedDate:Date;

    @Input()
    public set selectedDate(date:Date) {
        this._selectedDate = DateUtils.clone(date);
        this._displayedDate = DateUtils.clone(date);
    }

    @Output("monthSelected")
    public onMonthSelected:EventEmitter<Date>;

    @Output("zoomOut")
    public onZoomOut:EventEmitter<void>;

    constructor(public localizationService:SuiLocalizationService) {
        this.groupedMonths = this.groupMonths();

        this.onMonthSelected = new EventEmitter<Date>();
        this.onZoomOut = new EventEmitter<void>();
    }

    private groupMonths():number[][] {
        const months = Array<number>(12)
            .fill(0)
            .map((y, i) => y + i);

        const grouped:number[][] = [];

        while (months.length > 0) {
            grouped.push(months.splice(0, 3));
        }

        return grouped;
    }

    public nextYear():void {
        this._displayedDate.setFullYear(this.year + 1);
    }

    public prevYear():void {
        this._displayedDate.setFullYear(this.year - 1);
    }

    public setMonth(month:number):void {
        this._selectedDate.setFullYear(this._displayedDate.getFullYear());
        this._selectedDate.setMonth(month);

        this.onMonthSelected.emit(this._selectedDate);
    }
}
