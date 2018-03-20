import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiComponentFactory } from "./services/component-factory.service";
var SuiUtilityModule = /** @class */ (function () {
    function SuiUtilityModule() {
    }
    SuiUtilityModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    providers: [
                        SuiComponentFactory
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiUtilityModule.ctorParameters = function () { return []; };
    return SuiUtilityModule;
}());
export { SuiUtilityModule };
//# sourceMappingURL=util.module.js.map