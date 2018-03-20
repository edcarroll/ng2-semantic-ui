import { NG_VALIDATORS } from "@angular/forms";
import { forwardRef } from "@angular/core";
var CustomValidator = /** @class */ (function () {
    function CustomValidator(_host) {
        this._host = _host;
        this.onValidatorChange = function () { };
    }
    CustomValidator.prototype.validate = function (c) {
        return this._host.validate(c);
    };
    CustomValidator.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    return CustomValidator;
}());
export { CustomValidator };
export function customValidatorFactory(type) {
    return {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(function () { return type; }),
        multi: true
    };
}
//# sourceMappingURL=custom-validator.js.map