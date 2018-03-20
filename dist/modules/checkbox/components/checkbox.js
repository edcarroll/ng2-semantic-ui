var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/index";
var SuiCheckbox = /** @class */ (function () {
    function SuiCheckbox() {
        this.isChecked = false;
        this.onCheckChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this._checkboxClasses = true;
    }
    Object.defineProperty(SuiCheckbox.prototype, "checkedAttribute", {
        get: function () {
            return this.isChecked ? "" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCheckbox.prototype, "isDisabledAttribute", {
        get: function () {
            return this.isDisabled ? "disabled" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    SuiCheckbox.prototype.onMouseDown = function (e) {
        e.preventDefault();
    };
    SuiCheckbox.prototype.onClick = function () {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
            this.focusCheckbox();
        }
    };
    SuiCheckbox.prototype.onFocusOut = function () {
        this.onTouched.emit();
    };
    SuiCheckbox.prototype.toggle = function () {
        this.isChecked = !this.isChecked;
        this.onCheckChange.emit(this.isChecked);
    };
    SuiCheckbox.prototype.writeValue = function (value) {
        this.isChecked = value;
    };
    SuiCheckbox.prototype.focusCheckbox = function () {
        this._checkboxElement.nativeElement.focus();
    };
    SuiCheckbox.decorators = [
        { type: Component, args: [{
                    selector: "sui-checkbox",
                    exportAs: "suiCheckbox",
                    template: "\n<input class=\"hidden\"\n       type=\"checkbox\"\n       [attr.name]=\"name\"\n       [attr.checked]=\"checkedAttribute\"\n       [attr.disabled]=\"isDisabledAttribute\"\n       [(ngModel)]=\"isChecked\"\n       #checkbox>\n<label>\n    <ng-content></ng-content>\n</label>\n"
                },] },
    ];
    /** @nocollapse */
    SuiCheckbox.ctorParameters = function () { return []; };
    SuiCheckbox.propDecorators = {
        "_checkboxClasses": [{ type: HostBinding, args: ["class.ui",] }, { type: HostBinding, args: ["class.checkbox",] },],
        "name": [{ type: Input },],
        "isChecked": [{ type: HostBinding, args: ["class.checked",] },],
        "onCheckChange": [{ type: Output, args: ["checkChange",] },],
        "onTouched": [{ type: Output, args: ["touched",] },],
        "isDisabled": [{ type: Input },],
        "isReadonly": [{ type: HostBinding, args: ["class.read-only",] }, { type: Input },],
        "_checkboxElement": [{ type: ViewChild, args: ["checkbox",] },],
        "onMouseDown": [{ type: HostListener, args: ["mousedown", ["$event"],] },],
        "onClick": [{ type: HostListener, args: ["click",] },],
        "onFocusOut": [{ type: HostListener, args: ["focusout",] },],
    };
    return SuiCheckbox;
}());
export { SuiCheckbox };
var SuiCheckboxValueAccessor = /** @class */ (function (_super) {
    __extends(SuiCheckboxValueAccessor, _super);
    function SuiCheckboxValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiCheckboxValueAccessor.decorators = [
        { type: Directive, args: [{
                    selector: "sui-checkbox",
                    host: {
                        "(checkChange)": "onChange($event)",
                        "(touched)": "onTouched()"
                    },
                    providers: [customValueAccessorFactory(SuiCheckboxValueAccessor)]
                },] },
    ];
    /** @nocollapse */
    SuiCheckboxValueAccessor.ctorParameters = function () { return [
        { type: SuiCheckbox, },
    ]; };
    return SuiCheckboxValueAccessor;
}(CustomValueAccessor));
export { SuiCheckboxValueAccessor };
//# sourceMappingURL=checkbox.js.map