import { CalendarMode } from "../services/calendar.service";
import { CalendarMappings, DatetimeMappings, DateMappings, TimeMappings, MonthMappings, YearMappings } from "./calendar-mappings";
import { IDateParser, DatetimeParser, DateParser, TimeParser, MonthParser, YearParser } from "./date-parser";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";

export abstract class CalendarConfig {
    public mode:CalendarMode;
    public mappings:CalendarMappings;
    public parser:IDateParser;

    public dateMinBound?:Date;
    public dateMaxBound?:Date;

    constructor(mode:CalendarMode, mappings:CalendarMappings, parser:IDateParser) {
        this.mode = mode;
        this.mappings = mappings;
        this.parser = parser;
    }

    public updateBounds(providedDate:Date):void {
        this.dateMinBound = Util.Date.startOf(DatePrecision.Year, new Date(), true);
        this.dateMinBound.setFullYear(0);
    }

    public postProcess(date:Date):void {}
}

export class DatetimeConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.Both, new DatetimeMappings(), new DatetimeParser());
    }
}

export class DateConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.DateOnly, new DateMappings(), new DateParser());
    }

    public postProcess(date:Date):void {
        Util.Date.rewriteTimezone(date);
    }
}

export class TimeConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.TimeOnly, new TimeMappings(), new TimeParser());
    }

    public updateBounds(providedDate:Date):void {
        this.dateMaxBound = Util.Date.endOf(DatePrecision.Date, Util.Date.clone(providedDate));
        this.dateMinBound = Util.Date.previous(DatePrecision.Date, Util.Date.clone(this.dateMaxBound));
    }
}

export class MonthConfig extends DateConfig {
    constructor() {
        super();
        this.mappings = new MonthMappings();
        this.parser = new MonthParser();
    }
}

export class YearConfig extends DateConfig {
    constructor() {
        super();
        this.mappings = new YearMappings();
        this.parser = new YearParser();
    }
}
