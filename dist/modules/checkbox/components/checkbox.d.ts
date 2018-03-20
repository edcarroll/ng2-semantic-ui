import { EventEmitter } from "@angular/core";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/index";
export declare class SuiCheckbox implements ICustomValueAccessorHost<boolean> {
    private _checkboxClasses;
    name: string;
    isChecked: boolean;
    onCheckChange: EventEmitter<boolean>;
    onTouched: EventEmitter<void>;
    isDisabled: boolean;
    isReadonly: boolean;
    readonly checkedAttribute: string | undefined;
    readonly isDisabledAttribute: string | undefined;
    private _checkboxElement;
    constructor();
    onMouseDown(e: MouseEvent): void;
    onClick(): void;
    onFocusOut(): void;
    toggle(): void;
    writeValue(value: boolean): void;
    private focusCheckbox();
}
export declare class SuiCheckboxValueAccessor extends CustomValueAccessor<boolean, SuiCheckbox> {
    constructor(host: SuiCheckbox);
}
