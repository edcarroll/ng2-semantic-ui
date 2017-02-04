import {NgModule} from '@angular/core';
import {SUI_DROPDOWN_DIRECTIVES} from "./dropdown";
import {CommonModule} from "@angular/common";
import {SuiTransitionModule} from "../transition/transition.module";
import {NewSuiDropdown, NewSuiDropdownMenu, NewSuiDropdownMenuItem} from './new-dropdown';

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SUI_DROPDOWN_DIRECTIVES,
        NewSuiDropdown,
        NewSuiDropdownMenu,
        NewSuiDropdownMenuItem
    ],
    exports: [
        SUI_DROPDOWN_DIRECTIVES,
        NewSuiDropdown,
        NewSuiDropdownMenu,
        NewSuiDropdownMenuItem
    ]
})
export class SuiDropdownModule {}
