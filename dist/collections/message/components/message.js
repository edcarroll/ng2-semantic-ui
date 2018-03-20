import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TransitionController, Transition, TransitionDirection } from "../../../modules/transition/index";
var SuiMessage = /** @class */ (function () {
    function SuiMessage() {
        this.isDismissable = true;
        this.onDismiss = new EventEmitter();
        this.isDismissed = false;
        this.transitionController = new TransitionController();
        this.transition = "fade";
        this.transitionDuration = 300;
        this.class = "";
    }
    SuiMessage.prototype.dismiss = function () {
        var _this = this;
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, function () {
            _this.isDismissed = true;
            _this.onDismiss.emit(_this);
        }));
    };
    SuiMessage.decorators = [
        { type: Component, args: [{
                    selector: "sui-message",
                    template: "\n<div class=\"ui message {{ class }}\" *ngIf=\"!isDismissed\" [suiTransition]=\"transitionController\">\n    <i class=\"close icon\" *ngIf=\"isDismissable\" (click)=\"dismiss()\"></i>\n    <ng-content></ng-content>\n</div>\n",
                    styles: ["\n/* Fix for CSS Bug */\n.ui.icon.visible.message {\n    display: flex !important;\n}\n"]
                },] },
    ];
    /** @nocollapse */
    SuiMessage.ctorParameters = function () { return []; };
    SuiMessage.propDecorators = {
        "isDismissable": [{ type: Input },],
        "onDismiss": [{ type: Output, args: ["dismiss",] },],
        "transition": [{ type: Input },],
        "transitionDuration": [{ type: Input },],
        "class": [{ type: Input, args: ["class",] },],
    };
    return SuiMessage;
}());
export { SuiMessage };
//# sourceMappingURL=message.js.map