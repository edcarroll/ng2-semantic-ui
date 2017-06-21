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

    private updateDateRange(moveForwards:boolean = true):void {
        if (moveForwards) {
            return this.nextDateRange();
        }
        return this.prevDateRange();
    }

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
                this.focusItem(i.item);
            }
        }));

        if (this._highlightedItem) {
            const highlighted = items.find(i => i.item.compareDates(i.item.date, this._highlightedItem.date));
            if (highlighted) {
                this.focusItem(highlighted.item);
            }
        } else {
            const initial = items.find(i => i.item.compareDates(i.item.date, this.renderedDate));
            if (initial) {
                this.focusItem(initial.item);
            }
        }

    }

    private focusItem(item:CalendarDateItem):void {
        this._renderedItems.forEach(i => i.hasFocus = false);
        const rendered = this._renderedItems.find(ri => ri.item.compareDates(ri.item.date, item.date));
        if (rendered) {
            rendered.hasFocus = true;
        }

        this._highlightedItem = item;
    }

    @HostListener("document:keydown", ["$event"])
    private onDocumentKeydown(e:KeyboardEvent):void {
        const items = this._renderedItems.toArray();
        const itemsInRange = items.filter(i => !i.item.isOutsideRange);

        if (e.keyCode === KeyCode.Enter) {
            this.setDate(this._highlightedItem);
            return;
        }

        const index = items.findIndex(i => i.item === this._highlightedItem);
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

        let nextItem:CalendarDateItem | undefined;
        if (items[index + delta]) {
            nextItem = items[index + delta].item;
        }

        if (nextItem && nextItem.isOutsideRange) {
            if (index + delta >= itemsInRange.length) {
                isMovingForward = true;
            }

            this.updateDateRange(isMovingForward);
        }

        if (!nextItem) {
            let adjustedIndex = itemsInRange.findIndex(i => i.item === this._highlightedItem);

            this.updateDateRange(isMovingForward);
            const updatedItems = Util.Array.flatten(this.calculatedItems).filter(i => !i.isOutsideRange);

            if (isMovingForward) {
                adjustedIndex -= itemsInRange.length;
            } else {
                adjustedIndex += updatedItems.length;
            }

            nextItem = updatedItems[adjustedIndex + delta];
        }

        this.focusItem(nextItem);
    }
}
