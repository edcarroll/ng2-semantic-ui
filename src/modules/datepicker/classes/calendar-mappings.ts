import { CalendarViewType } from "../views/calendar-view";

export type CalendarMapping<T = CalendarViewType> = Map<CalendarViewType, T>;

export abstract class CalendarMappings {
    public finalView:CalendarViewType;
    public changed:CalendarMapping;
    public zoom:CalendarMapping;

    protected _initialView:CalendarViewType;

    public get initialView():CalendarViewType {
        return this._initialView;
    }
    public set initialView(view:CalendarViewType) {
        if (this.changed && this.changed.has(view)) {
            this._initialView = view;
        }
    }
}

export class DateMappings extends CalendarMappings {
    constructor() {
        super();

        this._initialView = CalendarViewType.Date;
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

        this._initialView = CalendarViewType.Hour;
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

        this._initialView = CalendarViewType.Date;
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

export class MonthMappings extends CalendarMappings {
    constructor() {
        super();

        this._initialView = CalendarViewType.Month;
        this.finalView = CalendarViewType.Month;

        this.changed = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Month]
        ]);

        this.zoom = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Year]
        ]);
    }
}

export class YearMappings extends CalendarMappings {
    constructor() {
        super();

        this._initialView = CalendarViewType.Year;
        this.finalView = CalendarViewType.Year;

        this.changed = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Year, CalendarViewType.Year]
        ]);

        this.zoom = new Map<CalendarViewType, CalendarViewType>([
            [CalendarViewType.Year, CalendarViewType.Year]
        ]);
    }
}
