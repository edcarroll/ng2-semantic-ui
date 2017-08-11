import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown";
import { SuiUtilityModule } from "../../misc/util";
import { SuiLocalizationModule } from "../../behaviors/localization";
import { SuiSelect, SuiSelectValueAccessor } from "./components/select";
import { SuiSelectOption } from "./components/select-option";
import { SuiSelectSearch } from "./directives/select-search";
import { SuiMultiSelect, SuiMultiSelectValueAccessor } from "./components/multi-select";
import { SuiMultiSelectLabel } from "./components/multi-select-label";

const imports = [
    CommonModule,
    FormsModule
];

const declarations = [
    SuiSelect,
    SuiSelectOption,
    SuiSelectSearch,
    SuiSelectValueAccessor,
    SuiMultiSelect,
    SuiMultiSelectLabel,
    SuiMultiSelectValueAccessor
];

const exports = [
    SuiSelect,
    SuiSelectOption,
    SuiSelectSearch,
    SuiSelectValueAccessor,
    SuiMultiSelect,
    SuiMultiSelectValueAccessor
];

@NgModule({
    imports: [
        ...imports,
        SuiDropdownModule.forRoot(),
        SuiUtilityModule.forRoot(),
        SuiLocalizationModule.forRoot()
    ],
    declarations,
    exports
})
export class SuiSelectRootModule {}

@NgModule({
    imports: [
        ...imports,
        SuiDropdownModule,
        SuiUtilityModule,
        SuiLocalizationModule
    ],
    declarations,
    exports
})
export class SuiSelectModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiSelectRootModule
        };
    }
}
