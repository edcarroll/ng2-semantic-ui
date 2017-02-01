import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SuiTransition, Transition, TransitionDirection, TransitionController} from './transition';

@NgModule({
    imports: [CommonModule],
    declarations: [
        SuiTransition
    ],
    exports: [
        SuiTransition
    ],
    providers: []
})
export class SuiTransitionModule {}

export {Transition, TransitionDirection, TransitionController};