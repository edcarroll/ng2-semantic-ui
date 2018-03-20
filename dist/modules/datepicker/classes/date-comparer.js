import { DatePrecision, DateUtil, Util } from "../../../misc/util/index";
var DateComparer = /** @class */ (function () {
    function DateComparer(precision, isSmallest) {
        this._precision = precision;
        this._isSmallest = isSmallest;
    }
    DateComparer.prototype.equal = function (a, b) {
        if (this._precision === DatePrecision.Minute) {
            return !!b &&
                DateUtil.equal(DatePrecision.Hour, b, a) &&
                Util.Math.roundDown(b.getMinutes(), 5) === Util.Math.roundDown(a.getMinutes(), 5);
        }
        return !!b && DateUtil.equal(this._precision, a, b);
    };
    DateComparer.prototype.lessThan = function (a, b) {
        if (this._isSmallest) {
            return !b || (b >= a);
        }
        return !b || (DateUtil.endOf(this._precision, DateUtil.clone(b)) >= a);
    };
    DateComparer.prototype.greaterThan = function (a, b) {
        if (this._isSmallest) {
            return !b || (b <= a);
        }
        return !b || (DateUtil.startOf(this._precision, DateUtil.clone(b)) <= a);
    };
    DateComparer.prototype.between = function (date, left, right) {
        return this.greaterThan(date, left) && this.lessThan(date, right);
    };
    return DateComparer;
}());
export { DateComparer };
//# sourceMappingURL=date-comparer.js.map