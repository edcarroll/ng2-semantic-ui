import { DateUtil, Util } from "../../../misc/util/index";
import { CalendarItem } from "../directives/calendar-item";
import { DateComparer } from "../classes/date-comparer";
var CalendarRange = /** @class */ (function () {
    function CalendarRange(start, dates, items, grouped, comparer) {
        this.start = start;
        this.dates = dates;
        this.items = items;
        this.groupedItems = grouped;
        this._comparer = comparer;
    }
    Object.defineProperty(CalendarRange.prototype, "inRange", {
        get: function () {
            return this.items.filter(function (i) { return !i.isOutsideRange; });
        },
        enumerable: true,
        configurable: true
    });
    CalendarRange.prototype.find = function (item) {
        var _this = this;
        return this.items.find(function (i) { return _this._comparer.equal(i.date, item.date); });
    };
    CalendarRange.prototype.findIndex = function (item) {
        var _this = this;
        if (!item) {
            return -1;
        }
        return this.items.findIndex(function (i) { return _this._comparer.equal(i.date, item.date); });
    };
    CalendarRange.prototype.containsDate = function (date) {
        var _this = this;
        return !!this.inRange.find(function (i) { return _this._comparer.equal(i.date, date); });
    };
    return CalendarRange;
}());
export { CalendarRange };
var CalendarRangeService = /** @class */ (function () {
    function CalendarRangeService(interval, rows, columns) {
        this.interval = interval;
        this.marginal = interval + 1;
        this.rows = rows;
        this.columns = columns;
    }
    Object.defineProperty(CalendarRangeService.prototype, "dateComparer", {
        get: function () {
            return new DateComparer(this.marginal, this.service.inFinalView);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarRangeService.prototype, "length", {
        get: function () {
            return this.rows * this.columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarRangeService.prototype, "canMoveNext", {
        get: function () {
            var firstItem = this.next.inRange[0];
            if (firstItem && this.service.maxDate) {
                return firstItem.date <= this.service.maxDate;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarRangeService.prototype, "canMovePrevious", {
        get: function () {
            var lastItem = this.previous.inRange.slice(-1).pop();
            if (lastItem && this.service.minDate) {
                return lastItem.date >= this.service.minDate;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CalendarRangeService.prototype.loadService = function (service) {
        this.service = service;
        this.refresh();
    };
    CalendarRangeService.prototype.refresh = function () {
        this.current = this.calcRange(this.service.currentDate);
        this.next = this.calcRange(DateUtil.next(this.interval, DateUtil.clone(this.service.currentDate)));
        this.previous = this.calcRange(DateUtil.previous(this.interval, DateUtil.clone(this.service.currentDate)));
    };
    CalendarRangeService.prototype.move = function (forwards) {
        if (forwards) {
            return this.moveNext();
        }
        return this.movePrevious();
    };
    CalendarRangeService.prototype.moveNext = function () {
        DateUtil.next(this.interval, this.service.currentDate);
        this.previous = this.current;
        this.current = this.next;
        this.next = this.calcRange(DateUtil.next(this.interval, DateUtil.clone(this.service.currentDate)));
    };
    CalendarRangeService.prototype.movePrevious = function () {
        DateUtil.previous(this.interval, this.service.currentDate);
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.calcRange(DateUtil.previous(this.interval, DateUtil.clone(this.service.currentDate)));
    };
    CalendarRangeService.prototype.calc = function (forwards) {
        if (forwards) {
            return this.next;
        }
        return this.previous;
    };
    CalendarRangeService.prototype.calcRange = function (startDate) {
        var start = this.calcStart(startDate);
        if (this.service.inFinalView) {
            DateUtil.startOf(this.marginal, start, true);
        }
        var dates = this.calcDates(start);
        var items = this.calcItems(dates, startDate);
        return new CalendarRange(start, dates, items, Util.Array.group(items, this.columns), this.dateComparer);
    };
    CalendarRangeService.prototype.calcStart = function (date) {
        return DateUtil.startOf(this.interval, DateUtil.clone(date));
    };
    CalendarRangeService.prototype.calcDates = function (rangeStart) {
        var _this = this;
        return Util.Array
            .range(this.length)
            .map(function (i) { return DateUtil.add(_this.marginal, DateUtil.clone(rangeStart), i); });
    };
    CalendarRangeService.prototype.calcItems = function (dateRange, baseDate) {
        var _this = this;
        return dateRange.map(function (date) {
            var item = new CalendarItem(date);
            item.isDisabled = !_this.dateComparer.between(item.date, _this.service.minDate, _this.service.maxDate);
            item.isActive = _this.dateComparer.equal(item.date, _this.service.selectedDate);
            item.isToday = _this.dateComparer.equal(item.date, new Date());
            item.isSelectable = item.isDisabled;
            _this.configureItem(item, baseDate);
            return item;
        });
    };
    return CalendarRangeService;
}());
export { CalendarRangeService };
//# sourceMappingURL=calendar-range.service.js.map