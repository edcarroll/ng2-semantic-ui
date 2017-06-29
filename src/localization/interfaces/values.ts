import { IDatepickerLocaleValues, IDatepickerFormatsLocaleValues } from "./datepicker-values";

export type Partial<T> = {
    [P in keyof T]?:Partial<T[P]>;
};

export interface ILocaleValues {
    datepicker:IDatepickerLocaleValues;
}

export type IPartialLocaleValues = Partial<ILocaleValues>;

export {IDatepickerLocaleValues, IDatepickerFormatsLocaleValues};
