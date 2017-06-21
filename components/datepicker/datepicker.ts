
import { Component, HostBinding, Directive, EventEmitter, Output } from "@angular/core";
import { Util } from "../util/util";
import { CalendarViewType, CalendarViewResult } from "./views/calendar-view";
import { CalendarService } from "./services/calendar.service";

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
    public calendarClasses:boolean;

    public service:CalendarService;

    @HostBinding("attr.tabindex")
    public tabIndex:number;

    constructor() {
        this.service = new CalendarService(
            CalendarViewType.Date, /*Minute,*/
            new Map<CalendarViewType, CalendarViewType>([
                [CalendarViewType.Year, CalendarViewType.Month],
                [CalendarViewType.Month, CalendarViewType.Date],
                [CalendarViewType.Date, CalendarViewType.Date]/*,
                [CalendarViewType.Hour, CalendarViewType.Minute],
                [CalendarViewType.Minute, CalendarViewType.Minute]*/
            ]),
            new Map<CalendarViewType, CalendarViewType>([
                [CalendarViewType.Year, CalendarViewType.Date],
                [CalendarViewType.Month, CalendarViewType.Year],
                [CalendarViewType.Date, CalendarViewType.Month]/*,
                [CalendarViewType.Hour, CalendarViewType.Date],
                [CalendarViewType.Minute, CalendarViewType.Date]*/
            ]));

        this.calendarClasses = true;
        this.tabIndex = 0;
    }
}
