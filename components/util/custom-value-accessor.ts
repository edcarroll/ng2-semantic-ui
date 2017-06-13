import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { forwardRef, InjectionToken, Type } from "@angular/core";

export interface ICustomValueAccessorHost<T> {
    writeValue(value:T):void;
}

export class CustomValueAccessor<U, T extends ICustomValueAccessorHost<U>> implements ControlValueAccessor {
    constructor(private _host:T) {}

    public onChange = () => {};
    public onTouched = () => {};

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

export interface IProvider {
    provide:InjectionToken<ControlValueAccessor>;
    useExisting:Type<any>;
    multi:boolean;
}

export function customValueAccessorFactory(type:Function):IProvider {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
