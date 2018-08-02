import { EventEmitter } from "@angular/core";
import { IDatepickerLocaleValues } from "../../../behaviors/localization/internal";
import { DateUtil } from "../../../misc/util/internal";
import { CalendarViewType } from "../views/calendar-view";
import { CalendarConfig } from "../classes/calendar-config";

export enum CalendarMode {
    DateOnly = 0,
    TimeOnly = 1,
    Both = 2
}

export class CalendarService {
    private _config:CalendarConfig;

    public get config():CalendarConfig {
        return this._config;
    }

    public set config(config:CalendarConfig) {
        this._config = config;
        config.updateBounds(this._selectedDate || this.currentDate);
    }

    public currentView:CalendarViewType;
    public get inFinalView():boolean {
        return this.currentView === this.config.mappings.finalView;
    }

    public currentDate:Date;
    private _selectedDate?:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    public set selectedDate(date:Date | undefined) {
        if (date) {
            this._selectedDate = DateUtil.clone(date);
            this.currentDate = DateUtil.clone(date);
        } else {
            this._selectedDate = undefined;
        }

        this.config.updateBounds(this._selectedDate || this.currentDate);
        this.onManualUpdate();
    }

    private _minDate?:Date;
    private _maxDate?:Date;

    public get minDate():Date | undefined {
        if (this._minDate && this.config.dateMinBound) {
            return this._minDate > this.config.dateMinBound ? this._minDate : this.config.dateMinBound;
        }
        return this._minDate || this.config.dateMinBound;
    }

    public set minDate(min:Date | undefined) {
        this._minDate = min;
    }

    public get maxDate():Date | undefined {
        if (this._maxDate && this.config.dateMaxBound) {
            return this._maxDate < this.config.dateMaxBound ? this._maxDate : this.config.dateMaxBound;
        }
        return this._maxDate || this.config.dateMaxBound;
    }

    public set maxDate(max:Date | undefined) {
        this._maxDate = max;
    }

    private _firstDayOfWeek:number;

    public get firstDayOfWeek():number {
        return this._firstDayOfWeek;
    }

    public set firstDayOfWeek(firstDayOfWeek:number) {
        if (firstDayOfWeek != undefined) {
            this._firstDayOfWeek = Math.max(0, Math.min(6, firstDayOfWeek));
        }
    }

    public onDateChange:EventEmitter<Date>;

    constructor(config:CalendarConfig, public localeValues:IDatepickerLocaleValues) {
        this.config = config;

        this.currentDate = new Date();

        this.firstDayOfWeek = this.localeValues.firstDayOfWeek;

        this.onDateChange = new EventEmitter<Date>();

        this.reset();
    }

    public onManualUpdate:() => void = () => {};

    public reset():void {
        this.currentView = this.config.mappings.finalView;

        if (!this._selectedDate) {
            let current = this.currentDate.getTime();
            if (this._minDate) {
                current = Math.max(current, this._minDate.getTime());
            }
            if (this._maxDate) {
                current = Math.min(current, this._maxDate.getTime());
            }

            this.currentDate = new Date(current);
            this.config.updateBounds(this.currentDate);

            this.currentView = this.config.mappings.initialView;
        }
    }

    public changeDate(date:Date, fromView:CalendarViewType):void {
        this.currentDate = date;

        if (fromView === this.config.mappings.finalView) {
            this.selectedDate = date;

            return this.onDateChange.emit(date);
        }

        this.updateView(this.config.mappings.changed, fromView);
    }

    public zoomOut(fromView:CalendarViewType):void {
        this.updateView(this.config.mappings.zoom, fromView);
    }

    private updateView(mappings:Map<CalendarViewType, CalendarViewType>, fromView:CalendarViewType):void {
        const mapping = mappings.get(fromView);
        if (mapping == undefined) {
            throw new Error("Unknown view type.");
        }
        this.currentView = mapping;
    }
}
