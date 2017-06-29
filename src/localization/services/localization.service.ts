import { Injectable, EventEmitter } from "@angular/core";
import { ILocaleValues, IPartialLocaleValues, Partial } from "../interfaces/values";
import enGB from "../../../locales/en-GB";
import * as extend from "deep-extend";

function deepClone<T>(obj:T):T {
    return JSON.parse(JSON.stringify(obj));
}

function deepExtend<T, U>(target:T, source:U):T & U {
    return extend.call(undefined, target, source);
}

interface ILocalizationValuesContainer {
    [name:string]:IPartialLocaleValues;
}

@Injectable()
export class SuiLocalizationService {
    private _language:string;
    private _defaultLanguage:string;

    private _fallbackValues:ILocaleValues;
    private _values:ILocalizationValuesContainer;

    public get language():string {
        return this._language;
    }

    public onLanguageChange:EventEmitter<void>;
    public onTranslationsChange:EventEmitter<void>;

    constructor() {
        this.onLanguageChange = new EventEmitter<void>();
        this.onTranslationsChange = new EventEmitter<void>();

        this._fallbackValues = enGB;
        this._values = {};
        this.loadValues("en-GB", enGB);

        this.setDefaultLanguage("en-GB");
        this.setLanguage("en-GB");
    }

    public setDefaultLanguage(language:string):void {
        if (this._defaultLanguage !== language.toLowerCase()) {
            this._defaultLanguage = language.toLowerCase();
            this.onTranslationsChange.emit();
        }
    }

    public setLanguage(language:string):void {
        if (this._language !== language.toLowerCase()) {
            this._language = language.toLowerCase();
            this.onLanguageChange.emit();
        }
    }

    public getValues(language:string = this.language):ILocaleValues {
        const values = this._fallbackValues;
        deepExtend(values, this._values[this._defaultLanguage]);
        deepExtend(values, this._values[language.toLowerCase()]);
        return deepClone(values);
    }

    public overrideValues<T extends keyof ILocaleValues>(values:ILocaleValues[T], overrides:Partial<ILocaleValues[T]>):ILocaleValues[T] {
        return deepExtend(deepClone(values), overrides);
    }

    public loadValues(language:string, values:IPartialLocaleValues):void {
        this._values[language.toLowerCase()] = deepClone(values);
        if (this.language === language.toLowerCase()) {
            this.onTranslationsChange.emit();
        }
    }

    public patchValues(language:string, values:IPartialLocaleValues):void {
        deepExtend(this._values[language.toLowerCase()], values);
    }
}
