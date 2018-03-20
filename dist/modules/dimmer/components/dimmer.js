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
import { Component, Input, Output, HostBinding, HostListener, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { TransitionController, SuiTransition, TransitionDirection, Transition } from "../../transition/index";
var SuiDimmer = /** @class */ (function (_super) {
    __extends(SuiDimmer, _super);
    function SuiDimmer(renderer, element, changeDetector) {
        var _this = _super.call(this, renderer, element, changeDetector) || this;
        _this._isDimmed = false;
        _this.isDimmedChange = new EventEmitter();
        _this.isClickable = true;
        _this.wrapContent = true;
        _this._dimmerClasses = true;
        return _this;
    }
    Object.defineProperty(SuiDimmer.prototype, "isDimmed", {
        get: function () {
            return this._isDimmed;
        },
        set: function (value) {
            var isDimmed = !!value;
            if (!this._transitionController) {
                // Initialise transition functionality when first setting dimmed, to ensure initial state doesn't transition.
                this._transitionController = new TransitionController(isDimmed, "block");
                this.setTransitionController(this._transitionController);
                this._isDimmed = isDimmed;
            }
            else if (this._isDimmed !== isDimmed) {
                this._isDimmed = isDimmed;
                this._transitionController.stopAll();
                this._transitionController.animate(new Transition("fade", this.transitionDuration, isDimmed ? TransitionDirection.In : TransitionDirection.Out));
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiDimmer.prototype.onClick = function () {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    };
    SuiDimmer.decorators = [
        { type: Component, args: [{
                    selector: "sui-dimmer",
                    template: "\n<div [class.content]=\"wrapContent\">\n    <div [class.center]=\"wrapContent\">\n        <ng-content></ng-content>\n    </div>\n</div>\n",
                    styles: ["\n:host.dimmer {\n    transition: none;\n}\n"]
                },] },
    ];
    /** @nocollapse */
    SuiDimmer.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
    ]; };
    SuiDimmer.propDecorators = {
        "_dimmerClasses": [{ type: HostBinding, args: ["class.ui",] }, { type: HostBinding, args: ["class.dimmer",] },],
        "isDimmed": [{ type: HostBinding, args: ["class.active",] }, { type: Input },],
        "isDimmedChange": [{ type: Output },],
        "isClickable": [{ type: Input },],
        "transition": [{ type: Input },],
        "transitionDuration": [{ type: Input },],
        "wrapContent": [{ type: Input },],
        "onClick": [{ type: HostListener, args: ["click",] },],
    };
    return SuiDimmer;
}(SuiTransition));
export { SuiDimmer };
//# sourceMappingURL=dimmer.js.map