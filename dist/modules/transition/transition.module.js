import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransition } from "./directives/transition";
var SuiTransitionModule = /** @class */ (function () {
    function SuiTransitionModule() {
    }
    SuiTransitionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [
                        SuiTransition
                    ],
                    exports: [
                        SuiTransition
                    ],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    SuiTransitionModule.ctorParameters = function () { return []; };
    return SuiTransitionModule;
}());
export { SuiTransitionModule };
//# sourceMappingURL=transition.module.js.map