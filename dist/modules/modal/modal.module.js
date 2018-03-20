import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDimmerModule } from "../dimmer/index";
import { SuiTransitionModule } from "../transition/index";
import { SuiUtilityModule } from "../../misc/util/index";
import { SuiModalService } from "./services/modal.service";
import { SuiModal } from "./components/modal";
var SuiModalModule = /** @class */ (function () {
    function SuiModalModule() {
    }
    SuiModalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SuiDimmerModule,
                        SuiTransitionModule,
                        SuiUtilityModule
                    ],
                    declarations: [
                        SuiModal
                    ],
                    exports: [
                        SuiModal
                    ],
                    providers: [
                        SuiModalService
                    ],
                    entryComponents: [
                        SuiModal
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiModalModule.ctorParameters = function () { return []; };
    return SuiModalModule;
}());
export { SuiModalModule };
//# sourceMappingURL=modal.module.js.map