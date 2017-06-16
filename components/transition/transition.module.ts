import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransition, Transition, TransitionDirection } from "./transition";
import { TransitionController } from "./transition-controller";

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

export {
    SuiTransition,
    Transition,
    TransitionDirection,
    TransitionController
};
