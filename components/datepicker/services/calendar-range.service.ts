import { CalendarItem } from "../directives/calendar-item";
import { DatePrecision } from "../../util/helpers/date";
import { Util } from "../../util/util";

export class CalendarRange {
    public start:Date;
    public dates:Date[];
    public items:CalendarItem[];
    public get itemsInRange():CalendarItem[] {
        return this.items.filter(i => !i.isOutsideRange);
    }
    public groupedItems:CalendarItem[][];

    constructor(start:Date, dates:Date[], items:CalendarItem[], grouped:CalendarItem[][]) {
        this.start = start;
        this.dates = dates;
        this.items = items;
        this.groupedItems = grouped;
    }

    public find(item:CalendarItem):CalendarItem {
        return this.items.find(i => i.isEqualTo(item.date));
    }

    public containsDate(date:Date):boolean {
        return !!this.itemsInRange.find(i => i.isEqualTo(date));
    }
}

export class CalendarRangeService {
    public previous:CalendarRange;
    public current:CalendarRange;
    public next:CalendarRange;

    public interval:DatePrecision;
    public rows:number;
    public columns:number;

    public get length():number {
        return this.rows * this.columns;
    }

    public currentDate:Date;

    constructor(interval:DatePrecision, rows:number, columns:number) {
        this.interval = interval;
        this.rows = rows;
        this.columns = columns;
    }

    public registerCalculators(start:(date:Date) => Date,
                               dates:(start:Date) => Date[],
                               items:(dates:Date[], baseDate:Date) => CalendarItem[]):void {

        this.calcStart = start;
        this.calcDates = dates;
        this.calcItems = items;
    }

    public refresh(currentDate?:Date):void {
        if (currentDate) {
            this.currentDate = currentDate;
        }

        this.current = this.calcRange(this.currentDate);

        this.next = this.calcRange(Util.Date.next(this.interval, Util.Date.clone(this.currentDate)));
        this.previous = this.calcRange(Util.Date.previous(this.interval, Util.Date.clone(this.currentDate)));
    }

    public move(forwards:boolean):void {
        if (forwards) {
            return this.moveNext();
        }
        return this.movePrevious();
    }

    public moveNext():void {
        Util.Date.next(this.interval, this.currentDate);
        this.previous = this.current;
        this.current = this.next;
        this.next = this.calcRange(Util.Date.next(this.interval, Util.Date.clone(this.currentDate)));
    }

    public movePrevious():void {
        Util.Date.previous(this.interval, this.currentDate);
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.calcRange(Util.Date.previous(this.interval, Util.Date.clone(this.currentDate)));
    }

    public calc(forwards:boolean):CalendarRange {
        if (forwards) {
            return this.next;
        }
        return this.previous;
    }

    private calcRange(startDate:Date):CalendarRange {
        const start = this.calcStart(startDate);
        const dates = this.calcDates(start);
        const items = this.calcItems(dates, startDate);

        return new CalendarRange(start, dates, items, Util.Array.group(items, this.columns));
    }

    private calcStart(date:Date):Date {
        return date;
    }

    private calcDates(rangeStart:Date):Date[] {
        return [];
    }

    private calcItems(dateRange:Date[], baseDate:Date):CalendarItem[] {
        return [];
    }
}
