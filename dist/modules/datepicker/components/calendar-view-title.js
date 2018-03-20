import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CalendarRangeService } from "../services/calendar-range.service";
var SuiCalendarViewTitle = /** @class */ (function () {
    function SuiCalendarViewTitle() {
        this.onZoomOut = new EventEmitter();
    }
    SuiCalendarViewTitle.decorators = [
        { type: Component, args: [{
                    selector: "sui-calendar-view-title",
                    template: "\n<span class=\"title link\" (click)=\"onZoomOut.emit()\">\n    <ng-content></ng-content>\n</span>\n<span class=\"prev link\" [class.disabled]=\"!ranges?.canMovePrevious\" (click)=\"ranges?.movePrevious()\">\n    <i class=\"chevron left icon\"></i>\n</span>\n<span class=\"next link\" [class.disabled]=\"!ranges?.canMoveNext\" (click)=\"ranges?.moveNext()\">\n    <i class=\"chevron right icon\"></i>\n</span>\n",
                    styles: ["\n.title.link {\n    display: inline-block;\n    margin-left: 2rem;\n    margin-right: 2rem;\n}\n"]
                },] },
    ];
    /** @nocollapse */
    SuiCalendarViewTitle.ctorParameters = function () { return []; };
    SuiCalendarViewTitle.propDecorators = {
        "ranges": [{ type: Input },],
        "onZoomOut": [{ type: Output, args: ["zoomOut",] },],
    };
    return SuiCalendarViewTitle;
}());
export { SuiCalendarViewTitle };
//# sourceMappingURL=calendar-view-title.js.map