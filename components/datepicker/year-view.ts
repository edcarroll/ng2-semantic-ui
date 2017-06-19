
import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { DateUtils } from "./date-utils";

@Component({
    selector: "sui-calendar-year-view",
    template: `
<table class="ui celled center aligned unstackable table three column year">
<thead>
    <tr>
        <th colspan="3">
            <span class="link">{{ startYear }} - {{ startYear + 10 }}</span>
            <span class="prev link" (click)="prevDecade()">
                <i class="chevron left icon"></i>
            </span>
            <span class="next link" (click)="nextDecade()">
                <i class="chevron right icon"></i>
            </span>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of displayedYears">
        <td class="link"
            *ngFor="let year of group"
            (click)="setYear(year)">{{ year }}</td>
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
export class SuiCalendarYearView {
    @HostBinding("class.ui")
    @HostBinding("class.calendar")
    private _calendarClasses:boolean = true;

    public get startYear():number {
        return Math.floor(this._displayedDate.getFullYear() / 10) * 10 + 1;
    }

    public displayedYears:number[][];

    private _selectedDate:Date;
    private _displayedDate:Date;

    @Input()
    public set selectedDate(date:Date) {
        this._selectedDate = DateUtils.clone(date);
        this._displayedDate = DateUtils.clone(date);
    }

    @Output("yearSelected")
    public onYearSelected:EventEmitter<Date>;

    constructor() {
        this.onYearSelected = new EventEmitter<Date>();
    }

    private groupYears():number[][] {
        const years = Array<number>(12)
            .fill(this.startYear)
            .map((y, i) => y + i);

        const grouped:number[][] = [];

        while (years.length > 0) {
            grouped.push(years.splice(0, 3));
        }

        return grouped;
    }

    public nextDecade():void {
        this._displayedDate.setFullYear(this._displayedDate.getFullYear() + 10);
        this.displayedYears = this.groupYears();
    }

    public prevDecade():void {
        this._displayedDate.setFullYear(this._displayedDate.getFullYear() - 10);
        this.displayedYears = this.groupYears();
    }

    public setYear(year:number):void {
        this._selectedDate.setFullYear(year);

        this.onYearSelected.emit(this._selectedDate);
    }
}
