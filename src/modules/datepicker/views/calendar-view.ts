import { Input, QueryList, ViewChildren, AfterViewInit, HostListener, Renderer2, OnDestroy } from "@angular/core";
import { KeyCode } from "../../../misc/util/internal";
import { CalendarItem, SuiCalendarItem } from "../directives/calendar-item";
import { CalendarService } from "../services/calendar.service";
import { CalendarRangeService } from "../services/calendar-range.service";

export enum CalendarViewType {
    Year = 0,
    Month = 1,
    Date = 2,
    Hour = 3,
    Minute = 4
}
export type CalendarViewResult = [Date, CalendarViewType];

export abstract class CalendarView implements AfterViewInit, OnDestroy {
    private _type:CalendarViewType;
    private _service:CalendarService;

    @ViewChildren(SuiCalendarItem)
    private _renderedItems:QueryList<SuiCalendarItem>;
    private _highlightedItem?:CalendarItem;

    @Input()
    public set service(service:CalendarService) {
        this._service = service;
        this.ranges.loadService(service);

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

    public get currentDate():Date {
        return this.service.currentDate;
    }

    public get selectedDate():Date | undefined {
        return this.service.selectedDate;
    }

    private _documentKeyDownListener:() => void;

    constructor(renderer:Renderer2, viewType:CalendarViewType, ranges:CalendarRangeService) {
        this._type = viewType;
        this.ranges = ranges;

        this._documentKeyDownListener = renderer.listen("document", "keydown", (e:KeyboardEvent) => this.onDocumentKeyDown(e));
    }

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

        this.autoHighlight();
        this.highlightItem(this._highlightedItem);
    }

    private autoHighlight():void {
        let date = this.selectedDate && this.ranges.current.containsDate(this.selectedDate) ? this.selectedDate : this.currentDate;
        if (this._highlightedItem && this.ranges.current.containsDate(this._highlightedItem.date)) {
            date = this._highlightedItem.date;
        }

        const initiallyHighlighted = this.ranges.current.items.find(i => this.ranges.dateComparer.equal(i.date, date));
        if (initiallyHighlighted && !initiallyHighlighted.isDisabled) {
            this._highlightedItem = initiallyHighlighted;
        }
    }

    private highlightItem(item:CalendarItem | undefined):void {
        if (item) {
            this._renderedItems.forEach(i => i.hasFocus = false);
            const rendered = this._renderedItems.find(ri => ri.item === item);
            if (rendered && !rendered.hasFocus) {
                rendered.hasFocus = true;
                rendered.changeDetector.detectChanges();
            }

            this._highlightedItem = item;
        }
    }

    private onDocumentKeyDown(e:KeyboardEvent):void {
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

        // Stop these keypresses being captured elsewhere.
        e.preventDefault();

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

    public ngOnDestroy():void {
        this._documentKeyDownListener();
    }
}
