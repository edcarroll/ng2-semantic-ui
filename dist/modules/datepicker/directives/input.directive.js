import { Directive, Host, Input, ElementRef, HostBinding, HostListener } from "@angular/core";
import { DateUtil } from "../../../misc/util/index";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
import { PopupTrigger } from "../../popup/index";
import { SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor } from "./datepicker.directive";
import { InternalDateParser, DateParser } from "../classes/date-parser";
import * as bowser from "bowser";
import "../helpers/is-webview";
import * as isUAWebView from "is-ua-webview";
var isWebView = isUAWebView["default"] || isUAWebView;
var SuiDatepickerInputDirective = /** @class */ (function () {
    function SuiDatepickerInputDirective(datepicker, valueAccessor, element, localizationService) {
        var _this = this;
        this.datepicker = datepicker;
        this.valueAccessor = valueAccessor;
        this.element = element;
        this.useNativeOnMobile = true;
        this.fallbackActive = false;
        // Whenever the datepicker value updates, update the input text alongside it.
        this.datepicker.onSelectedDateChange.subscribe(function () {
            return _this.updateValue(_this.selectedDateString);
        });
        localizationService.onLanguageUpdate.subscribe(function () {
            return _this.updateValue(_this.selectedDateString);
        });
    }
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "useNativeOnMobile", {
        get: function () {
            return this._useNativeOnMobile;
        },
        set: function (fallback) {
            this._useNativeOnMobile = fallback;
            var isOnMobile = bowser.mobile || bowser.tablet || isWebView(navigator.userAgent);
            this.fallbackActive = this.useNativeOnMobile && isOnMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "fallbackActive", {
        get: function () {
            return this._fallbackActive;
        },
        set: function (active) {
            this._fallbackActive = active;
            // If the fallback is active, then the trigger must be manual so the datepicker never opens.
            this.datepicker.popup.config.trigger = this.fallbackActive ? PopupTrigger.Manual : PopupTrigger.Focus;
            // Update the input value (this will insert the `T` as required).
            this.updateValue(this.selectedDateString);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "parser", {
        get: function () {
            if (this.fallbackActive) {
                return new InternalDateParser(this.datepicker.mode, this.datepicker.localeValues);
            }
            return new DateParser(this.datepicker.localeValues.formats[this.datepicker.mode], this.datepicker.localeValues);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "selectedDateString", {
        get: function () {
            if (this.datepicker.selectedDate) {
                return this.parser.format(this.datepicker.selectedDate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "type", {
        get: function () {
            if (this.fallbackActive) {
                return this.datepicker.config.fallback;
            }
            return "text";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "max", {
        get: function () {
            if (this.fallbackActive && this.datepicker.maxDate) {
                // Since HTML doesn't use a date object max is somewhat tricky.
                // Our Datepicker will always choose the 1st date on the provided precision,
                // meaning anything below the maxDate will work, hence endOf.
                var max = DateUtil.endOf(this.datepicker.config.precision, DateUtil.clone(this.datepicker.maxDate));
                return this.parser.format(max);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "min", {
        get: function () {
            if (this.fallbackActive && this.datepicker.minDate) {
                // Since HTML doesn't use a date object min is somewhat tricky.
                // We use 1 minute before the next date at the configured precision since
                // our Datepicker picks the first available date at that precision.
                var min = DateUtil.clone(this.datepicker.minDate);
                return this.parser.format(min);
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiDatepickerInputDirective.prototype.updateValue = function (value) {
        // Only update the current value if it is different to what it's being updated to.
        // This is so that the editing position isn't changed when manually typing the date.
        if (!this._lastUpdateTyped) {
            this.datepicker.renderer.setProperty(this.element.nativeElement, "value", value || "");
        }
        this._lastUpdateTyped = false;
    };
    SuiDatepickerInputDirective.prototype.typeValue = function (value) {
        this._lastUpdateTyped = true;
        this._currentInputValue = value;
        if (!value) {
            // Delete the selected date if no date was entered manually.
            return this.datepicker.writeValue(undefined);
        }
        var parsed = this.parser.parse(value, this.datepicker.selectedDate);
        if (!isNaN(parsed.getTime()) && value === this.parser.format(parsed)) {
            return this.datepicker.writeValue(parsed);
        }
        return this.datepicker.writeValue(undefined);
    };
    SuiDatepickerInputDirective.prototype.onFocusOut = function () {
        this.valueAccessor.onTouched();
    };
    SuiDatepickerInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: "input[suiDatepicker]"
                },] },
    ];
    /** @nocollapse */
    SuiDatepickerInputDirective.ctorParameters = function () { return [
        { type: SuiDatepickerDirective, decorators: [{ type: Host },] },
        { type: SuiDatepickerDirectiveValueAccessor, decorators: [{ type: Host },] },
        { type: ElementRef, },
        { type: SuiLocalizationService, },
    ]; };
    SuiDatepickerInputDirective.propDecorators = {
        "useNativeOnMobile": [{ type: Input, args: ["pickerUseNativeOnMobile",] },],
        "type": [{ type: HostBinding, args: ["attr.type",] },],
        "max": [{ type: HostBinding, args: ["attr.max",] },],
        "min": [{ type: HostBinding, args: ["attr.min",] },],
        "typeValue": [{ type: HostListener, args: ["input", ["$event.target.value"],] },],
        "onFocusOut": [{ type: HostListener, args: ["focusout",] },],
    };
    return SuiDatepickerInputDirective;
}());
export { SuiDatepickerInputDirective };
//# sourceMappingURL=input.directive.js.map