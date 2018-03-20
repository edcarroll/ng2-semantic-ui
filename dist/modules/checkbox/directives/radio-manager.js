import { Directive, ContentChildren, QueryList, ElementRef } from "@angular/core";
import { SuiRadio } from "../components/radio";
import { Util } from "../../../misc/util/index";
var SuiRadioManager = /** @class */ (function () {
    function SuiRadioManager(element) {
        this.element = element;
        this.isNested = false;
        this._radioSubs = [];
    }
    SuiRadioManager.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.updateNesting();
        this._subManagers.changes.subscribe(function () { return _this.updateNesting(); });
        this.updateRadios();
        this._renderedRadios.changes.subscribe(function () { return _this.updateRadios(); });
    };
    SuiRadioManager.prototype.updateNesting = function () {
        var _this = this;
        this._subManagers
            .filter(function (m) { return m !== _this; })
            .forEach(function (m) { return m.isNested = true; });
    };
    SuiRadioManager.prototype.updateRadios = function () {
        var _this = this;
        this._radioSubs.forEach(function (s) { return s.unsubscribe(); });
        this._radioSubs = [];
        var groups = Util.Array.groupBy(this._renderedRadios.toArray(), "name");
        Object
            .keys(groups)
            .map(function (k) { return groups[k]; })
            .forEach(function (g) {
            return g
                .forEach(function (r) {
                return _this._radioSubs
                    .push(r.onCurrentValueChange
                    .subscribe(function (v) {
                    if (!_this.isNested) {
                        g.forEach(function (radio) { return radio.writeValue(v); });
                    }
                }));
            });
        });
    };
    SuiRadioManager.decorators = [
        { type: Directive, args: [{
                    selector: "form:not([ngForm]):not([[ngForm]]),ngForm,[ngForm]"
                },] },
    ];
    /** @nocollapse */
    SuiRadioManager.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    SuiRadioManager.propDecorators = {
        "_subManagers": [{ type: ContentChildren, args: [SuiRadioManager, { descendants: true },] },],
        "_renderedRadios": [{ type: ContentChildren, args: [SuiRadio, { descendants: true },] },],
    };
    return SuiRadioManager;
}());
export { SuiRadioManager };
//# sourceMappingURL=radio-manager.js.map