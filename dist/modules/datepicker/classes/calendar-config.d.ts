import { CalendarMode } from "../services/calendar.service";
import { CalendarMappings } from "./calendar-mappings";
import { DatePrecision } from "../../../misc/util/index";
export declare abstract class CalendarConfig {
    mode: CalendarMode;
    precision: DatePrecision;
    mappings: CalendarMappings;
    fallback: string;
    dateMinBound?: Date;
    dateMaxBound?: Date;
    constructor(mode: CalendarMode, precision: DatePrecision, mappings: CalendarMappings, fallback: string);
    updateBounds(providedDate: Date): void;
}
export declare class DateConfigBase extends CalendarConfig {
    constructor(precision: DatePrecision, mappings: CalendarMappings, fallback: string);
}
export declare class YearConfig extends DateConfigBase {
    constructor();
}
export declare class MonthConfig extends DateConfigBase {
    constructor();
}
export declare class DateConfig extends DateConfigBase {
    constructor();
}
export declare class DatetimeConfig extends CalendarConfig {
    constructor();
}
export declare class TimeConfig extends CalendarConfig {
    constructor();
    updateBounds(providedDate: Date): void;
}
