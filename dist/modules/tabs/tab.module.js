import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTabset } from "./components/tabset";
import { SuiTabHeader } from "./directives/tab-header";
import { SuiTabContent } from "./directives/tab-content";
var SuiTabsModule = /** @class */ (function () {
    function SuiTabsModule() {
    }
    SuiTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        SuiTabset,
                        SuiTabHeader,
                        SuiTabContent
                    ],
                    exports: [
                        SuiTabset,
                        SuiTabHeader,
                        SuiTabContent
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiTabsModule.ctorParameters = function () { return []; };
    return SuiTabsModule;
}());
export { SuiTabsModule };
//# sourceMappingURL=tab.module.js.map