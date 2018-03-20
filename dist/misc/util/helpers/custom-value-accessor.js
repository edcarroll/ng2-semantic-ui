import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";
var CustomValueAccessor = /** @class */ (function () {
    function CustomValueAccessor(_host) {
        this._host = _host;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    CustomValueAccessor.prototype.writeValue = function (value) {
        this._host.writeValue(value);
    };
    CustomValueAccessor.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CustomValueAccessor.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return CustomValueAccessor;
}());
export { CustomValueAccessor };
export function customValueAccessorFactory(type) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(function () { return type; }),
        multi: true
    };
}
//# sourceMappingURL=custom-value-accessor.js.map