import { Input, Output, EventEmitter } from "@angular/core";
import { ICalendarItem } from "../calendar-item";
import { DateUtils } from "../date-utils";

export abstract class CalendarView {
    public renderedItems:ICalendarItem[][];

    protected _selectedDate?:Date;
    public renderedDate:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    @Input()
    public set selectedDate(date:Date | undefined) {
        if (date) {
            this._selectedDate = DateUtils.clone(date);
        }
    }

    @Input()
    public set initialDate(date:Date | undefined) {
        if (date) {
            this.renderedDate = DateUtils.clone(date);
            this.renderItems();
        }
    }

    @Output("dateSelected")
    public onDateSelected:EventEmitter<Date>;

    @Output("zoomOut")
    public onZoomOut:EventEmitter<void>;

    constructor() {
        this.renderedDate = new Date();

        this.onDateSelected = new EventEmitter<Date>();
        this.onZoomOut = new EventEmitter<void>();
    }

    public abstract renderItems():void;

    protected group<T>(items:T[], groupLength:number):T[][] {
        const groups:T[][] = [];
        while (items.length > 0) {
            groups.push(items.splice(0, groupLength));
        }
        return groups;
    }

    public abstract nextDateRange():void;

    public abstract prevDateRange():void;

    public setDate(selected:ICalendarItem):void {
        this._selectedDate = selected.associatedDate;

        this.onDateSelected.emit(this._selectedDate);
    }

    public zoomOut():void {
        this.onZoomOut.emit();
    }
}
