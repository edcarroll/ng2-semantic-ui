import {NgModule} from '@angular/core';
import {SUI_DROPDOWN_DIRECTIVES} from "./dropdown";
import {CommonModule} from "@angular/common";
import {SuiTransitionModule} from "../transition/transition.module";

@NgModule({
    imports: [CommonModule, SuiTransitionModule],
    declarations: SUI_DROPDOWN_DIRECTIVES,
    exports: SUI_DROPDOWN_DIRECTIVES
})
export class SuiDropdownModule {}
