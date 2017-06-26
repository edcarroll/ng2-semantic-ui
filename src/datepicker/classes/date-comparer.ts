import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";

export class DateComparer {
    private _precision:DatePrecision;
    private _final:boolean;
    private _date:Date;

    constructor(precision:DatePrecision, final:boolean, date:Date) {
        this._precision = precision;
        this._final = final;
        this._date = date;
    }

    public isEqualTo(date:Date | undefined):boolean {
        if (this._precision === DatePrecision.Minute) {
            return !!date &&
               Util.Date.equal(DatePrecision.Hour, date, this._date) &&
               Util.Math.roundDown(date.getMinutes(), 5) === Util.Math.roundDown(this._date.getMinutes(), 5);
        }

        return !!date && Util.Date.equal(this._precision, this._date, date);
    }

    public isLessThan(date:Date | undefined):boolean {
        if (this._final) {
            return !date || (date > this._date);
        }

        return !date || (Util.Date.endOf(this._precision, Util.Date.clone(date)) > this._date);
    }

    public isGreaterThan(date:Date | undefined):boolean {
        if (this._final) {
            return !date || (date < this._date);
        }

        return !date || (Util.Date.startOf(this._precision, Util.Date.clone(date)) < this._date);
    }

    public isBetween(a:Date | undefined, b:Date | undefined):boolean {
        return this.isGreaterThan(a) && this.isLessThan(b);
    }
}
