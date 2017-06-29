import { IDatepickerLocaleValues, IDatepickerFormatsLocaleValues } from "./datepicker-values";
import { ISearchLocaleValues } from "./search-values";

export type Partial<T> = {
    [P in keyof T]?:Partial<T[P]>;
};

export interface ILocaleValues {
    datepicker:IDatepickerLocaleValues;
    search:ISearchLocaleValues;
}

export type IPartialLocaleValues = Partial<ILocaleValues>;

export {IDatepickerLocaleValues, IDatepickerFormatsLocaleValues};
export {ISearchLocaleValues};
