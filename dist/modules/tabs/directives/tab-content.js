import { HostBinding, Directive, Input } from "@angular/core";
var SuiTabContent = /** @class */ (function () {
    function SuiTabContent() {
        this.isActive = false;
        this._contentClasses = true;
    }
    SuiTabContent.decorators = [
        { type: Directive, args: [{
                    selector: "[suiTabContent]"
                },] },
    ];
    /** @nocollapse */
    SuiTabContent.ctorParameters = function () { return []; };
    SuiTabContent.propDecorators = {
        "_contentClasses": [{ type: HostBinding, args: ["class.tab",] },],
        "id": [{ type: Input, args: ["suiTabContent",] },],
        "isActive": [{ type: HostBinding, args: ["class.active",] },],
    };
    return SuiTabContent;
}());
export { SuiTabContent };
//# sourceMappingURL=tab-content.js.map