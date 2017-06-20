import { Input, Output, EventEmitter } from "@angular/core";
import { CalendarDateItem } from "../directives/calendar-item";
import { Util } from "../../util/util";
import { CalendarService } from "../services/calendar.service";

export enum CalendarViewType {
    Year = 0,
    Month = 1,
    Date = 2,
    Hour = 3,
    Minute = 4
}
export type CalendarViewResult = [Date, CalendarViewType];

export abstract class CalendarView {
    private _type:CalendarViewType;

    private _service:CalendarService | undefined;

    @Input()
    public set service(service:CalendarService | undefined) {
        if (service) {
            this._service = service;

            this.renderItems();
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

    public renderedItems:CalendarDateItem[][];

    constructor(viewType:CalendarViewType) {
        this._type = viewType;
    }

    public abstract renderItems():void;

    public abstract nextDateRange():void;

    public abstract prevDateRange():void;

    public setDate(selected:CalendarDateItem):void {
        if (this._service) {
            this._service.changeDate(selected.date, this._type);

            this.renderItems();
        }
    }

    public zoomOut():void {
        if (this._service) {
            this._service.zoomOut(this._type);
        }
    }
}
