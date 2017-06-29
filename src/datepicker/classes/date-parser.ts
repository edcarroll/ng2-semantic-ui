import { ILocaleValues } from "../../util/services/localization.service";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { DatepickerMode } from "../components/datepicker";
import { DateFnsParser } from "../helpers/date-fns";
import { IDatepickerLocaleValues, IDatepickerFormatsLocaleValues } from "../localization";

export interface IDateParser {
    format(date:Date):string;
    parse(dateString:string, baseDate?:Date):Date;
}

export class DateParser implements IDateParser {
    private _format:string;
    private _parser:DateFnsParser;

    constructor(format:string, locale:IDatepickerLocaleValues) {
        this._format = format;
        this._parser = new DateFnsParser(locale);
    }

    public format(date:Date):string {
        return this._parser.format(date, this._format);
    }

    public parse(dateString:string, baseDate:Date = new Date()):Date {
        return this._parser.parse(dateString, this._format, baseDate);
    }
}

export class InternalDateParser extends DateParser {
    constructor(mode:DatepickerMode, locale:IDatepickerLocaleValues) {
        const internalFormats:IDatepickerFormatsLocaleValues = {
            time: "HH:mm",
            datetime: "YYYY-MM-DDTHH:mm",
            date: "YYYY-MM-DD",
            month: "YYYY-MM",
            year: "YYYY"
        };

        super(internalFormats[mode], locale);
    }
}
