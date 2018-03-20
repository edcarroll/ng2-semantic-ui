import { EventEmitter } from "@angular/core";
import { CalendarRangeService } from "../services/calendar-range.service";
export declare class SuiCalendarViewTitle {
    ranges: CalendarRangeService;
    onZoomOut: EventEmitter<void>;
    constructor();
}
