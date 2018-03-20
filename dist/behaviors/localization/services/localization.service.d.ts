import { EventEmitter } from "@angular/core";
import { ILocaleValues, IPartialLocaleValues, RecursivePartial } from "../interfaces/values";
export declare class SuiLocalizationService {
    private _language;
    private _fallbackValues;
    private _values;
    readonly language: string;
    onLanguageUpdate: EventEmitter<void>;
    constructor();
    setLanguage(language: string): void;
    get(language?: string): ILocaleValues;
    override<T extends keyof ILocaleValues>(values: ILocaleValues[T], overrides: RecursivePartial<ILocaleValues[T]>): ILocaleValues[T];
    load(language: string, values: IPartialLocaleValues): void;
    patch(language: string, values: IPartialLocaleValues): void;
    interpolate(value: string, variables: [string, string][]): string;
}
