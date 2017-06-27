import { CalendarMode } from "../services/calendar.service";
import { CalendarMappings, DatetimeMappings, DateMappings, TimeMappings, MonthMappings, YearMappings } from "./calendar-mappings";
import { IDateParser, DateParser, dateComponentParsers } from "./date-parser";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";

export abstract class CalendarConfig {
    public mode:CalendarMode;
    public precision:DatePrecision;
    public mappings:CalendarMappings;
    public parser:IDateParser;

    public fallback:string;

    public dateMinBound?:Date;
    public dateMaxBound?:Date;

    constructor(mode:CalendarMode, precision:DatePrecision, mappings:CalendarMappings, parser:IDateParser, fallback:string) {
        this.mode = mode;
        this.precision = precision;
        this.mappings = mappings;
        this.parser = parser;
        this.fallback = fallback;
    }

    public updateBounds(providedDate:Date):void {
        this.dateMinBound = Util.Date.startOf(DatePrecision.Year, new Date(), true);
        this.dateMinBound.setFullYear(0);
    }

    public postProcess(date:Date):void {}
}

export class DateConfigBase extends CalendarConfig {
    constructor(precision:DatePrecision, mappings:CalendarMappings, parser:IDateParser, fallback:string) {
        super(CalendarMode.DateOnly, precision, mappings, parser, fallback);
    }

    public postProcess(date:Date):void {
        Util.Date.rewriteTimezone(date);
    }
}

export class YearConfig extends DateConfigBase {
    constructor() {
        super(
            DatePrecision.Year,
            new YearMappings(),
            new DateParser(dateComponentParsers.slice(0, 1)), "number");
    }
}

export class MonthConfig extends DateConfigBase {
    constructor() {
        super(
            DatePrecision.Month,
            new MonthMappings(),
            new DateParser(dateComponentParsers.slice(0, 2)), "month");
    }
}

export class DateConfig extends DateConfigBase {
    constructor() {
        super(
            DatePrecision.Date,
            new DateMappings(),
            new DateParser(dateComponentParsers.slice(0, 3)), "date");
    }
}

export class DatetimeConfig extends CalendarConfig {
    constructor() {
        super(
            CalendarMode.Both,
            DatePrecision.Minute,
            new DatetimeMappings(),
            new DateParser(dateComponentParsers), "datetime-local");
    }
}

export class TimeConfig extends CalendarConfig {
    constructor() {
        super(
            CalendarMode.TimeOnly,
            DatePrecision.Minute,
            new TimeMappings(),
            new DateParser(dateComponentParsers.slice(-2)), "time");
    }

    public updateBounds(providedDate:Date):void {
        this.dateMaxBound = Util.Date.endOf(DatePrecision.Date, Util.Date.clone(providedDate));
        this.dateMinBound = Util.Date.previous(DatePrecision.Date, Util.Date.clone(this.dateMaxBound));
    }
}
