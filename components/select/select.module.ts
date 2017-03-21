import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SuiDropdownModule} from "../dropdown/dropdown.module";
import {SuiSearchModule} from "../search/search.module";
import {SUI_SELECT_DIRECTIVES} from "./select";
import {SuiTransitionModule} from "../transition/transition.module";

import {SuiSelect, SuiSelectValueAccessor} from '../select-new/select';
import {SuiSelectOption} from '../select-new/select-option';
import {SuiMultiSelect, SuiMultiSelectValueAccessor} from '../select-new/multi-select';
import {SuiMultiSelectLabel} from '../select-new/multi-select-label';

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
