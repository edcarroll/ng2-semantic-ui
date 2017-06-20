import { Input, Output, EventEmitter, QueryList, ViewChildren, AfterViewInit, HostListener } from "@angular/core";
import { CalendarDateItem, SuiCalendarItem } from "../directives/calendar-item";
import { Util, KeyCode } from "../../util/util";
import { CalendarService } from "../services/calendar.service";

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

    private _service:CalendarService | undefined;

    @ViewChildren(SuiCalendarItem)
    private _renderedItems:QueryList<SuiCalendarItem>;
    private _highlightedItem:CalendarDateItem;

    @Input()
    public set service(service:CalendarService | undefined) {
        if (service) {
            this._service = service;

            this.calculateItems();
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
    public calculatedItems:CalendarDateItem[][];

    constructor(viewType:CalendarViewType, renderedColumns:number) {
        this._type = viewType;
        this._calculatedColumns = renderedColumns;
    }

    public abstract calculateItems():void;

    public abstract nextDateRange():void;

    public abstract prevDateRange():void;

    public setDate(selected:CalendarDateItem):void {
        if (this._service) {
            this._service.changeDate(selected.date, this._type);

            this.calculateItems();
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
        const items = this._renderedItems.toArray();
        items.forEach(i => i.onFocussed.subscribe((hasFocus:boolean) => {
            if (hasFocus) {
                this.focusItem(i);
            }
        }));

        if (this._highlightedItem) {
            const highlighted = items.find(i => i.item.compareDates(i.item.date, this._highlightedItem.date));
            if (highlighted) {
                this.focusItem(highlighted);
            }
        } else {
            const initial = items.find(i => i.item.compareDates(i.item.date, this.renderedDate));
            if (initial) {
                this.focusItem(initial);
            }
        }

    }

    private focusItem(item:SuiCalendarItem):void {
        this._renderedItems.forEach(i => i.hasFocus = false);
        item.hasFocus = true;

        this._highlightedItem = item.item;
    }

    @HostListener("document:keydown", ["$event"])
    private onDocumentKeydown(e:KeyboardEvent):void {
        const items = this._renderedItems.filter(i => !i.item.isOutsideRange);
        const highlightedIndex = items.findIndex(i => i.item === this._highlightedItem);
        const highlightedItem = items[highlightedIndex];

        let nextIndex:number | undefined;
        let isMovingForward:boolean | undefined;

        switch (e.keyCode) {
            case KeyCode.Enter:
                this.setDate(highlightedItem.item);
                return;
            case KeyCode.Right:
                nextIndex = highlightedIndex + 1;
                isMovingForward = true;
                break;
            case KeyCode.Left:
                nextIndex = highlightedIndex - 1;
                isMovingForward = false;
                break;
            case KeyCode.Down:
                nextIndex = highlightedIndex + this._calculatedColumns;
                isMovingForward = true;
                break;
            case KeyCode.Up:
                nextIndex = highlightedIndex - this._calculatedColumns;
                isMovingForward = false;
                break;
        }

        if (nextIndex == undefined) {
            return;
        }

        if (nextIndex != undefined && (nextIndex < 0 || nextIndex >= items.length)) {

            if (isMovingForward) {
                this.nextDateRange();
                nextIndex -= items.length;
            } else {
                this.prevDateRange();
            }

            const newItems = Util.Array
                .flatten(this.calculatedItems)
                .filter(i => !i.isOutsideRange);

            if (!isMovingForward) {
                nextIndex += newItems.length;
            }

            this._highlightedItem = newItems[nextIndex];

            return;
        }

        const nextItem = items[nextIndex];
        this.focusItem(nextItem);
    }
}
