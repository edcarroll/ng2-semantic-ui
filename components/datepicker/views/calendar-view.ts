import { Input, Output, EventEmitter } from "@angular/core";
import { CalendarDateItem } from "../calendar-item";
import { Util } from "../../util/util";

export type CalendarViewType = "year" | "month" | "date" | "hour" | "minute";
export type CalendarViewResult = [Date, CalendarViewType];

export abstract class CalendarView {
    private _type:CalendarViewType;

    public renderedItems:CalendarDateItem[][];

    protected _selectedDate?:Date;
    public renderedDate:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    @Input()
    public set selectedDate(date:Date | undefined) {
        if (date) {
            this._selectedDate = Util.Date.clone(date);
        }
    }

    @Input()
    public set initialDate(date:Date | undefined) {
        if (date) {
            this.renderedDate = Util.Date.clone(date);
            this.renderItems();
        }
    }

    @Output("dateSelected")
    public onDateSelected:EventEmitter<CalendarViewResult>;

    @Output("zoomOut")
    public onZoomOut:EventEmitter<CalendarViewType>;

    constructor(viewType:CalendarViewType) {
        this._type = viewType;

        this.renderedDate = new Date();

        this.onDateSelected = new EventEmitter<CalendarViewResult>();
        this.onZoomOut = new EventEmitter<CalendarViewType>();
    }

    public abstract renderItems():void;

    public abstract nextDateRange():void;

    public abstract prevDateRange():void;

    public setDate(selected:CalendarDateItem):void {
        this._selectedDate = selected.date;

        this.onDateSelected.emit([this._selectedDate, this._type]);
    }

    public zoomOut():void {
        this.onZoomOut.emit(this._type);
    }
}
