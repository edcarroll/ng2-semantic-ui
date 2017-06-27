import { ILocalizationValues } from "../../util/services/localization.service";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { DatepickerMode } from "../components/datepicker";
import { format, parse } from "date-fns";


export interface IDateParser {
    format(date:Date):string;
    parse(dateString:string, baseDate?:Date):Date;
}

export interface IDateFormats {
    year:string;
    month:string;
    date:string;
    datetime:string;
    time:string;
}

export class DateParser implements IDateParser {
    private _format:string;

    constructor(format:string) {
        this._format = format;
    }

    public format(date:Date):string {
        return format(date, this._format);
    }

    public parse(dateString:string, baseDate:Date = new Date()):Date {
        return parse(dateString, this._format, baseDate);
    }
}

export class InternalDateParser extends DateParser {
    constructor(mode:DatepickerMode) {
        const internalFormats:IDateFormats = {
            time:"HH:mm",
            datetime:"YYYY-MM-DDTHH:mm",
            date:"YYYY-MM-DD",
            month:"YYYY-MM",
            year:"YYYY"
        };

        super(internalFormats[mode]);
    }
}
