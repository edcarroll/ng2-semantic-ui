import { DatepickerMode } from "../components/datepicker";
import { IDatepickerLocaleValues } from "../../../behaviors/localization/index";
export declare class DateParser {
    private _format;
    private _parser;
    constructor(format: string, locale: IDatepickerLocaleValues);
    format(date: Date): string;
    parse(dateString: string, baseDate?: Date): Date;
}
export declare class InternalDateParser extends DateParser {
    constructor(mode: DatepickerMode, locale: IDatepickerLocaleValues);
}
