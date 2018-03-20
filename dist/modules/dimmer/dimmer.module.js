import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/index";
import { SuiDimmer } from "./components/dimmer";
var SuiDimmerModule = /** @class */ (function () {
    function SuiDimmerModule() {
    }
    SuiDimmerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SuiTransitionModule
                    ],
                    declarations: [
                        SuiDimmer
                    ],
                    exports: [
                        SuiDimmer
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiDimmerModule.ctorParameters = function () { return []; };
    return SuiDimmerModule;
}());
export { SuiDimmerModule };
//# sourceMappingURL=dimmer.module.js.map