import { ControlValueAccessor } from "@angular/forms";
import { InjectionToken, Type } from "@angular/core";
export interface ICustomValueAccessorHost<T> {
    writeValue(value: T): void;
}
export declare class CustomValueAccessor<U, T extends ICustomValueAccessorHost<U>> implements ControlValueAccessor {
    private _host;
    constructor(_host: T);
    onChange: () => void;
    onTouched: () => void;
    writeValue(value: U): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
}
export interface IValueAccessorProvider {
    provide: InjectionToken<ControlValueAccessor>;
    useExisting: Type<any>;
    multi: boolean;
}
export declare function customValueAccessorFactory(type: Function): IValueAccessorProvider;
