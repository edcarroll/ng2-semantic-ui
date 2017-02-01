import {NgModule} from '@angular/core';
import {SUI_DROPDOWN_DIRECTIVES} from "./dropdown";
import {CommonModule} from "@angular/common";
import {SuiTransitionModule} from "../transition/transition.module";
import {NewSuiDropdown, NewSuiDropdownMenu} from './new-dropdown';

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SUI_DROPDOWN_DIRECTIVES,
        NewSuiDropdown,
        NewSuiDropdownMenu
    ],
    exports: [
        SUI_DROPDOWN_DIRECTIVES,
        NewSuiDropdown,
        NewSuiDropdownMenu
    ]
})
export class SuiDropdownModule {}
