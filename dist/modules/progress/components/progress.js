import { Component, Input, HostBinding } from "@angular/core";
var SuiProgress = /** @class */ (function () {
    function SuiProgress() {
        this._popupClasses = true;
        this.value = 0;
        this.maximum = 100;
        this.precision = 0;
        this._overrideSuccess = false;
        this.autoSuccess = true;
        this.showProgress = true;
        this._popupClasses = true;
    }
    Object.defineProperty(SuiProgress.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._value = converted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "maximum", {
        get: function () {
            return this._maximum;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._maximum = converted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "precision", {
        get: function () {
            return this._precision;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._precision = Math.min(Math.max(converted, 0), 20);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "_reachedMaximum", {
        get: function () {
            return this._overrideSuccess || ((this.value >= this.maximum) && this.autoSuccess);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "percentage", {
        get: function () {
            var boundedValue = Math.min(Math.max(this.value, 0), this.maximum);
            var percentage = (boundedValue / this.maximum) * 100;
            return percentage.toFixed(this.precision);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "classValue", {
        set: function (classes) {
            if (classes.includes("attached") || classes.includes("tiny")) {
                this.showProgress = false;
            }
            if (classes.includes("success")) {
                this._overrideSuccess = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiProgress.decorators = [
        { type: Component, args: [{
                    selector: "sui-progress",
                    template: "\n<div class=\"bar\" [style.width.%]=\"percentage\">\n    <div class=\"progress\" *ngIf=\"showProgress\">{{ percentage }}%</div>\n</div>\n<div class=\"label\">\n    <ng-content></ng-content>\n</div>\n",
                    styles: ["\n.bar {\n    transition-duration: 300ms !important;\n    z-index: 1;\n}\n"]
                },] },
    ];
    /** @nocollapse */
    SuiProgress.ctorParameters = function () { return []; };
    SuiProgress.propDecorators = {
        "_popupClasses": [{ type: HostBinding, args: ["class.ui",] }, { type: HostBinding, args: ["class.progress",] },],
        "autoSuccess": [{ type: Input },],
        "showProgress": [{ type: Input },],
        "value": [{ type: Input },],
        "maximum": [{ type: Input },],
        "precision": [{ type: Input },],
        "_reachedMaximum": [{ type: HostBinding, args: ["class.success",] },],
        "percentage": [{ type: HostBinding, args: ["attr.data-percent",] },],
        "classValue": [{ type: Input, args: ["class",] },],
    };
    return SuiProgress;
}());
export { SuiProgress };
//# sourceMappingURL=progress.js.map