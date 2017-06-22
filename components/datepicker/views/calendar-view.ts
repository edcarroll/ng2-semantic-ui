import { Input, Output, EventEmitter, QueryList, ViewChildren, AfterViewInit, HostListener, HostBinding, OnDestroy } from "@angular/core";
import { CalendarItem, SuiCalendarItem } from "../directives/calendar-item";
import { Util, KeyCode } from "../../util/util";
import { CalendarService } from "../services/calendar.service";
import { Subscription } from "rxjs/Subscription";
import { DatePrecision } from "../../util/helpers/date";
import { CalendarRangeService } from "../services/calendar-range.service";

export enum CalendarViewType {
    Year = 0,
    Month = 1,
    Date = 2,
    Hour = 3,
    Minute = 4
}
export type CalendarViewResult = [Date, CalendarViewType];

export abstract class CalendarView implements AfterViewInit {
    private _type:CalendarViewType;
    private _service:CalendarService;

    @ViewChildren(SuiCalendarItem)
    private _renderedItems:QueryList<SuiCalendarItem>;
    private _highlightedItem?:CalendarItem;

    @Input()
    public set service(service:CalendarService) {
        this._service = service;
        this.ranges.loadService(service);
        this.autoHighlight();

        this.service.onManualUpdate = () => {
            this.ranges.refresh();

            delete this._highlightedItem;
            this.autoHighlight();
        };
    }

    public get service():CalendarService {
        return this._service;
    }

    public ranges:CalendarRangeService;

    public get renderedDate():Date {
        return this.service.currentDate;
    }

    public get selectedDate():Date | undefined {
        return this.service.selectedDate;
    }

    constructor(viewType:CalendarViewType, renderedRows:number, renderedColumns:number, rangeInterval:DatePrecision) {
        this._type = viewType;
        this.ranges = new CalendarRangeService(rangeInterval, renderedRows, renderedColumns);

        this.ranges.registerCalculators(
            d => this.calculateRangeStart(d),
            s => this.calculateRange(s),
            (ds, b) => this.calculateItems(ds, b));
    }

    // Date Range Calculations

    public calculateRangeStart(date:Date):Date {
        return Util.Date.startOf(this.ranges.interval, Util.Date.clone(date));
    }

    public calculateRange(rangeStart:Date):Date[] {
        return Util.Array
            .range(this.ranges.length)
            .map(i => Util.Date.add(this.ranges.interval as number + 1, Util.Date.clone(rangeStart), i));

    }

    public calculateItems(dateRange:Date[], baseDate:Date):CalendarItem[] {
        return dateRange.map(date => this.calculateItem(date, baseDate));
    }

    public abstract calculateItem(date:Date, baseDate:Date):CalendarItem;

    // Template Methods

    public setDate(item:CalendarItem):void {
        this.service.changeDate(item.date, this._type);
    }

    public zoomOut():void {
        this.service.zoomOut(this._type);
    }

    // Keyboard Control

    public ngAfterViewInit():void {
        this._renderedItems.changes.subscribe(() => this.onRenderedItemsChanged());
        this.onRenderedItemsChanged();
    }

    private onRenderedItemsChanged():void {
        this._renderedItems.forEach(i =>
            i.onFocussed.subscribe((hasFocus:boolean) => {
                if (hasFocus) {
                    this.highlightItem(i.item);
                }
            }));

        this.highlightItem(this._highlightedItem);
    }

    private autoHighlight():void {
        let date = this.selectedDate && this.ranges.current.containsDate(this.selectedDate) ? this.selectedDate : this.renderedDate;
        if (this._highlightedItem && this.ranges.current.containsDate(this._highlightedItem.date)) {
            date = this._highlightedItem.date;
        }

        const initiallyHighlighted = this.ranges.current.items.find(i => i.isEqualTo(date));
        if (initiallyHighlighted && !initiallyHighlighted.isDisabled) {
            this._highlightedItem = initiallyHighlighted;
        }
    }

    private highlightItem(item:CalendarItem | undefined):void {
        if (item) {
            this._renderedItems.forEach(i => i.hasFocus = false);
            const rendered = this._renderedItems.find(ri => ri.item === item);
            if (rendered && !rendered.hasFocus) {
                setTimeout(() => rendered.hasFocus = true);
            }

            this._highlightedItem = item;
        }
    }

    @HostListener("document:keydown", ["$event"])
    private onDocumentKeydown(e:KeyboardEvent):void {
        if (this._highlightedItem && e.keyCode === KeyCode.Enter) {
            this.setDate(this._highlightedItem);
            return;
        }

        if (!this._highlightedItem) {
            this.autoHighlight();
        }

        const index = this.ranges.current.findIndex(this._highlightedItem);
        let isMovingForward = true;
        let delta = 0;

        switch (e.keyCode) {
            case KeyCode.Right:
                delta += 1;
                break;
            case KeyCode.Left:
                delta -= 1;
                isMovingForward = false;
                break;
            case KeyCode.Down:
                delta += this.ranges.columns;
                break;
            case KeyCode.Up:
                delta -= this.ranges.columns;
                isMovingForward = false;
                break;
            default:
                return;
        }

        let nextItem = this.ranges.current.items[index + delta];

        if (nextItem && nextItem.isDisabled) {
            return;
        }

        if (nextItem && !nextItem.isOutsideRange) {
            return this.highlightItem(nextItem);
        }

        if (nextItem && nextItem.isOutsideRange) {
            if (index + delta >= this.ranges.current.inRange.length) {
                isMovingForward = true;
            }
        }

        if (!nextItem) {
            let adjustedIndex = this.ranges.current.findIndex(this._highlightedItem);

            const nextItems = this.ranges.calc(isMovingForward).inRange;

            if (isMovingForward) {
                adjustedIndex -= this.ranges.current.inRange.length;
            } else {
                adjustedIndex += nextItems.length;
            }

            nextItem = nextItems[adjustedIndex + delta];

            if (nextItem.isDisabled) {
                return;
            }
        }

        this.ranges.move(isMovingForward);
        this._highlightedItem = this.ranges.current.find(nextItem);
    }
}
