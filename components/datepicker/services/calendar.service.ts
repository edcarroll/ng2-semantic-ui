import { EventEmitter } from "@angular/core";
import { Util } from "../../util/util";
import { CalendarViewType, CalendarViewResult } from "../views/calendar-view";

export type CalendarMapping = Map<CalendarViewType, CalendarViewType>;

export class CalendarService {
    private _currentView:CalendarViewType;

    public get currentView():CalendarViewType {
        return this._currentView;
    }

    public currentDate:Date;
    private _selectedDate?:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    public set selectedDate(date:Date | undefined) {
        if (date) {
            this._selectedDate = Util.Date.clone(date);
            this.currentDate = Util.Date.clone(date);

            this._currentView = CalendarViewType.Date;
        }
    }

    public onDateChange:EventEmitter<Date>;

    private _finalView:CalendarViewType;
    private _changedMappings:CalendarMapping;
    private _zoomMappings:CalendarMapping;

    constructor(finalView:CalendarViewType, changedMappings:CalendarMapping, zoomMappings:CalendarMapping) {
        this._finalView = finalView;

        this._changedMappings = changedMappings;
        this._zoomMappings = zoomMappings;

        this.onDateChange = new EventEmitter<Date>();

        this.reset();
    }

    public reset():void {
        if (!this._selectedDate) {
            this.currentDate = new Date();

            this._currentView = CalendarViewType.Year;
        }
    }

    public changeDate(date:Date, fromView:CalendarViewType):void {
        this.currentDate = date;

        if (fromView === this._finalView) {
            this.selectedDate = date;

            this.onDateChange.emit(this.selectedDate);
        }

        this.updateView(this._changedMappings, fromView);
    }

    public zoomOut(fromView:CalendarViewType):void {
        this.updateView(this._zoomMappings, fromView);
    }

    private updateView(mappings:Map<CalendarViewType, CalendarViewType>, fromView:CalendarViewType):void {
        const mapping = mappings.get(fromView);
        if (mapping == undefined) {
            throw new Error("Unknown view type.");
        }
        this._currentView = mapping;
    }
}
