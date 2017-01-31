import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SUI_TRANSITION_DIRECTIVES} from './transition';
import {NewSuiTransition} from './new-transition';

@NgModule({
    imports: [CommonModule],
    declarations: [
        SUI_TRANSITION_DIRECTIVES,
        NewSuiTransition
    ],
    exports: [
        SUI_TRANSITION_DIRECTIVES,
        NewSuiTransition
    ],
    providers: []
})
export class SuiTransitionModule {}
