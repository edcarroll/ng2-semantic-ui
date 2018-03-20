import { Renderer2, ElementRef, Directive, Input, HostBinding, ChangeDetectorRef } from "@angular/core";
import { TransitionController } from "../classes/transition-controller";
var SuiTransition = /** @class */ (function () {
    function SuiTransition(_renderer, _element, _changeDetector) {
        this._renderer = _renderer;
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.transitionClass = true;
    }
    Object.defineProperty(SuiTransition.prototype, "suiTransition", {
        set: function (tC) {
            // Set the transition controller (e.g. '<div [suiTransition]="transitionController"></div>').
            this.setTransitionController(tC);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTransition.prototype, "isVisible", {
        get: function () {
            if (this._controller) {
                return this._controller.isVisible;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTransition.prototype, "isHidden", {
        get: function () {
            if (this._controller) {
                return this._controller.isHidden;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    // Initialises the controller with the injected renderer and elementRef.
    // Initialises the controller with the injected renderer and elementRef.
    SuiTransition.prototype.setTransitionController = 
    // Initialises the controller with the injected renderer and elementRef.
    function (transitionController) {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this._element.nativeElement);
        this._controller.registerChangeDetector(this._changeDetector);
    };
    SuiTransition.decorators = [
        { type: Directive, args: [{
                    selector: "[suiTransition]",
                    exportAs: "transition"
                },] },
    ];
    /** @nocollapse */
    SuiTransition.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
    ]; };
    SuiTransition.propDecorators = {
        "suiTransition": [{ type: Input },],
        "transitionClass": [{ type: HostBinding, args: ["class.transition",] },],
        "isVisible": [{ type: HostBinding, args: ["class.visible",] },],
        "isHidden": [{ type: HostBinding, args: ["class.hidden",] },],
    };
    return SuiTransition;
}());
export { SuiTransition };
//# sourceMappingURL=transition.js.map