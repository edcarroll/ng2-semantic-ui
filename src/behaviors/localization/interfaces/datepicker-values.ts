export type Septuple<T> = [T, T, T, T, T, T, T];
export type Duodecuple<T> = [T, T, T, T, T, T, T, T, T, T, T, T];
export type Pair<T> = [T, T];

export interface IDatepickerFormatsLocaleValues {
    year:string;
    month:string;
    date:string;
    datetime:string;
    time:string;
}

export interface IDatepickerLocaleValues {
    months:Duodecuple<string>;
    monthsShort:Duodecuple<string>;
    weekdays:Septuple<string>;
    weekdaysShort:Septuple<string>;
    weekdaysNarrow:Septuple<string>;
    timesOfDay:Pair<string>;
    timesOfDayUppercase:Pair<string>;
    timesOfDayLowercase:Pair<string>;
    firstDayOfWeek:number;
    formats:IDatepickerFormatsLocaleValues;
}
