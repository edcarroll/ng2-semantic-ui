import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {forwardRef, InjectionToken, Type} from "@angular/core";

export interface CustomValueAccessorHost<T> {
    writeValue(value:T):void;
}

export class CustomValueAccessor<U, T extends CustomValueAccessorHost<U>> implements ControlValueAccessor {
    public onChange = () => {};
    public onTouched = () => {};

    constructor(private _host:T) {}

    public writeValue(value:U) {
        this._host.writeValue(value);
    }

    public registerOnChange(fn:() => void) {
        this.onChange = fn;
    }

    public registerOnTouched(fn:() => void) {
        this.onTouched = fn;
    }
}

export function customValueAccessorFactory(type:Function) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
