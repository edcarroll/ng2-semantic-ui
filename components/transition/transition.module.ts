import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SUI_TRANSITION_DIRECTIVES} from "./transition";

@NgModule({
    imports: [CommonModule],
    declarations: SUI_TRANSITION_DIRECTIVES,
    exports: SUI_TRANSITION_DIRECTIVES
})
export class SuiTransitionModule {}
