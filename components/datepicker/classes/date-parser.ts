import { ILocalizationValues } from "../../util/services/localization.service";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";

export interface IDateParser {
    format(date:Date):string;
    parse(dateString:string):Date;
}

export class DateParser implements IDateParser {
    private _localization:ILocalizationValues;

    constructor(localizationValues:ILocalizationValues) {
        this._localization = localizationValues;
    }

    public format(date:Date):string {
        const year = Util.String.padLeft(date.getFullYear().toString(), 4, "0");
        const month = Util.String.padLeft((date.getMonth() + 1).toString(), 2, "0");
        const day = Util.String.padLeft(date.getDate().toString(), 2, "0");

        return `${year}-${month}-${day}`;
    }

    public parse(dateString:string):Date {
        const [, year, month, date] = (dateString
                    .match(/^(\d{4})-(\d{2})-(\d{2})$/) as string[])
                    .map(i => parseInt(i, 10));

        const parsed = Util.Date.startOf(DatePrecision.Date, new Date(), true);
        parsed.setFullYear(year);
        parsed.setMonth(month - 1);
        parsed.setDate(date);

        if (parsed.getFullYear() !== year ||
            parsed.getMonth() + 1 !== month ||
            parsed.getDate() !== date) {

            throw new Error("Invalid date.");
        }

        return parsed;
    }
}
