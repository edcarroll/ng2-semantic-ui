import {NgModule} from '@angular/core';
import {SUI_DROPDOWN_DIRECTIVES, SUI_DROPDOWN_PROVIDERS} from "./dropdown";

@NgModule({
    declarations: SUI_DROPDOWN_DIRECTIVES,
    exports: SUI_DROPDOWN_DIRECTIVES,
    providers: SUI_DROPDOWN_PROVIDERS
})
export class SuiDropdownModule {}
