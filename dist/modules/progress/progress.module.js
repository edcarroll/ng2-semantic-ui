import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiProgress } from "./components/progress";
var SuiProgressModule = /** @class */ (function () {
    function SuiProgressModule() {
    }
    SuiProgressModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        SuiProgress
                    ],
                    exports: [
                        SuiProgress
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiProgressModule.ctorParameters = function () { return []; };
    return SuiProgressModule;
}());
export { SuiProgressModule };
//# sourceMappingURL=progress.module.js.map