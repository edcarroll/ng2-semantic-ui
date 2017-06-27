import { Injectable } from "@angular/core";
import { IDateFormats } from "../../datepicker/classes/date-parser";

export type Septuple<T> = [T, T, T, T, T, T, T];
export type Duodecuple<T> = [T, T, T, T, T, T, T, T, T, T, T, T];

export interface ILocalizationValues {
    datepicker:{
        months:Duodecuple<string>;
        monthsShort:Duodecuple<string>;
        weekdays:Septuple<string>;
        weekdaysShort:Septuple<string>;
        firstDayOfWeek:number;
        formats:IDateFormats;
    };
}

interface ILocalizationValuesContainer {
    [name:string]:ILocalizationValues;
}

@Injectable()
export class SuiLocalizationService {
    private _language:string;
    private _values:ILocalizationValuesContainer;

    public get language():string {
        return this._language;
    }

    constructor() {
        this._language = "en";

        this._values = {};

        this.setValues("en", {
            datepicker: {
                months: [
                    "January", "February", "March", "April",
                    "May", "June", "July", "August",
                    "September", "October", "November", "December"
                ],
                monthsShort: [
                    "Jan", "Feb", "Mar", "Apr",
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"
                ],
                weekdays: [
                    "Sunday", "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday"
                ],
                weekdaysShort: [
                    "S", "M", "T", "W",
                    "T", "F", "S"
                ],
                firstDayOfWeek: 0,
                formats: {
                    time: "HH:mm",
                    datetime: "YYYY/MM/DD HH:mm",
                    date: "YYYY/MM/DD",
                    month: "MMMM YYYY",
                    year: "YYYY"
                }
            }
        });
    }

    public setLanguage(language:string):void {
        this._language = language;
    }

    public getValues(language?:string):ILocalizationValues {
        const l = language || this._language;
        return this._values[l];
    }

    public setValues(language:string, values:ILocalizationValues):void {
        this._values[language] = values;
    }
}
