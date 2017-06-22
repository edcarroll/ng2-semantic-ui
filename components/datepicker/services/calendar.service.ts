import { EventEmitter } from "@angular/core";
import { Util } from "../../util/util";
import { CalendarViewType, CalendarViewResult } from "../views/calendar-view";
import { CalendarMapping, CalendarMappings, DateMappings, TimeMappings, DatetimeMappings } from "../classes/calendar-mappings";

export enum CalendarMode {
    DateOnly = 0,
    TimeOnly = 1,
    Both = 2
}

export class CalendarService {
    private _mode:CalendarMode;
    private _mappings:CalendarMappings;

    public get mode():CalendarMode {
        return this._mode;
    }

    public set mode(mode:CalendarMode) {
        this._mode = mode;

        switch (mode) {
            case CalendarMode.DateOnly:
                this._mappings = new DateMappings();
                break;
            case CalendarMode.TimeOnly:
                this._mappings = new TimeMappings();
                break;
            case CalendarMode.Both:
                this._mappings = new DatetimeMappings();
                break;
        }

        this.reset();
    }

    public currentView:CalendarViewType;

    public currentDate:Date;
    private _selectedDate?:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    public set selectedDate(date:Date | undefined) {
        if (date) {
            this._selectedDate = Util.Date.clone(date);
            this.currentDate = Util.Date.clone(date);
        } else {
            this._selectedDate = undefined;
        }

        this.onManualUpdate();
    }

    private _minDate?:Date;
    private _maxDate?:Date;

    public get minDate():Date | undefined {
        return this._minDate;
    }

    public set minDate(min:Date | undefined) {
        this._minDate = min;
    }

    public get maxDate():Date | undefined {
        return this._maxDate;
    }

    public set maxDate(max:Date | undefined) {
        this._maxDate = max;
    }

    public onDateChange:EventEmitter<Date>;

    constructor() {
        this.mode = CalendarMode.DateOnly;
        this.onDateChange = new EventEmitter<Date>();

        this.reset();
    }

    public onManualUpdate:() => void = () => {};

    public reset():void {
        this.currentView = this._mappings.initialDateView;

        if (!this._selectedDate) {
            this.currentDate = new Date();

            this.currentView = this._mappings.initialView;
        }
    }

    public changeDate(date:Date, fromView:CalendarViewType):void {
        this.currentDate = date;

        if (fromView === this._mappings.finalView) {
            this.selectedDate = date;

            return this.onDateChange.emit(date);
        }

        this.updateView(this._mappings.changed, fromView);
    }

    public zoomOut(fromView:CalendarViewType):void {
        this.updateView(this._mappings.zoom, fromView);
    }

    private updateView(mappings:Map<CalendarViewType, CalendarViewType>, fromView:CalendarViewType):void {
        const mapping = mappings.get(fromView);
        if (mapping == undefined) {
            throw new Error("Unknown view type.");
        }
        this.currentView = mapping;
    }
}
