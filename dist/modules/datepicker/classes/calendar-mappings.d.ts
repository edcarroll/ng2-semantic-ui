import { CalendarViewType } from "../views/calendar-view";
export declare type CalendarMapping<T = CalendarViewType> = Map<CalendarViewType, T>;
export declare abstract class CalendarMappings {
    initialView: CalendarViewType;
    finalView: CalendarViewType;
    changed: CalendarMapping;
    zoom: CalendarMapping;
}
export declare class DateMappings extends CalendarMappings {
    constructor();
}
export declare class TimeMappings extends CalendarMappings {
    constructor();
}
export declare class DatetimeMappings extends CalendarMappings {
    constructor();
}
export declare class MonthMappings extends CalendarMappings {
    constructor();
}
export declare class YearMappings extends CalendarMappings {
    constructor();
}
