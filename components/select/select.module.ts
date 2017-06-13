import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SuiDropdownModule} from "../dropdown/dropdown.module";
import {SuiSearchModule} from "../search/search.module";
import {SuiTransitionModule} from "../transition/transition.module";
import {SuiSelect, SuiSelectValueAccessor} from "./select";
import {SuiSelectOption} from "./select-option";
import {SuiMultiSelect, SuiMultiSelectValueAccessor} from "./multi-select";
import {SuiMultiSelectLabel} from "./multi-select-label";

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
