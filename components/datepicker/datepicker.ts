
import { Component, HostBinding } from "@angular/core";
import { Util } from "../util/util";
import { CalendarViewType, CalendarViewResult } from "./views/calendar-view";

@Component({
    selector: "sui-datepicker",
    template: `
<ng-container [ngSwitch]="currentView">
    <ng-container *ngSwitchCase="'year'">
    <sui-calendar-year-view [initialDate]="currentDate"
                            [selectedDate]="selectedDate"
                            (dateSelected)="onDateChanged($event)"
                            (zoomOut)="onZoomOut($event)"></sui-calendar-year-view>
    </ng-container>
    <ng-container *ngSwitchCase="'month'">
        <sui-calendar-month-view [initialDate]="currentDate"
                                 [selectedDate]="selectedDate"
                                 (dateSelected)="onDateChanged($event)"
                                 (zoomOut)="onZoomOut($event)"></sui-calendar-month-view>    
    </ng-container>
    <ng-container *ngSwitchCase="'date'">
        <sui-calendar-date-view [initialDate]="currentDate"
                                [selectedDate]="selectedDate"
                                (dateSelected)="onDateChanged($event)"
                                (zoomOut)="onZoomOut($event)"></sui-calendar-date-view>    
    </ng-container>
    <ng-container *ngSwitchCase="'hour'">
        <sui-calendar-hour-view [initialDate]="currentDate"
                                [selectedDate]="selectedDate"
                                (dateSelected)="onDateChanged($event)"
                                (zoomOut)="onZoomOut($event)"></sui-calendar-hour-view>    
    </ng-container>
    <ng-container *ngSwitchCase="'minute'">
        <sui-calendar-minute-view [initialDate]="currentDate"
                                [selectedDate]="selectedDate"
                                (dateSelected)="onDateChanged($event)"
                                (zoomOut)="onZoomOut($event)"></sui-calendar-minute-view>    
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
            this._selectedDate = Util.Date.clone(date);
            this.currentDate = Util.Date.clone(date);
            this.currentView = "date";
        }
    }

    public changedMappings:Map<CalendarViewType, CalendarViewType>;
    public zoomMappings:Map<CalendarViewType, CalendarViewType>;

    constructor() {
        this.reset();

        this.changedMappings = new Map<CalendarViewType, CalendarViewType>([
            ["year", "month"],
            ["month", "date"],
            ["date", "hour"],
            ["hour", "minute"],
            ["minute", "minute"]
        ]);

        this.zoomMappings = new Map<CalendarViewType, CalendarViewType>([
            ["year", "date"],
            ["month", "year"],
            ["date", "month"],
            ["hour", "date"],
            ["minute", "date"]
        ]);

        this.calendarClasses = true;
    }

    public onDateChanged([date, viewType]:CalendarViewResult):void {
        this.currentDate = date;

        if (viewType === "minute") {
            this.selectedDate = date;
        }

        this.updateView(this.changedMappings, viewType);
    }

    public reset():void {
        if (!this._selectedDate) {
            this.currentDate = new Date();
            this.currentView = "year";
        }
    }

    public onZoomOut(viewType:CalendarViewType):void {
        this.updateView(this.zoomMappings, viewType);
    }

    private updateView(mappings:Map<CalendarViewType, CalendarViewType>, fromView:CalendarViewType):void {
        const mapping = mappings.get(fromView);
        if (!mapping) {
            throw new Error("Unknown view type.");
        }
        this.currentView = mapping;
    }
}
