
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import { DateUtils } from "./date-utils";

@Component({
    selector: "sui-monthpicker",
    template: `
<table class="ui celled center aligned unstackable table three column month">
<thead>
    <tr>
        <th colspan="3">
            <span class="link">{{ year }}</span>
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
    <tr *ngFor="let group of displayedMonths">
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
export class SuiMonthpicker {
    @HostBinding("class.ui")
    @HostBinding("class.calendar")
    private _calendarClasses:boolean = true;

    public get year():number {
        return this._selectedDate.getFullYear();
    }

    public months:string[] = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    public get displayedMonths():number[][] {
        const months = Array<number>(12)
            .fill(0)
            .map((y, i) => y + i);

        const grouped:number[][] = [];

        while (months.length > 0) {
            grouped.push(months.splice(0, 3));
        }

        return grouped;
    }

    private _selectedDate:Date;

    @Input()
    public set selectedDate(date:Date) {
        this._selectedDate = DateUtils.clone(date);
    }

    @Output("monthSelected")
    public onMonthSelected:EventEmitter<Date>;

    constructor() {
        this.onMonthSelected = new EventEmitter<Date>();
    }

    public nextYear():void {
        this._selectedDate.setFullYear(this.year + 1);
    }

    public prevYear():void {
        this._selectedDate.setFullYear(this.year - 1);
    }

    public setMonth(month:number):void {
        this._selectedDate.setMonth(month);

        this.onMonthSelected.emit(this._selectedDate);
    }
}
