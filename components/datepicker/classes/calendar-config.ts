import { CalendarMode } from "../services/calendar.service";
import { CalendarMappings, DatetimeMappings, DateMappings, TimeMappings, MonthMappings, YearMappings } from "./calendar-mappings";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";

export class CalendarConfig {
    public mode:CalendarMode;
    public mappings:CalendarMappings;

    public dateMinBound?:Date;
    public dateMaxBound?:Date;

    constructor(mode:CalendarMode, mappings:CalendarMappings) {
        this.mode = mode;
        this.mappings = mappings;
    }

    public updateBounds(providedDate?:Date):void {}

    public postProcess(date:Date):void {}
}

export class DatetimeConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.Both, new DatetimeMappings());
    }
}

export class DateConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.DateOnly, new DateMappings());
    }

    public postProcess(date:Date):void {
        Util.Date.startOf(DatePrecision.Date, date, true);
        Util.Date.rewriteTimezone(date);
    }
}

export class TimeConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.TimeOnly, new TimeMappings());
    }

    public updateBounds(providedDate?:Date):void {
        if (!providedDate) {
            return;
        }

        this.dateMinBound = Util.Date.startOf(DatePrecision.Date, Util.Date.clone(providedDate), true);
        this.dateMaxBound = Util.Date.endOf(DatePrecision.Date, Util.Date.clone(providedDate));
    }
}

export class MonthConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.DateOnly, new MonthMappings());
    }

    public postProcess(date:Date):void {
        Util.Date.startOf(DatePrecision.Month, date, true);
        Util.Date.rewriteTimezone(date);
    }
}

export class YearConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.DateOnly, new YearMappings());
    }

    public postProcess(date:Date):void {
        Util.Date.startOf(DatePrecision.Year, date, true);
        Util.Date.rewriteTimezone(date);
    }
}
