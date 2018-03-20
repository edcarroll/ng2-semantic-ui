import { EventEmitter, ChangeDetectorRef } from "@angular/core";
export declare class CalendarItem {
    date: Date;
    humanReadable: string;
    isDisabled: boolean;
    isActive: boolean;
    isOutsideRange: boolean;
    isToday: boolean;
    isSelectable: boolean;
    constructor(date: Date);
}
export declare class SuiCalendarItem {
    changeDetector: ChangeDetectorRef;
    item: CalendarItem;
    readonly isSelectable: boolean;
    readonly isActive: boolean;
    readonly isToday: boolean;
    hasFocus: boolean;
    onFocussed: EventEmitter<boolean>;
    constructor(changeDetector: ChangeDetectorRef);
    onMouseMove(): void;
    onMouseLeave(): void;
}
