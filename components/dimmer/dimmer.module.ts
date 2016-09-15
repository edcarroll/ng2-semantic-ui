import {NgModule} from '@angular/core';
import {SUI_DIMMER_DIRECTIVES} from "./dimmer";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: SUI_DIMMER_DIRECTIVES,
    exports: SUI_DIMMER_DIRECTIVES
})
export class SuiDimmerModule {}
