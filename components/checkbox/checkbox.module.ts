import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SuiCheckbox, SuiCheckboxValueAccessor} from './checkbox';
import {SuiRadioButton, SuiRadioButtonValueAccessor} from './radiobutton';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        SuiCheckbox,
        SuiCheckboxValueAccessor,
        SuiRadioButton,
        SuiRadioButtonValueAccessor
    ],
    exports: [
        SuiCheckbox,
        SuiCheckboxValueAccessor,
        SuiRadioButton,
        SuiRadioButtonValueAccessor
    ]
})
export class SuiCheckboxModule {}
