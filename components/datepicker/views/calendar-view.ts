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
    private _highlightedItem:SuiCalendarItem;

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

        const initial = items.find(i => i.item.compareDates(i.item.date, this.renderedDate));
        if (initial) {
            this.focusItem(initial);
        }
    }

    private focusItem(item:SuiCalendarItem):void {
        this._renderedItems.forEach(i => i.hasFocus = false);
        item.hasFocus = true;

        this._highlightedItem = item;
    }

    @HostListener("document:keydown", ["$event"])
    private onDocumentKeydown(e:KeyboardEvent):void {
        const items = this._renderedItems.toArray();

        const index = items.findIndex(i => i === this._highlightedItem);

        let nextItem:SuiCalendarItem | undefined;
        let isMovingForward:boolean | undefined;

        switch (e.keyCode) {
            case KeyCode.Right:
                nextItem = items[index + 1];
                isMovingForward = true;
                break;
            case KeyCode.Left:
                nextItem = items[index - 1];
                isMovingForward = false;
                break;
            case KeyCode.Down:
                nextItem = items[index + this._calculatedColumns];
                isMovingForward = true;
                break;
            case KeyCode.Up:
                nextItem = items[index - this._calculatedColumns];
                isMovingForward = false;
                break;
        }

        if (nextItem && nextItem.item.isOutsideRange) {
            if (isMovingForward) {
                this.nextDateRange();
            } else {
                this.prevDateRange();
            }
        }

        this.focusItem(nextItem!);
    }
}
