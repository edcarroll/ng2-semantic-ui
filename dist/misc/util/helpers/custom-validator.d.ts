import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";
import { InjectionToken, Type } from "@angular/core";
export interface ICustomValidatorHost {
    validate(c: AbstractControl): ValidationErrors | null;
}
export declare class CustomValidator<T extends ICustomValidatorHost> implements Validator {
    private _host;
    constructor(_host: T);
    onValidatorChange: () => void;
    validate(c: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
}
export interface IValidationProvider {
    provide: InjectionToken<(Function | Validator)[]>;
    useExisting: Type<any>;
    multi: boolean;
}
export declare function customValidatorFactory(type: Function): IValidationProvider;
