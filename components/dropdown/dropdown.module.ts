import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SuiTransitionModule} from "../transition/transition.module";
import {SuiDropdown} from './dropdown';
import {SuiDropdownMenu, SuiDropdownMenuItem} from './dropdown-menu';
import {DropdownService, DropdownAutoCloseType} from './dropdown.service';

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiDropdown,
        SuiDropdownMenu,
        SuiDropdownMenuItem
    ],
    exports: [
        SuiDropdown,
        SuiDropdownMenu,
        SuiDropdownMenuItem
    ]
})
export class SuiDropdownModule {}

export {DropdownService, DropdownAutoCloseType};