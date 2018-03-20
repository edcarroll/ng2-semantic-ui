import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCollapseModule } from "../collapse/index";
import { SuiTransitionModule } from "../transition/index";
import { SuiAccordion } from "./components/accordion";
import { SuiAccordionPanel } from "./components/accordion-panel";
var SuiAccordionModule = /** @class */ (function () {
    function SuiAccordionModule() {
    }
    SuiAccordionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SuiCollapseModule,
                        SuiTransitionModule
                    ],
                    declarations: [
                        SuiAccordion,
                        SuiAccordionPanel
                    ],
                    exports: [
                        SuiAccordion,
                        SuiAccordionPanel
                    ],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    SuiAccordionModule.ctorParameters = function () { return []; };
    return SuiAccordionModule;
}());
export { SuiAccordionModule };
//# sourceMappingURL=accordion.module.js.map