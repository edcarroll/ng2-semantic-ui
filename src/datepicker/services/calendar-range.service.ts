import { CalendarItem } from "../directives/calendar-item";
import { DatePrecision } from "../../util/helpers/date";
import { Util } from "../../util/util";
import { CalendarService } from "./calendar.service";
import { DateComparer } from "../classes/date-comparer";

export class CalendarRange {
    public start:Date;
    public dates:Date[];
    public items:CalendarItem[];
    public get inRange():CalendarItem[] {
        return this.items.filter(i => !i.isOutsideRange);
    }
    public groupedItems:CalendarItem[][];

    constructor(start:Date, dates:Date[], items:CalendarItem[], grouped:CalendarItem[][]) {
        this.start = start;
        this.dates = dates;
        this.items = items;
        this.groupedItems = grouped;
    }

    public find(item:CalendarItem):CalendarItem | undefined {
        return this.items.find(i => i.isEqualTo(item.date));
    }

    public findIndex(item:CalendarItem | undefined):number {
        if (!item) {
            return -1;
        }
        return this.items.findIndex(i => i.isEqualTo(item.date));
    }

    public containsDate(date:Date):boolean {
        return !!this.inRange.find(i => i.isEqualTo(date));
    }
}

export abstract class CalendarRangeService {
    public previous:CalendarRange;
    public current:CalendarRange;
    public next:CalendarRange;

    public service:CalendarService;

    public interval:DatePrecision;
    public marginal:DatePrecision;
    public rows:number;
    public columns:number;

    public get length():number {
        return this.rows * this.columns;
    }

    public get canMoveNext():boolean {
        const firstItem = this.next.inRange[0];
        if (firstItem && this.service.maxDate) {
            return firstItem.date < this.service.maxDate;
        }
        return true;
    }

    public get canMovePrevious():boolean {
        const lastItem = this.previous.inRange.slice(-1).pop();
        if (lastItem && this.service.minDate) {
            return lastItem.date > this.service.minDate;
        }
        return true;
    }

    constructor(interval:DatePrecision, rows:number, columns:number) {
        this.interval = interval;
        this.marginal = interval as number + 1;
        this.rows = rows;
        this.columns = columns;
    }

    public loadService(service:CalendarService):void {
        this.service = service;

        this.refresh();
    }

    public refresh():void {
        this.current = this.calcRange(this.service.currentDate);

        this.next = this.calcRange(Util.Date.next(this.interval, Util.Date.clone(this.service.currentDate)));
        this.previous = this.calcRange(Util.Date.previous(this.interval, Util.Date.clone(this.service.currentDate)));
    }

    public move(forwards:boolean):void {
        if (forwards) {
            return this.moveNext();
        }
        return this.movePrevious();
    }

    public moveNext():void {
        Util.Date.next(this.interval, this.service.currentDate);
        this.previous = this.current;
        this.current = this.next;
        this.next = this.calcRange(Util.Date.next(this.interval, Util.Date.clone(this.service.currentDate)));
    }

    public movePrevious():void {
        Util.Date.previous(this.interval, this.service.currentDate);
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.calcRange(Util.Date.previous(this.interval, Util.Date.clone(this.service.currentDate)));
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

    protected calcStart(date:Date):Date {
        return Util.Date.startOf(this.interval, Util.Date.clone(date));
    }

    protected calcDates(rangeStart:Date):Date[] {
        return Util.Array
            .range(this.length)
            .map(i => Util.Date.add(this.marginal, Util.Date.clone(rangeStart), i));

    }

    protected calcItems(dateRange:Date[], baseDate:Date):CalendarItem[] {
        return dateRange.map(date => this.calcItem(date, baseDate, new DateComparer(this.marginal, date)));
    }

    public abstract calcItem(date:Date, baseDate:Date, comparer:DateComparer):CalendarItem;
}
