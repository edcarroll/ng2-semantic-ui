import { DatePrecision } from "../../../misc/util/index";
import { CalendarItem } from "../directives/calendar-item";
import { CalendarService } from "./calendar.service";
import { DateComparer } from "../classes/date-comparer";
export declare class CalendarRange {
    start: Date;
    dates: Date[];
    items: CalendarItem[];
    readonly inRange: CalendarItem[];
    groupedItems: CalendarItem[][];
    private _comparer;
    constructor(start: Date, dates: Date[], items: CalendarItem[], grouped: CalendarItem[][], comparer: DateComparer);
    find(item: CalendarItem): CalendarItem | undefined;
    findIndex(item: CalendarItem | undefined): number;
    containsDate(date: Date): boolean;
}
export declare abstract class CalendarRangeService {
    previous: CalendarRange;
    current: CalendarRange;
    next: CalendarRange;
    service: CalendarService;
    interval: DatePrecision;
    marginal: DatePrecision;
    rows: number;
    columns: number;
    readonly dateComparer: DateComparer;
    readonly length: number;
    readonly canMoveNext: boolean;
    readonly canMovePrevious: boolean;
    constructor(interval: DatePrecision, rows: number, columns: number);
    loadService(service: CalendarService): void;
    refresh(): void;
    move(forwards: boolean): void;
    moveNext(): void;
    movePrevious(): void;
    calc(forwards: boolean): CalendarRange;
    private calcRange(startDate);
    protected calcStart(date: Date): Date;
    protected calcDates(rangeStart: Date): Date[];
    protected calcItems(dateRange: Date[], baseDate: Date): CalendarItem[];
    protected abstract configureItem(item: CalendarItem, baseDate: Date): void;
}
