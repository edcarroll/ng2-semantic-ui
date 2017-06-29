export type Septuple<T> = [T, T, T, T, T, T, T];
export type Duodecuple<T> = [T, T, T, T, T, T, T, T, T, T, T, T];

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
    firstDayOfWeek:number;
    formats:IDatepickerFormatsLocaleValues;
}

export const defaultGBDatepickerLocaleValues:IDatepickerLocaleValues = {
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
        "Sun", "Mon", "Tue", "Wed",
        "Thu", "Fri", "Sat"
    ],
    weekdaysNarrow: [
        "S", "M", "T", "W",
        "T", "F", "S"
    ],
    formats: {
        time: "HH:mm",
        datetime: "MMMM D, YYYY HH:mm",
        date: "MMMM D, YYYY",
        month: "MMMM YYYY",
        year: "YYYY"
    },
    firstDayOfWeek: 1
};
