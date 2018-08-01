import { Injectable, EventEmitter } from "@angular/core";
import { ILocaleValues, IPartialLocaleValues, RecursivePartial } from "../locales/interfaces/values";
import enGB from "../locales/en-GB";
import * as $extend from "extend";

function deepClone<T>(obj:T):T {
    return JSON.parse(JSON.stringify(obj));
}

function deepExtend<T, U>(target:T, source:U):T & U {
    // Rollup...
    const extend = ($extend as any).default || $extend;
    return extend(true, target, source);
}

function lang(language:string):string {
    return language.toLowerCase().replace("-", "");
}

interface ILocalizationValuesContainer {
    [name:string]:IPartialLocaleValues;
}

@Injectable()
export class SuiLocalizationService {
    private _language:string;

    private _fallbackValues:ILocaleValues;
    private _values:ILocalizationValuesContainer;

    public get language():string {
        return this._language;
    }

    public onLanguageUpdate:EventEmitter<void>;

    constructor() {
        this.onLanguageUpdate = new EventEmitter<void>();

        this._fallbackValues = enGB;
        this._values = {};
        this._language = "en-GB";
        this.load("en-GB", enGB);
    }

    public setLanguage(language:string):void {
        if (lang(this._language) !== lang(language)) {
            this._language = language;
            this.onLanguageUpdate.emit();
        }
    }

    public get(language:string = this.language):ILocaleValues {
        const values = deepClone(this._fallbackValues);
        if (!this._values[lang(language)]) {
            throw new Error(`Locale ${language} is not loaded`);
        }
        deepExtend(values, this._values[lang(language)]);
        return deepClone(values);
    }

    public override<T extends keyof ILocaleValues>(
        values:ILocaleValues[T],
        overrides:RecursivePartial<ILocaleValues[T]>
    ):ILocaleValues[T] {
        return deepExtend(deepClone(values), overrides);
    }

    public load(language:string, values:IPartialLocaleValues):void {
        this._values[lang(language)] = deepClone(values);
        this.onLanguageUpdate.emit();
    }

    public patch(language:string, values:IPartialLocaleValues):void {
        deepExtend(this._values[lang(language)], values);
    }

    public interpolate(value:string, variables:[string, string][]):string {
        return variables.reduce((s, [k, v]) => s.replace(new RegExp(`#{${k}}`, "g"), v), value);
    }
}
