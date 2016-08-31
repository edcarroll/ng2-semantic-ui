import {NgModule} from '@angular/core';
import {SUI_DIMMER_DIRECTIVES} from "./dimmer";

@NgModule({
    declarations: SUI_DIMMER_DIRECTIVES,
    exports: SUI_DIMMER_DIRECTIVES
})
export class SuiDimmerModule {}
