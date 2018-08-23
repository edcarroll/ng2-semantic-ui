import { DatePrecision, DateUtil, Util } from "../../../misc/util/internal";
import { CalendarItem } from "../directives/calendar-item";
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
    private _comparer:DateComparer;

    constructor(start:Date, dates:Date[], items:CalendarItem[], grouped:CalendarItem[][], comparer:DateComparer) {
        this.start = start;
        this.dates = dates;
        this.items = items;
        this.groupedItems = grouped;
        this._comparer = comparer;
    }

    public find(item:CalendarItem):CalendarItem | undefined {
        return this.items.find(i => this._comparer.equal(i.date, item.date));
    }

    public findIndex(item:CalendarItem | undefined):number {
        if (!item) {
            return -1;
        }
        return this.items.findIndex(i => this._comparer.equal(i.date, item.date));
    }

    public containsDate(date:Date):boolean {
        return !!this.inRange.find(i => this._comparer.equal(i.date, date));
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

    public get dateComparer():DateComparer {
        return new DateComparer(this.marginal, this.service.inFinalView);
    }

    public get length():number {
        return this.rows * this.columns;
    }

    public get canMoveNext():boolean {
        const firstItem = this.next.inRange[0];
        if (firstItem && this.service.maxDate) {
            return firstItem.date <= this.service.maxDate;
        }
        return true;
    }

    public get canMovePrevious():boolean {
        const lastItem = this.previous.inRange.slice(-1).pop();
        if (lastItem && this.service.minDate) {
            return lastItem.date >= this.service.minDate;
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

        this.next = this.calcRange(DateUtil.next(this.interval, DateUtil.clone(this.service.currentDate)));
        this.previous = this.calcRange(DateUtil.previous(this.interval, DateUtil.clone(this.service.currentDate)));
    }

    public move(forwards:boolean):void {
        if (forwards) {
            return this.moveNext();
        }
        return this.movePrevious();
    }

    public moveNext():void {
        DateUtil.next(this.interval, this.service.currentDate);
        this.previous = this.current;
        this.current = this.next;
        this.next = this.calcRange(DateUtil.next(this.interval, DateUtil.clone(this.service.currentDate)));
    }

    public movePrevious():void {
        DateUtil.previous(this.interval, this.service.currentDate);
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.calcRange(DateUtil.previous(this.interval, DateUtil.clone(this.service.currentDate)));
    }

    public calc(forwards:boolean):CalendarRange {
        if (forwards) {
            return this.next;
        }
        return this.previous;
    }

    private calcRange(startDate:Date):CalendarRange {
        const start = this.calcStart(startDate);
        if (this.service.inFinalView) {
            DateUtil.startOf(this.marginal, start, true);
        }
        const dates = this.calcDates(start);
        const items = this.calcItems(dates, startDate);

        return new CalendarRange(start, dates, items, Util.Array.group(items, this.columns), this.dateComparer);
    }

    protected calcStart(date:Date):Date {
        return DateUtil.startOf(this.interval, DateUtil.clone(date));
    }

    protected calcDates(rangeStart:Date):Date[] {
        return Util.Array
            .range(this.length)
            .map(i => DateUtil.add(this.marginal, DateUtil.clone(rangeStart), i));

    }

    protected calcItems(dateRange:Date[], baseDate:Date):CalendarItem[] {
        return dateRange.map(date => {
            const item = new CalendarItem(date);

            item.isDisabled = !this.dateComparer.between(item.date, this.service.minDate, this.service.maxDate);
            item.isActive = this.dateComparer.equal(item.date, this.service.selectedDate);
            item.isToday = this.dateComparer.equal(item.date, new Date());
            item.isSelectable = item.isDisabled;

            this.configureItem(item, baseDate);

            return item;
        });
    }

    protected abstract configureItem(item:CalendarItem, baseDate:Date):void;
}
