import { Directive, HostBinding, HostListener, Input, EventEmitter, ChangeDetectorRef } from "@angular/core";
var CalendarItem = /** @class */ (function () {
    function CalendarItem(date) {
        this.date = date;
    }
    return CalendarItem;
}());
export { CalendarItem };
var SuiCalendarItem = /** @class */ (function () {
    function SuiCalendarItem(changeDetector) {
        this.changeDetector = changeDetector;
        this.hasFocus = false;
        this.onFocussed = new EventEmitter();
    }
    Object.defineProperty(SuiCalendarItem.prototype, "isSelectable", {
        get: function () {
            return this.item.isSelectable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCalendarItem.prototype, "isActive", {
        get: function () {
            return this.item.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCalendarItem.prototype, "isToday", {
        get: function () {
            return this.item.isToday;
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarItem.prototype.onMouseMove = function () {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.onFocussed.emit(this.hasFocus);
        }
    };
    SuiCalendarItem.prototype.onMouseLeave = function () {
        this.hasFocus = false;
        this.onFocussed.emit(this.hasFocus);
    };
    SuiCalendarItem.decorators = [
        { type: Directive, args: [{
                    selector: "[calendarItem]"
                },] },
    ];
    /** @nocollapse */
    SuiCalendarItem.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    SuiCalendarItem.propDecorators = {
        "item": [{ type: Input, args: ["calendarItem",] },],
        "isSelectable": [{ type: HostBinding, args: ["class.disabled",] },],
        "isActive": [{ type: HostBinding, args: ["class.active",] },],
        "isToday": [{ type: HostBinding, args: ["class.today",] },],
        "hasFocus": [{ type: HostBinding, args: ["class.focus",] },],
        "onMouseMove": [{ type: HostListener, args: ["mousemove",] },],
        "onMouseLeave": [{ type: HostListener, args: ["mouseleave",] },],
    };
    return SuiCalendarItem;
}());
export { SuiCalendarItem };
//# sourceMappingURL=calendar-item.js.map