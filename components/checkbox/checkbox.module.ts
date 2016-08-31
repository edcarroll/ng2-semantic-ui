import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SUI_CHECKBOX_DIRECTIVES} from "./checkbox";
import {SUI_RADIOBUTTON_DIRECTIVES} from "./radiobutton";

@NgModule({
    imports: [FormsModule],
    declarations: [SUI_CHECKBOX_DIRECTIVES, SUI_RADIOBUTTON_DIRECTIVES],
    exports: [SUI_CHECKBOX_DIRECTIVES, SUI_RADIOBUTTON_DIRECTIVES]
})
export class SuiCheckboxModule {}
