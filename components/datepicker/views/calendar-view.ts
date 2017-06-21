import { Input, Output, EventEmitter, QueryList, ViewChildren, AfterViewInit, HostListener, HostBinding, OnDestroy } from "@angular/core";
import { CalendarItem, SuiCalendarItem } from "../directives/calendar-item";
import { Util, KeyCode } from "../../util/util";
import { CalendarService } from "../services/calendar.service";
import { Subscription } from "rxjs/Subscription";

export enum CalendarViewType {
    Year = 0,
    Month = 1,
    Date = 2,
    Hour = 3,
    Minute = 4
}
export type CalendarViewResult = [Date, CalendarViewType];

export abstract class CalendarView implements AfterViewInit, OnDestroy {
    @HostBinding("class.ui")
    // @HostBinding("class.active")
    @HostBinding("class.calendar")
    private _calendarClasses:boolean;

    private _type:CalendarViewType;

    private _service:CalendarService | undefined;
    private _updateSub:Subscription | undefined;

    @ViewChildren(SuiCalendarItem)
    private _renderedItems:QueryList<SuiCalendarItem>;
    private _highlightedItem:CalendarItem;

    @Input()
    public set service(service:CalendarService | undefined) {
        if (service) {
            this._service = service;
            this._updateSub = this._service.onManualUpdate.subscribe(() => {
                delete this._highlightedItem;
                console.log(this._service);
                this.updateItems();
            });

            this.updateItems();
        }
    }

    public get renderedDate():Date {
        if (this._service) {
            return this._service.currentDate;
        }
        return new Date();
    }

    public get selectedDate():Date | undefined {
        if (this._service) {
            return this._service.selectedDate;
        }
    }

    private _calculatedColumns:number;
    public calculatedItems:CalendarItem[];
    public groupedItems:CalendarItem[][];

    constructor(viewType:CalendarViewType, renderedColumns:number) {
        this._type = viewType;
        this._calculatedColumns = renderedColumns;

        this.calculatedItems = [];
        this.groupItems();

        this._calendarClasses = true;
    }

    public updateItems():void {
        this.calculateItems();
        this.groupItems();

        let date = this.renderedDate;
        if (this._highlightedItem) {
            date = this._highlightedItem.date;
        }

        const initiallyHighlighted = this.calculatedItems.find(i => i.compareDates(date));
        if (initiallyHighlighted) {
            this._highlightedItem = initiallyHighlighted;
        }
    }

    public abstract calculateItems():void;

    public groupItems():void {
        this.groupedItems = Util.Array.group(this.calculatedItems, this._calculatedColumns);
    }

    private updateDateRange(moveForwards:boolean = true):void {
        if (moveForwards) {
            return this.nextDateRange();
        }
        return this.prevDateRange();
    }

    public abstract nextDateRange():void;

    public abstract prevDateRange():void;

    public setDate(item:CalendarItem):void {
        if (this._service) {
            this._service.changeDate(item.date, this._type);

            this.updateItems();
        }
    }

    public zoomOut():void {
        if (this._service) {
            this._service.zoomOut(this._type);
        }
    }

    public ngAfterViewInit():void {
        this._renderedItems.changes.subscribe(() => this.onRenderedItemsChanged());
        this.onRenderedItemsChanged();
    }

    private onRenderedItemsChanged():void {
        this._renderedItems.forEach(i =>
            i.onFocussed.subscribe((hasFocus:boolean) => {
                if (hasFocus) {
                    this.focusItem(i.item);
                }
            }));

        this.focusItem(this._highlightedItem);
    }

    private focusItem(item:CalendarItem):void {
        this._renderedItems.forEach(i => i.hasFocus = false);
        const rendered = this._renderedItems.find(ri => ri.item === item);
        if (rendered) {
            rendered.hasFocus = true;
        }

        this._highlightedItem = item;
    }

    @HostListener("document:keydown", ["$event"])
    private onDocumentKeydown(e:KeyboardEvent):void {
        const items = this.calculatedItems;
        const itemsInRange = items.filter(i => !i.isOutsideRange);

        if (e.keyCode === KeyCode.Enter) {
            this.setDate(this._highlightedItem);
            return;
        }

        const index = items.findIndex(i => i.compareDates(this._highlightedItem.date));
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
        }

        const nextItem = items[index + delta];

        if (nextItem && !nextItem.isOutsideRange) {
            return this.focusItem(nextItem);
        }

        if (nextItem && nextItem.isOutsideRange) {
            if (index + delta >= itemsInRange.length) {
                isMovingForward = true;
            }

            this._highlightedItem = nextItem;

            this.updateDateRange(isMovingForward);
        }

        if (!nextItem) {
            let adjustedIndex = itemsInRange.findIndex(i => i.compareDates(this._highlightedItem.date));

            this.updateDateRange(isMovingForward);
            const updatedItems = this.calculatedItems.filter(i => !i.isOutsideRange);

            if (isMovingForward) {
                adjustedIndex -= itemsInRange.length;
            } else {
                adjustedIndex += updatedItems.length;
            }

            this._highlightedItem = updatedItems[adjustedIndex + delta];
        }
    }

    public ngOnDestroy():void {
        if (this._updateSub) {
            this._updateSub.unsubscribe();
        }
    }
}
