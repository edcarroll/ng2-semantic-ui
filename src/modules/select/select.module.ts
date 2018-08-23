import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown/internal";
import { SuiUtilityModule } from "../../misc/util/internal";
import { SuiLocalizationModule } from "../../behaviors/localization/internal";
import { SuiSelect, SuiSelectValueAccessor } from "./components/select";
import { SuiSelectOption } from "./components/select-option";
import { SuiSelectSearch } from "./directives/select-search";
import { SuiMultiSelect, SuiMultiSelectValueAccessor } from "./components/multi-select";
import { SuiMultiSelectLabel } from "./components/multi-select-label";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiDropdownModule,
        SuiUtilityModule,
        SuiLocalizationModule
    ],
    declarations: [
        SuiSelect,
        SuiSelectOption,
        SuiSelectSearch,
        SuiSelectValueAccessor,
        SuiMultiSelect,
        SuiMultiSelectLabel,
        SuiMultiSelectValueAccessor
    ],
    exports: [
        SuiSelect,
        SuiSelectOption,
        SuiSelectSearch,
        SuiSelectValueAccessor,
        SuiMultiSelect,
        SuiMultiSelectValueAccessor
    ]
})
export class SuiSelectModule {}
