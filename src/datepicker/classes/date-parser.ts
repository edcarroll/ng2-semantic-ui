import { ILocalizationValues } from "../../util/services/localization.service";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";

export interface IDateParser {
    format(date:Date):string;
    parse(dateString:string, baseDate?:Date):Date;
}

export type ComponentParser = [number, string, (d:Date) => number, (d:Date, n:number) => void];

const componentParsers:ComponentParser[] = [
    [4, "", d => d.getFullYear(), (d, y) => d.setFullYear(y)],
    [2, "-", d => d.getMonth() + 1, (d, m) => d.setMonth(m - 1)],
    [2, "-", d => d.getDate(), (d, a) => d.setDate(a)],
    [2, " ", d => d.getHours(), (d, h) => d.setHours(h)],
    [2, ":", d => d.getMinutes(), (d, m) => d.setMinutes(m)]
];

export class DateParserBase implements IDateParser {
    private _parsers:ComponentParser[];
    private _precision:DatePrecision;

    constructor(precision:DatePrecision, parsers:ComponentParser[]) {
        this._precision = precision;
        this._parsers = parsers;
    }

    public format(date:Date):string {
        return this._parsers
            .reduce((d, [i, s, outFn]) => [d, Util.String.padLeft(outFn(date).toString(), i, "0")].join(s), "");
    }

    public parse(dateString:string, baseDate:Date = new Date()):Date {
        const matcher = this._parsers
            .reduce((regex, [i, s]) => [regex, `(\\d{${i}})`].join(s), "");

        const date = Util.Date.startOf(this._precision, Util.Date.clone(baseDate), true);

        const components = (dateString
            .match(`^${matcher}`) as string[])
            .map(i => parseInt(i, 10))
            .slice(1, this._parsers.length + 1);

        this._parsers.forEach(([i, s, outFn, inFn], index) => inFn(date, components[index]));

        return date;
    }
}

export class YearParser extends DateParserBase {
    constructor() {
        super(DatePrecision.Year, componentParsers.slice(0, 1));
    }
}

export class MonthParser extends DateParserBase {
    constructor() {
        super(DatePrecision.Month, componentParsers.slice(0, 2));
    }
}

export class DateParser extends DateParserBase {
    constructor() {
        super(DatePrecision.Date, componentParsers.slice(0, 3));
    }
}

export class DatetimeParser extends DateParserBase {
    constructor() {
        super(DatePrecision.Minute, componentParsers);
    }
}

export class TimeParser extends DateParserBase {
    constructor() {
        super(DatePrecision.Minute, componentParsers.slice(-2));
    }
}
