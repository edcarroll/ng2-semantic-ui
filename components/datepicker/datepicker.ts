
import { Component, HostBinding } from "@angular/core";

export type CalendarView = "year" | "month" | "date" | "exit";

@Component({
    selector: "sui-datepicker",
    template: `
<ng-container [ngSwitch]="currentView">
    <ng-container *ngSwitchCase="'year'">
    <sui-calendar-year-view [selectedDate]="currentDate"
                            (yearSelected)="onDateChanged($event, 'year')"
                            (zoomOut)="onZoomOut('year')"></sui-calendar-year-view>
    </ng-container>
    <ng-container *ngSwitchCase="'month'">
        <sui-calendar-month-view [selectedDate]="currentDate"
                                 (monthSelected)="onDateChanged($event, 'month')"
                                 (zoomOut)="onZoomOut('month')"></sui-calendar-month-view>    
    </ng-container>
    <ng-container *ngSwitchCase="'date'">
        <sui-calendar-date-view [selectedDate]="currentDate"
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

    public currentView:CalendarView;
    public currentDate:Date;

    public changedMappings:Map<CalendarView, CalendarView>;
    public zoomMappings:Map<CalendarView, CalendarView>;

    constructor() {
        this.currentView = "year";
        this.currentDate = new Date();

        this.changedMappings = new Map<CalendarView, CalendarView>([
            ["year", "month"],
            ["month", "date"],
            ["date", "date"]
        ]);

        this.zoomMappings = new Map<CalendarView, CalendarView>([
            ["year", "month"],
            ["month", "date"],
            ["date", "year"]
        ]);

        this.calendarClasses = true;
    }

    public onDateChanged(date:Date, view:CalendarView):void {
        this.currentDate = date;

        this.updateView(this.changedMappings, view);
    }

    public onZoomOut(view:CalendarView):void {
        this.updateView(this.zoomMappings, view);
    }

    private updateView(mappings:Map<CalendarView, CalendarView>, fromView:CalendarView):void {
        const mapping = mappings.get(fromView);
        if (!mapping) {
            throw new Error("Unknown view type.");
        }
        this.currentView = mapping;
    }
}
