import { Component, ViewChild, ViewContainerRef, HostBinding, Input, TemplateRef } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/index";
// See https://github.com/Microsoft/TypeScript/issues/13449.
var templateRef = TemplateRef;
var SuiSearchResult = /** @class */ (function () {
    function SuiSearchResult(componentFactory) {
        this.componentFactory = componentFactory;
        this._optionClasses = true;
        // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
        this.formatter = function (value) { return ""; };
    }
    Object.defineProperty(SuiSearchResult.prototype, "template", {
        get: function () {
            return this._template;
        },
        set: function (template) {
            this._template = template;
            if (this.template) {
                this.componentFactory.createView(this.templateSibling, this.template, {
                    $implicit: this.value,
                    query: this.query
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiSearchResult.decorators = [
        { type: Component, args: [{
                    selector: "sui-search-result",
                    template: "\n<span #templateSibling></span>\n<span *ngIf=\"!template\" [innerHTML]=\"formatter(value, query)\"></span>\n"
                },] },
    ];
    /** @nocollapse */
    SuiSearchResult.ctorParameters = function () { return [
        { type: SuiComponentFactory, },
    ]; };
    SuiSearchResult.propDecorators = {
        "_optionClasses": [{ type: HostBinding, args: ["class.result",] },],
        "value": [{ type: Input },],
        "query": [{ type: Input },],
        "formatter": [{ type: Input },],
        "template": [{ type: Input },],
        "templateSibling": [{ type: ViewChild, args: ["templateSibling", { read: ViewContainerRef },] },],
    };
    return SuiSearchResult;
}());
export { SuiSearchResult };
//# sourceMappingURL=search-result.js.map