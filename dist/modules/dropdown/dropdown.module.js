import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/index";
import { SuiDropdown } from "./directives/dropdown";
import { SuiDropdownMenu, SuiDropdownMenuItem } from "./directives/dropdown-menu";
var SuiDropdownModule = /** @class */ (function () {
    function SuiDropdownModule() {
    }
    SuiDropdownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SuiTransitionModule
                    ],
                    declarations: [
                        SuiDropdown,
                        SuiDropdownMenu,
                        SuiDropdownMenuItem
                    ],
                    exports: [
                        SuiDropdown,
                        SuiDropdownMenu,
                        SuiDropdownMenuItem
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiDropdownModule.ctorParameters = function () { return []; };
    return SuiDropdownModule;
}());
export { SuiDropdownModule };
//# sourceMappingURL=dropdown.module.js.map