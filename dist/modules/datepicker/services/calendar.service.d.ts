import { EventEmitter } from "@angular/core";
import { IDatepickerLocaleValues } from "../../../behaviors/localization/index";
import { CalendarViewType } from "../views/calendar-view";
import { CalendarConfig } from "../classes/calendar-config";
export declare enum CalendarMode {
    DateOnly = 0,
    TimeOnly = 1,
    Both = 2,
}
export declare class CalendarService {
    localeValues: IDatepickerLocaleValues;
    private _config;
    config: CalendarConfig;
    currentView: CalendarViewType;
    readonly inFinalView: boolean;
    currentDate: Date;
    private _selectedDate?;
    selectedDate: Date | undefined;
    private _minDate?;
    private _maxDate?;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    private _firstDayOfWeek;
    firstDayOfWeek: number;
    onDateChange: EventEmitter<Date>;
    constructor(config: CalendarConfig, localeValues: IDatepickerLocaleValues);
    onManualUpdate: () => void;
    reset(): void;
    changeDate(date: Date, fromView: CalendarViewType): void;
    zoomOut(fromView: CalendarViewType): void;
    private updateView(mappings, fromView);
}
