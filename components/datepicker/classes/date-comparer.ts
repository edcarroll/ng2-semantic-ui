import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";

export abstract class Comparer {
    protected _precision:DatePrecision;
    protected _date:Date;

    constructor(precision:DatePrecision, date:Date) {
        this._precision = precision;
        this._date = date;
    }

    public isEqualTo(date:Date | undefined):boolean {
        return !!date && Util.Date.equal(this._precision, this._date, date);
    }

    public isLessThan(date:Date | undefined):boolean {
        return !date || (Util.Date.endOf(this._precision, Util.Date.clone(date)) > this._date);
    }

    public isGreaterThan(date:Date | undefined):boolean {
        return !date || (Util.Date.startOf(this._precision, Util.Date.clone(date)) < this._date);
    }

    public isBetween(a:Date | undefined, b:Date | undefined):boolean {
        return this.isGreaterThan(a) && this.isLessThan(b);
    }
}

export class YearComparer extends Comparer {
    constructor(date:Date) {
        super(DatePrecision.Year, date);
    }
}

export class MonthComparer extends Comparer {
    constructor(date:Date) {
        super(DatePrecision.Month, date);
    }
}

export class DateComparer extends Comparer {
    constructor(date:Date) {
        super(DatePrecision.Date, date);
    }
}

export class HourComparer extends Comparer {
    constructor(date:Date) {
        super(DatePrecision.Hour, date);
    }
}

export class MinuteComparer extends Comparer {
    constructor(date:Date) {
        super(DatePrecision.Minute, date);
    }

    public isEqualTo(date:Date | undefined):boolean {
        return !!date &&
               Util.Date.equal(DatePrecision.Hour, date, this._date) &&
               Util.Math.roundDown(date.getMinutes(), 5) === Util.Math.roundDown(this._date.getMinutes(), 5);
    }

    public isLessThan(date:Date | undefined):boolean {
        return !date || (date > this._date);
    }

    public isGreaterThan(date:Date | undefined):boolean {
        return !date || (date < this._date);
    }
}
