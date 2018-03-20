import { Renderer2 } from "@angular/core";
import { CalendarView } from "./calendar-view";
import { CalendarItem } from "../directives/calendar-item";
import { CalendarRangeService } from "../services/calendar-range.service";
export declare class CalendarRangeYearService extends CalendarRangeService {
    configureItem(item: CalendarItem, baseDate: Date): void;
}
export declare class SuiCalendarYearView extends CalendarView {
    readonly decadeStart: number;
    constructor(renderer: Renderer2);
    pad(year: number): string;
}
