import { Component, Input, HostBinding, ContentChildren, QueryList } from "@angular/core";
import { SuiAccordionPanel } from "./accordion-panel";
import { SuiAccordionService } from "../services/accordion.service";
var SuiAccordion = /** @class */ (function () {
    function SuiAccordion() {
        // Accordion service is unique to each set of panels.
        this._service = new SuiAccordionService();
        this.accordionClasses = true;
    }
    Object.defineProperty(SuiAccordion.prototype, "closeOthers", {
        get: function () {
            return this._service.closeOthers;
        },
        set: function (value) {
            this._service.closeOthers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordion.prototype, "transition", {
        set: function (transition) {
            this._service.transition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordion.prototype, "transitionDuration", {
        set: function (duration) {
            this._service.transitionDuration = duration;
        },
        enumerable: true,
        configurable: true
    });
    SuiAccordion.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.updatePanels();
        // Reconnect panels after they have updated.
        this._panels.changes.subscribe(function () { return _this.updatePanels(); });
    };
    SuiAccordion.prototype.updatePanels = function () {
        var _this = this;
        this._panels.forEach(function (p) { return _this._service.addPanel(p); });
    };
    SuiAccordion.decorators = [
        { type: Component, args: [{
                    selector: "sui-accordion",
                    template: "\n<ng-content></ng-content>\n",
                    styles: ["\n/* Fix for general styling issues */\n:host {\n    display: block;\n}\n\n/* Fix for styled border issue */\n:host.styled sui-accordion-panel:first-child .title {\n    border-top: none\n}\n"]
                },] },
    ];
    /** @nocollapse */
    SuiAccordion.ctorParameters = function () { return []; };
    SuiAccordion.propDecorators = {
        "accordionClasses": [{ type: HostBinding, args: ["class.ui",] }, { type: HostBinding, args: ["class.accordion",] },],
        "closeOthers": [{ type: Input },],
        "transition": [{ type: Input },],
        "transitionDuration": [{ type: Input },],
        "_panels": [{ type: ContentChildren, args: [SuiAccordionPanel,] },],
    };
    return SuiAccordion;
}());
export { SuiAccordion };
//# sourceMappingURL=accordion.js.map