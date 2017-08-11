import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiCheckbox, SuiCheckboxValueAccessor } from "./components/checkbox";
import { SuiRadio, SuiRadioValueAccessor } from "./components/radio";
import { SuiRadioManager } from "./directives/radio-manager";

const imports = [
    CommonModule,
    FormsModule
];

const declarations = [
    SuiCheckbox,
    SuiCheckboxValueAccessor,
    SuiRadio,
    SuiRadioValueAccessor,
    SuiRadioManager
];

const exports = [
    SuiCheckbox,
    SuiCheckboxValueAccessor,
    SuiRadio,
    SuiRadioValueAccessor,
    SuiRadioManager
];

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiCheckboxRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiCheckboxModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiCheckboxRootModule
        };
    }
}
