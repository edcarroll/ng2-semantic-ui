import {NgModule} from '@angular/core';
import {SUI_MESSAGE_DIRECTIVES} from "./message";
import {CommonModule} from "@angular/common";
import {SuiTransitionModule} from "../transition/transition.module";

@NgModule({
    imports: [CommonModule, SuiTransitionModule],
    declarations: SUI_MESSAGE_DIRECTIVES,
    exports: SUI_MESSAGE_DIRECTIVES
})
export class SuiMessageModule {}
