import { Component } from "@angular/core";
import { SuiTransition, Transition, TransitionDirection, TransitionController } from "ng2-semantic-ui";
import { ApiDefinition } from "../../../components/api/api.component";

const exampleStandardTemplate = `
<div class="ui segment">
    <img src="https://goo.gl/VUcnwx" class="ui image" [suiTransition]="transitionController">
</div>
<sui-select class="selection" [(ngModel)]="transitionName" [options]="transitions" [isSearchable]="true" #animSelect>
    <sui-select-option *ngFor="let a of animSelect.availableOptions" [value]="a"></sui-select-option>
</sui-select>
<button class="ui button" (click)="animate(transitionName)">Animate</button>
`;

@Component({
    selector: "demo-page-transition",
    templateUrl: "./transition.page.html"
})
export class TransitionPage {
    public api:ApiDefinition = [
        {
            selector: "[suiTransition]",
            properties: [
                {
                    name: "suiTransition",
                    type: "TransitionController",
                    description: "Sets the transition controller.",
                    required: true
                }
            ]
        }
    ];

    public transitionControllerCode:string = `
import {TransitionController} from "ng2-semantic-ui";

@Component({})
export class MyComponent {
    public transitionController = new TransitionController();
}
`;

    public transitionElementCode:string = `
<div class="ui segment">
    <img src="https://goo.gl/VUcnwx" class="ui image" [suiTransition]="transitionController">
</div>
`;

    public transitionExampleCode:string = `
import {TransitionController, Transition, TransitionDirection} from "ng2-semantic-ui";

@Component({})
export class MyComponent {
    public transitionController = new TransitionController();
    
    public animate(transitionName:string = "scale") {
        this.transitionController.animate(
            new Transition(transitionName, 500, TransitionDirection.In, () => console.log("Completed transition.")));
    }
}
`;

    public exampleStandardTemplate:string = exampleStandardTemplate;

    public transitionControllerInterface:string = `
this.ctrl = new TransitionController(isInitiallyVisible:boolean = false, display:string = "block");
// isInitiallyVisible sets whether the element being animated starts off visible.
// display sets the 'display' style set on the animated element when it is visible.

this.ctrl.animate(transition:Transition);
// Adds a transition to the queue.

/* Example */
const t = new Transition(
    name:string, // Name of the transition. See the above select for the available options.
    duration:number = 250, // Duration of the transition in milliseconds.
    direction:TransitionDirection = TransitionDirection.Either, // Transition direction (In, Out, Either, Static).
    onComplete:(() => void) = () => {}) // Callback function run when the transition has completed.

this.ctrl.animate(t);

this.ctrl.stop(transition?:Transition);
// Stops the current or provided transition, but continues with the queued transitions.

this.ctrl.stopAll();
// Stops the current transition, and empties the queue.

this.ctrl.clearQueue();
// Continues with the current transition, but empties the queue.
`;

    public advancedExampleCode:string = `
import {SuiTransition, TransitionController, Transition} from "ng2-semantic-ui";

@Component({})
export class MyComponent extends SuiTransition {
    private _transitionController:TransitionController;

    constructor(renderer:Renderer2, element:ElementRef, changeDetector:ChangeDetectorRef) {
        super(renderer, element, changeDetector);

        this._transitionController = new TransitionController(false);
        this.setTransitionController(this._transitionController);
        // setTransitionController is a method inherited from SuiTransition.
    }

    public exampleMethod() {
        // You can now animate the host element using the transition controller:
        this._transitionController.animate(new Transition(...));
    }
}
`;
}

@Component({
    selector: "example-transition-standard",
    template: exampleStandardTemplate
})
export class TransitionExampleStandard {
    public transitionController:TransitionController = new TransitionController();

    public transitions:string[] = [
        "scale", "fade", "fade up", "fade down",
        "fade left", "fade right", "horizontal flip", "vertical flip",
        "drop", "fly left", "fly right", "fly up",
        "fly down", "swing left", "swing right", "swing up",
        "swing down", "browse", "browse right", "slide left",
        "slide right", "slide up", "slide down", "jiggle",
        "flash", "shake", "pulse", "tada", "bounce"
    ];

    public transitionName:string = "scale";

    public animate(transitionName:string = "scale"):void {
        this.transitionController.animate(
            new Transition(transitionName, 500, TransitionDirection.Either, () => console.log("Completed transition.")));
    }
}

export const TransitionPageComponents = [TransitionPage, TransitionExampleStandard];
