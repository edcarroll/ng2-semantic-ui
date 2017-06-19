
import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "sui-yearpicker",
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
export class SuiYearpicker {
    @HostBinding("class.ui")
    @HostBinding("class.calendar")
    public calendarClasses:boolean = true;

    public get displayedYears():number[][] {
        const years = Array<number>(12)
            .fill(this.startYear)
            .map((y, i) => y + i);

        const grouped:number[][] = [];

        while (years.length > 0) {
            grouped.push(years.splice(0, 3));
        }

        return grouped;
    }

    public startYear:number;

    @Input()
    public set selectedYear(year:number) {
        this.startYear = Math.floor(year / 10) * 10 + 1;
    }

    @Output("yearSelected")
    public onYearSelected:EventEmitter<number>;

    constructor() {
        this.onYearSelected = new EventEmitter<number>();

        this.startYear = new Date().getFullYear();
    }

    public nextDecade():void {
        this.startYear += 10;
    }

    public prevDecade():void {
        this.startYear -= 10;
    }

    public setYear(year:number):void {
        this.onYearSelected.emit(year);
    }
}
