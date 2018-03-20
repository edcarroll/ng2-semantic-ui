import { EventEmitter } from "@angular/core";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/index";
export declare class SuiRadio<T> implements ICustomValueAccessorHost<T> {
    private _radioClasses;
    name: string;
    value: T;
    isChecked: boolean;
    currentValue: T;
    onCurrentValueChange: EventEmitter<T>;
    onTouched: EventEmitter<void>;
    isDisabled: boolean;
    isReadonly: boolean;
    private _radioElement;
    readonly checkedAttribute: string | undefined;
    readonly isDisabledAttribute: string | undefined;
    constructor();
    onMouseDown(e: MouseEvent): void;
    onClick(): void;
    onFocusOut(): void;
    update(): void;
    writeValue(value: T): void;
    private focusRadio();
}
export declare class SuiRadioValueAccessor<T> extends CustomValueAccessor<T, SuiRadio<T>> {
    constructor(host: SuiRadio<T>);
}
