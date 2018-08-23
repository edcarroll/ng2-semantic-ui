import { DatePrecision, DateUtil, Util } from "../../../misc/util/internal";

export class DateComparer {
    private _precision:DatePrecision;
    private _isSmallest:boolean;

    constructor(precision:DatePrecision, isSmallest:boolean) {
        this._precision = precision;
        this._isSmallest = isSmallest;
    }

    public equal(a:Date, b:Date | undefined):boolean {
        if (this._precision === DatePrecision.Minute) {
            return !!b &&
               DateUtil.equal(DatePrecision.Hour, b, a) &&
               Util.Math.roundDown(b.getMinutes(), 5) === Util.Math.roundDown(a.getMinutes(), 5);
        }

        return !!b && DateUtil.equal(this._precision, a, b);
    }

    public lessThan(a:Date, b:Date | undefined):boolean {
        if (this._isSmallest) {
            return !b || (b >= a);
        }

        return !b || (DateUtil.endOf(this._precision, DateUtil.clone(b)) >= a);
    }

    public greaterThan(a:Date, b:Date | undefined):boolean {
        if (this._isSmallest) {
            return !b || (b <= a);
        }

        return !b || (DateUtil.startOf(this._precision, DateUtil.clone(b)) <= a);
    }

    public between(date:Date, left:Date | undefined, right:Date | undefined):boolean {
        return this.greaterThan(date, left) && this.lessThan(date, right);
    }
}
