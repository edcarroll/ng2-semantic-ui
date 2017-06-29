import { Partial } from "./partial";
import { IDatepickerLocaleValues, IDatepickerFormatsLocaleValues } from "./datepicker-values";
import { ISearchLocaleValues } from "./search-values";

export interface ILocaleValues {
    datepicker:IDatepickerLocaleValues;
    search:ISearchLocaleValues;
}

export type IPartialLocaleValues = Partial<ILocaleValues>;

export {IDatepickerLocaleValues, IDatepickerFormatsLocaleValues};
export {ISearchLocaleValues};
