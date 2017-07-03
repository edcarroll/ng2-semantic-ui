import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown";
import { SuiSelect, SuiSelectValueAccessor } from "./components/select";
import { SuiSelectOption } from "./components/select-option";
import { SuiMultiSelect, SuiMultiSelectValueAccessor } from "./components/multi-select";
import { SuiMultiSelectLabel } from "./components/multi-select-label";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiDropdownModule
    ],
    declarations: [
        SuiSelect,
        SuiSelectOption,
        SuiSelectValueAccessor,
        SuiMultiSelect,
        SuiMultiSelectLabel,
        SuiMultiSelectValueAccessor
    ],
    exports: [
        SuiSelect,
        SuiSelectOption,
        SuiSelectValueAccessor,
        SuiMultiSelect,
        SuiMultiSelectValueAccessor
    ]
})
export class SuiSelectModule {}
