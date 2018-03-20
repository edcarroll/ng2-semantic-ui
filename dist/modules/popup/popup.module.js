import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/index";
import { SuiUtilityModule } from "../../misc/util/index";
import { SuiPopupDirective } from "./directives/popup.directive";
import { SuiPopupArrow } from "./components/popup-arrow";
import { SuiPopup } from "./components/popup";
import { SuiPopupConfig } from "./services/popup.service";
var SuiPopupModule = /** @class */ (function () {
    function SuiPopupModule() {
    }
    SuiPopupModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SuiTransitionModule,
                        SuiUtilityModule
                    ],
                    declarations: [
                        SuiPopupDirective,
                        SuiPopupArrow,
                        SuiPopup
                    ],
                    exports: [
                        SuiPopupDirective,
                        SuiPopup
                    ],
                    providers: [
                        SuiPopupConfig
                    ],
                    entryComponents: [
                        SuiPopup
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiPopupModule.ctorParameters = function () { return []; };
    return SuiPopupModule;
}());
export { SuiPopupModule };
//# sourceMappingURL=popup.module.js.map