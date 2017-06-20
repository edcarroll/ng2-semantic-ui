
import { Component, HostBinding } from "@angular/core";
import { DateUtils } from "./date-utils";

export type CalendarViewType = "year" | "month" | "date" | "exit";

@Component({
    selector: "sui-datepicker",
    template: `
<ng-container [ngSwitch]="currentView">
    <ng-container *ngSwitchCase="'year'">
    <sui-calendar-year-view [initialDate]="currentDate"
                            [selectedDate]="selectedDate"
                            (dateSelected)="onDateChanged($event, 'year')"
                            (zoomOut)="onZoomOut('year')"></sui-calendar-year-view>
    </ng-container>
    <ng-container *ngSwitchCase="'month'">
        <sui-calendar-month-view [initialDate]="currentDate"
                                 [selectedDate]="selectedDate"
                                 (dateSelected)="onDateChanged($event, 'month')"
                                 (zoomOut)="onZoomOut('month')"></sui-calendar-month-view>    
    </ng-container>
    <ng-container *ngSwitchCase="'date'">
        <sui-calendar-date-view [initialDate]="currentDate"
                                [selectedDate]="selectedDate"
                                (dateSelected)="onDateChanged($event, 'date')"
                                (zoomOut)="onZoomOut('date')"></sui-calendar-date-view>    
    </ng-container>
</ng-container>
`
})
export class SuiDatepicker {
    @HostBinding("class.ui")
    @HostBinding("class.calendar")
    public calendarClasses:boolean;

    private _selectedDate?:Date;

    public currentView:CalendarViewType;
    public currentDate:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    public set selectedDate(date:Date | undefined) {
        if (date) {
            this._selectedDate = DateUtils.clone(date);
            this.currentDate = DateUtils.clone(date);
        }
    }

    public changedMappings:Map<CalendarViewType, CalendarViewType>;
    public zoomMappings:Map<CalendarViewType, CalendarViewType>;

    constructor() {
        this.currentView = "year";
        this.currentDate = new Date();

        this.changedMappings = new Map<CalendarViewType, CalendarViewType>([
            ["year", "month"],
            ["month", "date"],
            ["date", "date"]
        ]);

        this.zoomMappings = new Map<CalendarViewType, CalendarViewType>([
            ["year", "date"],
            ["month", "year"],
            ["date", "month"]
        ]);

        this.calendarClasses = true;
    }

    public onDateChanged(date:Date, view:CalendarViewType):void {
        this.currentDate = date;

        if (view === "date") {
            this.selectedDate = date;
        }

        this.updateView(this.changedMappings, view);
    }

    public onZoomOut(view:CalendarViewType):void {
        this.updateView(this.zoomMappings, view);
    }

    private updateView(mappings:Map<CalendarViewType, CalendarViewType>, fromView:CalendarViewType):void {
        const mapping = mappings.get(fromView);
        if (!mapping) {
            throw new Error("Unknown view type.");
        }
        this.currentView = mapping;
    }
}
