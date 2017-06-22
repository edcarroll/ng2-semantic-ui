import { CalendarViewType } from "../views/calendar-view";

export type CalendarMapping = Map<CalendarViewType, CalendarViewType>;

export abstract class CalendarMappings {
    public initialView:CalendarViewType;
    public initialDateView:CalendarViewType;
    public finalView:CalendarViewType;
    public changed:CalendarMapping;
    public zoom:CalendarMapping;
}

export class DateMappings extends CalendarMappings {
    constructor() {
        super();

        this.initialView = CalendarViewType.Year;
        this.initialDateView = CalendarViewType.Date;
        this.finalView = CalendarViewType.Date;

        this.changed = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Date],
            [CalendarViewType.Date, CalendarViewType.Date]
        ]);

        this.zoom = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Year, CalendarViewType.Date],
            [CalendarViewType.Month, CalendarViewType.Year],
            [CalendarViewType.Date, CalendarViewType.Month]
        ]);
    }
}

export class TimeMappings extends CalendarMappings {
    constructor() {
        super();
        this.initialView = CalendarViewType.Hour;
        this.initialDateView = CalendarViewType.Minute;
        this.finalView = CalendarViewType.Minute;

        this.changed = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Minute]
        ]);

        this.zoom = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Hour]
        ]);
    }
}

export class DatetimeMappings extends CalendarMappings {
    constructor() {
        super();
        this.initialView = CalendarViewType.Year;
        this.initialDateView = CalendarViewType.Minute;
        this.finalView = CalendarViewType.Minute;

        this.changed = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Date],
            [CalendarViewType.Date, CalendarViewType.Hour],
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Minute]
        ]);

        this.zoom = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Year, CalendarViewType.Date],
            [CalendarViewType.Month, CalendarViewType.Year],
            [CalendarViewType.Date, CalendarViewType.Month],
            [CalendarViewType.Hour, CalendarViewType.Date],
            [CalendarViewType.Minute, CalendarViewType.Date]
        ]);
    }
}
