import { RecursivePartial } from "./partial";
import { IDatepickerLocaleValues, IDatepickerFormatsLocaleValues } from "./datepicker-values";
import { ISearchLocaleValues } from "./search-values";

export interface ILocaleValues {
    datepicker:IDatepickerLocaleValues;
    search:ISearchLocaleValues;
}

export type IPartialLocaleValues = RecursivePartial<ILocaleValues>;

export {RecursivePartial};
export {IDatepickerLocaleValues, IDatepickerFormatsLocaleValues};
export {ISearchLocaleValues};
