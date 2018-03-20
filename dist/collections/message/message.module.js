import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../../modules/transition/index";
import { SuiMessage } from "./components/message";
var SuiMessageModule = /** @class */ (function () {
    function SuiMessageModule() {
    }
    SuiMessageModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SuiTransitionModule
                    ],
                    declarations: [
                        SuiMessage
                    ],
                    exports: [
                        SuiMessage
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiMessageModule.ctorParameters = function () { return []; };
    return SuiMessageModule;
}());
export { SuiMessageModule };
//# sourceMappingURL=message.module.js.map