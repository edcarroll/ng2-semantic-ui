import { Input, Output, EventEmitter } from "@angular/core";
import { CalendarDateItem } from "../calendar-item";
import { Util } from "../../util/util";

export abstract class CalendarView {
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
    public onDateSelected:EventEmitter<Date>;

    @Output("zoomOut")
    public onZoomOut:EventEmitter<void>;

    constructor() {
        this.renderedDate = new Date();

        this.onDateSelected = new EventEmitter<Date>();
        this.onZoomOut = new EventEmitter<void>();
    }

    public abstract renderItems():void;

    public abstract nextDateRange():void;

    public abstract prevDateRange():void;

    public setDate(selected:CalendarDateItem):void {
        this._selectedDate = selected.date;

        this.onDateSelected.emit(this._selectedDate);
    }

    public zoomOut():void {
        this.onZoomOut.emit();
    }
}
