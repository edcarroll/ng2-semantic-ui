import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SuiDropdownModule} from "../dropdown/dropdown.module";
import {SuiSearchModule} from "../search/search.module";
import {SUI_SELECT_DIRECTIVES} from "./select";
import {SuiTransitionModule} from "../transition/transition.module";

@NgModule({
    imports: [CommonModule, FormsModule, SuiDropdownModule, SuiSearchModule, SuiTransitionModule],
    declarations: SUI_SELECT_DIRECTIVES,
    exports: SUI_SELECT_DIRECTIVES
})
export class SuiSelectModule {}
