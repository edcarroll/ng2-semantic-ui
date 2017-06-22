
import { Component, HostBinding, Directive, EventEmitter, Output } from "@angular/core";
import { Util } from "../util/util";
import { CalendarViewType, CalendarViewResult } from "./views/calendar-view";
import { CalendarService, CalendarMode } from "./services/calendar.service";
import { DatetimeConfig, TimeConfig, DateConfig, MonthConfig } from "./classes/calendar-config";

@Component({
    selector: "sui-datepicker",
    template: `
<ng-container [ngSwitch]="service.currentView">
    <sui-calendar-year-view [service]="service" *ngSwitchCase="0"></sui-calendar-year-view>
    <sui-calendar-month-view [service]="service" *ngSwitchCase="1"></sui-calendar-month-view>    
    <sui-calendar-date-view [service]="service" *ngSwitchCase="2"></sui-calendar-date-view>    
    <sui-calendar-hour-view [service]="service" *ngSwitchCase="3"></sui-calendar-hour-view>    
    <sui-calendar-minute-view [service]="service" *ngSwitchCase="4"></sui-calendar-minute-view>    
</ng-container>
`,
    styles: [`
:host {
    user-select: none;
}
`]
})
export class SuiDatepicker {
    @HostBinding("class.ui")
    @HostBinding("class.active")
    @HostBinding("class.calendar")
    private _calendarClasses:boolean;

    public service:CalendarService;

    public get selectedDate():Date | undefined {
        return this.service.selectedDate;
    }

    public set selectedDate(date:Date| undefined) {
        this.service.selectedDate = date;
    }

    public get currentView():CalendarViewType {
        return this.service.currentView;
    }

    public set currentView(view:CalendarViewType) {
        this.service.currentView = view;
    }

    public get maxDate():Date | undefined {
        return this.service.maxDate;
    }

    public set maxDate(max:Date| undefined) {
        this.service.maxDate = max;
    }

    public get minDate():Date | undefined {
        return this.service.minDate;
    }

    public set minDate(min:Date| undefined) {
        this.service.minDate = min;
    }

    public get onDateChange():EventEmitter<Date> {
        return this.service.onDateChange;
    }

    @HostBinding("attr.tabindex")
    public tabIndex:number;

    constructor() {
        this.service = new CalendarService(new DatetimeConfig());

        this._calendarClasses = true;
        this.tabIndex = 0;
    }
}
