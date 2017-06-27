import {
    NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl,
    ValidationErrors, Validator
} from "@angular/forms";
import { forwardRef, InjectionToken, Type } from "@angular/core";

export interface ICustomValueAccessorHost<T> {
    writeValue(value:T):void;
}

export interface ICustomValidatorHost {
    validate(c:AbstractControl):ValidationErrors | null;
}

export class CustomValueAccessor<U, T extends ICustomValueAccessorHost<U>> implements ControlValueAccessor {
    constructor(private _host:T) {}

    public onChange = () => {};
    public onTouched = () => {};

    public writeValue(value:U):void {
        this._host.writeValue(value);
    }

    public registerOnChange(fn:() => void):void {
        this.onChange = fn;
    }

    public registerOnTouched(fn:() => void):void {
        this.onTouched = fn;
    }
}

export class CustomValidator<T extends ICustomValidatorHost> implements Validator {
    constructor(private _host:T) {}

    public onValidatorChange = () => {};

    public validate(c:AbstractControl):ValidationErrors | null {
        return this._host.validate(c);
    }

    public registerOnValidatorChange(fn:() => void):void {
        this.onValidatorChange = fn;
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

export function customValidatorFactory(type:Function):IProvider {
    return {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
