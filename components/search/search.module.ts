import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SuiDropdownModule} from "../dropdown/dropdown.module";
import {SUI_SEARCH_DIRECTIVES} from "./search";

@NgModule({
    imports: [CommonModule, FormsModule, SuiDropdownModule],
    declarations: SUI_SEARCH_DIRECTIVES,
    exports: SUI_SEARCH_DIRECTIVES
})
export class SuiSearchModule {}
