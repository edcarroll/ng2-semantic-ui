import {NgModule} from '@angular/core';
import {SUI_MESSAGE_DIRECTIVES} from "./message";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: SUI_MESSAGE_DIRECTIVES,
    exports: SUI_MESSAGE_DIRECTIVES
})
export class SuiMessageModule {}
