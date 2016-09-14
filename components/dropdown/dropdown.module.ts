import {NgModule} from '@angular/core';
import {SUI_DROPDOWN_DIRECTIVES} from "./dropdown";

@NgModule({
    declarations: SUI_DROPDOWN_DIRECTIVES,
    exports: SUI_DROPDOWN_DIRECTIVES
})
export class SuiDropdownModule {}
