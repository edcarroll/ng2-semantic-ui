import { CalendarMode } from "../services/calendar.service";
import { CalendarMappings, DatetimeMappings, DateMappings, TimeMappings, MonthMappings, YearMappings } from "./calendar-mappings";
import { DatePrecision, DateUtil } from "../../../misc/util/internal";

export abstract class CalendarConfig {
    public mode:CalendarMode;
    public precision:DatePrecision;
    public mappings:CalendarMappings;

    public fallback:string;

    public dateMinBound?:Date;
    public dateMaxBound?:Date;

    constructor(mode:CalendarMode, precision:DatePrecision, mappings:CalendarMappings, fallback:string) {
        this.mode = mode;
        this.precision = precision;
        this.mappings = mappings;
        this.fallback = fallback;
    }

    public updateBounds(providedDate:Date):void {
        this.dateMinBound = DateUtil.startOf(DatePrecision.Year, new Date(), true);
        this.dateMinBound.setFullYear(0);
    }
}

export class DateConfigBase extends CalendarConfig {
    constructor(precision:DatePrecision, mappings:CalendarMappings, fallback:string) {
        super(CalendarMode.DateOnly, precision, mappings, fallback);
    }
}

export class YearConfig extends DateConfigBase {
    constructor() {
        super(
            DatePrecision.Year,
            new YearMappings(),
            "number");
    }
}

export class MonthConfig extends DateConfigBase {
    constructor() {
        super(
            DatePrecision.Month,
            new MonthMappings(),
            "month");
    }
}

export class DateConfig extends DateConfigBase {
    constructor() {
        super(
            DatePrecision.Date,
            new DateMappings(),
            "date");
    }
}

export class DatetimeConfig extends CalendarConfig {
    constructor() {
        super(
            CalendarMode.Both,
            DatePrecision.Minute,
            new DatetimeMappings(),
            "datetime-local");
    }
}

export class TimeConfig extends CalendarConfig {
    constructor() {
        super(
            CalendarMode.TimeOnly,
            DatePrecision.Minute,
            new TimeMappings(),
            "time");
    }

    public updateBounds(providedDate:Date):void {
        this.dateMaxBound = DateUtil.endOf(DatePrecision.Date, DateUtil.clone(providedDate));
        this.dateMinBound = DateUtil.previous(DatePrecision.Date, DateUtil.clone(this.dateMaxBound));
    }
}
