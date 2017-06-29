import { ILocaleValues } from "../../util/services/localization.service";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import { DatepickerMode } from "../components/datepicker";
import { format, parse } from "date-fns";
import * as dateFnDefaultLocale from "date-fns/locale/en-US";
import { IDatepickerFormatsLocaleValues, IDatepickerLocaleValues } from "../localization";

export interface IDateParser {
    format(date:Date):string;
    parse(dateString:string, baseDate?:Date):Date;
}

interface IDateFnsLocaleValues { [name:string]:string[]; }
type DateFnsLocaleIndexCallback = (i:number) => number;
type DateFnsLocaleFunction = (dirtyIndex:number, dirtyOptions:{ type?:string }) => string;
type DateFnsLocaleArrayFunction = (dirtyOptions:{ type?:string }) => string[];
interface IDateFnLocale {
    localize:{
        ordinalNumber?:DateFnsLocaleFunction;
        weekday:DateFnsLocaleFunction;
        weekdays:DateFnsLocaleArrayFunction;
        month:DateFnsLocaleFunction;
        months:DateFnsLocaleArrayFunction;
        timeOfDay?:DateFnsLocaleFunction;
        timesOfDay?:DateFnsLocaleArrayFunction;
    };
    options?:{
        weekStartsOn?:number;
    };
}

function buildLocalizeFn(values:IDateFnsLocaleValues, defaultType:string, indexCallback?:DateFnsLocaleIndexCallback):DateFnsLocaleFunction {
    return (dirtyIndex, dirtyOptions) => {
        const options = dirtyOptions || {};
        const type = options.type ? options.type : defaultType;
        const valuesArray = values[type] || values[defaultType];
        const index = indexCallback ? indexCallback(dirtyIndex) : dirtyIndex;
        return valuesArray[index];
    };
}

function buildLocalizeArrayFn(values:IDateFnsLocaleValues, defaultType:string):DateFnsLocaleArrayFunction {
    return dirtyOptions => {
        const options = dirtyOptions || {};
        const type = options.type ? options.type : defaultType;
        return values[type] || values[defaultType];
    };
}


export class DateParser implements IDateParser {
    private _format:string;
    private _locale:IDateFnLocale;

    constructor(format:string, locale:IDatepickerLocaleValues) {
        this._format = format;

        const weekdayValues = {
            long: locale.weekdays,
            short: locale.weekdaysShort,
            narrow: locale.weekdaysNarrow
        };

        const monthValues = {
            long: locale.months,
            short: locale.monthsShort
        };

        this._locale = dateFnDefaultLocale as any;
        Object.assign(this._locale, {
            localize: {
                weekday: buildLocalizeFn(weekdayValues, "long"),
                weekdays: buildLocalizeArrayFn(weekdayValues, "long"),
                month: buildLocalizeFn(monthValues, "long"),
                months: buildLocalizeArrayFn(monthValues, "long")
            }
        });
    }

    public format(date:Date):string {
        return format(date, this._format, { locale: this._locale as any });
    }

    public parse(dateString:string, baseDate:Date = new Date()):Date {
        return parse(dateString, this._format, baseDate, { locale: this._locale as any });
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
