import { ILocalizationValues } from "../../util/services/localization.service";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";

export interface IDateParser {
    format(date:Date):string;
    parse(dateString:string, baseDate?:Date):Date;
}

export type ComponentParser = [number, string, (d:Date) => number, (d:Date, n:number) => void, DatePrecision];

export const dateComponentParsers:ComponentParser[] = [
    [4, " ", d => d.getFullYear(), (d, y) => d.setFullYear(y), DatePrecision.Year],
    [2, "-", d => d.getMonth() + 1, (d, m) => d.setMonth(m - 1), DatePrecision.Month],
    [2, "-", d => d.getDate(), (d, a) => d.setDate(a), DatePrecision.Date],
    [2, " ", d => d.getHours(), (d, h) => d.setHours(h), DatePrecision.Hour],
    [2, ":", d => d.getMinutes(), (d, m) => d.setMinutes(m), DatePrecision.Minute]
];

export class DateParser implements IDateParser {
    private _parsers:ComponentParser[];
    private _precision:DatePrecision;

    constructor(parsers:ComponentParser[]) {
        this._parsers = parsers;
        const [[, , , , precision]] = parsers.slice(-1);
        this._precision = precision;
    }

    public format(date:Date):string {
        // Concat the accumulator with each new component using the provided separator.
        return this._parsers
            .reduce((d, [i, s, outFn]) => `${d}${s}${Util.String.padLeft(outFn(date).toString(), i, "0")}`, "")
            .slice(1);
    }

    public parse(dateString:string, baseDate:Date = new Date()):Date {
        // Generate a RegExp for the parts of the date we are parsing.
        const matcher = this._parsers
            .reduce((regex, [i, s]) => `${regex}${s}(\\d{${i}})`, "")
            .slice(1);

        // Generate an initial date based from the provided base date.
        const date = Util.Date.startOf(this._precision, Util.Date.clone(baseDate), true);

        // Extract the date components from the provided string.
        const components = (dateString
            .match(`^${matcher}`) as string[])
            .map(i => parseInt(i, 10))
            .slice(1, this._parsers.length + 1);

        // Apply each component to the initial date.
        this._parsers.forEach(([, , , inFn], index) => inFn(date, components[index]));

        // Check each component of the parsed date with the provided components.
        this._parsers.forEach(([, , outFn], index) => {
            if (outFn(date) !== components[index]) {
                // If any component is different, the date is invalid.
                throw new Error("Invalid Date.");
            }
        });

        return date;
    }
}
