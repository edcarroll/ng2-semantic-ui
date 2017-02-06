import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SuiDropdownModule} from "../dropdown/dropdown.module";
import {SuiTransitionModule} from "../transition/transition.module";
import {SuiSearch} from './new-search';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiDropdownModule
    ],
    declarations: [
        SuiSearch
    ],
    exports: [
        SuiSearch
    ]
})
export class SuiSearchModule {}
