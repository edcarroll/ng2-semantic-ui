import { Input, Output, EventEmitter, QueryList, ViewChildren, AfterViewInit, HostListener, HostBinding, OnDestroy } from "@angular/core";
import { CalendarItem, SuiCalendarItem } from "../directives/calendar-item";
import { Util, KeyCode } from "../../util/util";
import { CalendarService } from "../services/calendar.service";
import { Subscription } from "rxjs/Subscription";
import { DatePrecision } from "../../util/helpers/date";

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
    private _highlightedItem:CalendarItem;

    @Input()
    public set service(service:CalendarService) {
        this._service = service;
        this.service.onManualUpdate = () => {
            delete this._highlightedItem;
            this.updateItems();
        };

        this.updateItems();
    }

    public get service():CalendarService {
        return this._service;
    }

    private _rangeInterval:DatePrecision;
    private _calculatedColumns:number;
    private _calculatedRows:number;
    public get rangeLength():number {
        return this._calculatedRows * this._calculatedColumns;
    }

    public rangeStart:Date;


    public get renderedDate():Date {
        return this.service.currentDate;
    }

    public get selectedDate():Date | undefined {
        return this.service.selectedDate;
    }

    private _calculatedItems:CalendarItem[];

    public get calculatedItems():CalendarItem[] {
        return this._calculatedItems;
    }

    public set calculatedItems(items:CalendarItem[]) {
        this._calculatedItems = items;
        this.groupedItems = Util.Array.group(this.calculatedItems, this._calculatedColumns);

    }

    public get inRangeCalculatedItems():CalendarItem[] {
        return this.calculatedItems.filter(i => !i.isOutsideRange);
    }
    public groupedItems:CalendarItem[][];

    constructor(viewType:CalendarViewType, renderedRows:number, renderedColumns:number, rangeInterval:DatePrecision) {
        this._type = viewType;
        this._calculatedRows = renderedRows;
        this._calculatedColumns = renderedColumns;
        this._rangeInterval = rangeInterval;
    }

    // Date Range Calculations

    public calculateRangeStart():Date {
        return Util.Date.startOf(this._rangeInterval, Util.Date.clone(this.renderedDate));
    }

    public calculateRange(rangeStart:Date):Date[] {
        return Util.Array
            .range(this.rangeLength)
            .map(i => Util.Date.add(this._rangeInterval as number + 1, Util.Date.clone(rangeStart), i));

    }

    public calculateItems(dateRange:Date[]):CalendarItem[] {
        return dateRange.map(date => this.calculateItem(date));
    }

    public abstract calculateItem(date:Date):CalendarItem;

    private updateItems():void {
        this.calculatedItems = this.calculateItems(this.calculateRange(this.calculateRangeStart()));

        let date = this.selectedDate && this.dateInRange(this.selectedDate) ? this.selectedDate : this.renderedDate;
        if (this._highlightedItem && this.dateInRange(this._highlightedItem.date)) {
            date = this._highlightedItem.date;
        }

        const initiallyHighlighted = this.calculatedItems.find(i => i.isEqualTo(date));
        if (initiallyHighlighted && !initiallyHighlighted.isDisabled) {
            this._highlightedItem = initiallyHighlighted;
        }
    }

    private dateInRange(date:Date):boolean {
        return !!this.inRangeCalculatedItems.find(i => i.isEqualTo(date));
    }

    // Date Range Updates

    private calculateNextRangeStart():Date {
        return Util.Date.next(this._rangeInterval, Util.Date.clone(this.renderedDate));
    }

    private calculatePrevRangeStart():Date {
        return Util.Date.previous(this._rangeInterval, Util.Date.clone(this.renderedDate));
    }

    private calculateMovedRangeStart(moveForwards:boolean):Date {
        if (moveForwards) {
            return this.calculateNextRangeStart();
        }
        return this.calculatePrevRangeStart();
    }

    // DEPRECATED

    public nextDateRange():void {
        Util.Date.next(this._rangeInterval, this.renderedDate);
        this.updateItems();
    }

    public prevDateRange():void {
        Util.Date.previous(this._rangeInterval, this.renderedDate);
        this.updateItems();
    }

    // / DEPRECATED

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

    private highlightItem(item:CalendarItem):void {
        this._renderedItems.forEach(i => i.hasFocus = false);
        const rendered = this._renderedItems.find(ri => ri.item === item);
        if (rendered && !rendered.hasFocus) {
            setTimeout(() => rendered.hasFocus = true);
        }

        this._highlightedItem = item;
    }

    @HostListener("document:keydown", ["$event"])
    private onDocumentKeydown(e:KeyboardEvent):void {
        const items = this.calculatedItems;
        const itemsInRange = this.inRangeCalculatedItems;

        if (e.keyCode === KeyCode.Enter) {
            this.setDate(this._highlightedItem);
            return;
        }

        const index = items.findIndex(i => i.isEqualTo(this._highlightedItem ? this._highlightedItem.date : undefined));
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
                delta += this._calculatedColumns;
                break;
            case KeyCode.Up:
                delta -= this._calculatedColumns;
                isMovingForward = false;
                break;
            default:
                return;
        }

        let nextItem = items[index + delta];

        if (nextItem && nextItem.isDisabled) {
            return;
        }

        if (nextItem && !nextItem.isOutsideRange) {
            return this.highlightItem(nextItem);
        }

        if (nextItem && nextItem.isOutsideRange) {
            if (index + delta >= itemsInRange.length) {
                isMovingForward = true;
            }

            this._highlightedItem = nextItem;

            this.rangeStart = this.calculateMovedRangeStart(isMovingForward);
            this.updateItems();
            // this.calculatedItems = this.calculateItems(this.calculateRange(this.rangeStart));
        }

        if (!nextItem) {
            let adjustedIndex = itemsInRange.findIndex(i => i.isEqualTo(this._highlightedItem.date));

            const nextRange = this.calculateMovedRangeStart(isMovingForward);
            const nextItems = this.calculateItems(this.calculateRange(nextRange));

            const updatedItems = nextItems.filter(i => !i.isOutsideRange);
            if (isMovingForward) {
                adjustedIndex -= itemsInRange.length;
            } else {
                adjustedIndex += updatedItems.length;
            }

            nextItem = updatedItems[adjustedIndex + delta];

            if (nextItem.isDisabled) {
                return;
            }

            this.rangeStart = nextRange;
            this.calculatedItems = nextItems;

            this._highlightedItem = nextItem;
        }
    }
}
