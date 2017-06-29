import { RecursivePartial } from "./partial";
import { IDatepickerLocaleValues, IDatepickerFormatsLocaleValues } from "./datepicker-values";
import { ISearchLocaleValues } from "./search-values";
import { ISelectLocaleValues, ISearchTailoredLocaleValues } from "./select-values";

export interface ILocaleValues {
    datepicker:IDatepickerLocaleValues;
    search:ISearchLocaleValues;
    select:ISelectLocaleValues;
}

export type IPartialLocaleValues = RecursivePartial<ILocaleValues>;

export {RecursivePartial};

export {IDatepickerLocaleValues, IDatepickerFormatsLocaleValues};
export {ISearchLocaleValues};
export {ISelectLocaleValues, ISearchTailoredLocaleValues};
