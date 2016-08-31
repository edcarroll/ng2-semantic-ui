import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SuiDropdownModule} from "../dropdown/dropdown.module";
import {SuiSearchModule} from "../search/search.module";
import {SUI_SELECT_DIRECTIVES} from "./select";

@NgModule({
    imports: [CommonModule, FormsModule, SuiDropdownModule, SuiSearchModule],
    declarations: SUI_SELECT_DIRECTIVES,
    exports: SUI_SELECT_DIRECTIVES
})
export class SuiSelectModule {}
