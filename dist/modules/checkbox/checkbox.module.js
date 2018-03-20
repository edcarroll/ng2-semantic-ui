import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiCheckbox, SuiCheckboxValueAccessor } from "./components/checkbox";
import { SuiRadio, SuiRadioValueAccessor } from "./components/radio";
import { SuiRadioManager } from "./directives/radio-manager";
var SuiCheckboxModule = /** @class */ (function () {
    function SuiCheckboxModule() {
    }
    SuiCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        SuiCheckbox,
                        SuiCheckboxValueAccessor,
                        SuiRadio,
                        SuiRadioValueAccessor,
                        SuiRadioManager
                    ],
                    exports: [
                        SuiCheckbox,
                        SuiCheckboxValueAccessor,
                        SuiRadio,
                        SuiRadioValueAccessor,
                        SuiRadioManager
                    ]
                },] },
    ];
    /** @nocollapse */
    SuiCheckboxModule.ctorParameters = function () { return []; };
    return SuiCheckboxModule;
}());
export { SuiCheckboxModule };
//# sourceMappingURL=checkbox.module.js.map