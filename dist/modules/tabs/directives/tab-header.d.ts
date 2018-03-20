import { EventEmitter } from "@angular/core";
export declare class SuiTabHeader {
    private _headerClasses;
    id: string;
    private _isActive;
    isActiveChange: EventEmitter<boolean>;
    isActiveExternalChange: EventEmitter<boolean>;
    onActivate: EventEmitter<void>;
    onDeactivate: EventEmitter<void>;
    isActive: boolean;
    private _isDisabled;
    isDisabled: boolean;
    constructor();
    setActiveState(active: boolean): void;
    private onClick();
}
