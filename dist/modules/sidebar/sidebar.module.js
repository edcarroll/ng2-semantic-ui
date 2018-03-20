import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiSidebar } from "./components/sidebar";
import { SuiSidebarContainer } from "./components/sidebar-container";
import { SuiSidebarSibling } from "./components/sidebar-sibling";
var SuiSidebarModule = /** @class */ (function () {
    function SuiSidebarModule() {
    }
    SuiSidebarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        SuiSidebar,
                        SuiSidebarContainer,
                        SuiSidebarSibling
                    ],
                    exports: [
                        SuiSidebar,
                        SuiSidebarContainer,
                        SuiSidebarSibling
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiSidebarModule.ctorParameters = function () { return []; };
    return SuiSidebarModule;
}());
export { SuiSidebarModule };
//# sourceMappingURL=sidebar.module.js.map