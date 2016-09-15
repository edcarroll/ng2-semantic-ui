import { Component } from '@angular/core';
import {SuiTransition} from "../../../../components/transition/transition";

@Component({
  selector: 'demo-page-transition',
  templateUrl: 'transition.page.html',
  styleUrls: ['transition.page.css']
})
export class TransitionPage {
    public api = [
        {
            selector: "[suiTransition]"
        }
    ];

    public exampleStandardTemplate:string = `
<div class="ui segment">
    <img src="https://lerebooks.files.wordpress.com/2012/11/eye.jpg?w=150" class="ui image" suiTransition #transition="transition">
</div>
<sui-select [(ngModel)]="selectedTransition" [options]="transitions" [isSearchable]="true" #animSelect>
    <sui-select-option *ngFor="let a of animSelect.availableOptions" [value]="a"></sui-select-option>
</sui-select>
<button class="ui button" (click)="transition.animate({ name: selectedTransition, duration: 500 })">Animate</button>
`;

    public advancedExampleCode:string = `
@Component()
export class MyComponent {
    private transition:SuiTransition;
    constructor(el:ElementRef, renderer:Renderer) {
        //You can use a @ViewChild() to use a different element than the root.
        this.transition = new SuiTransition(el, renderer);
    }
    
    public animate() {
        this.transition.animate({
            name: /* Transition Name */,
            duration?: /* Duration in ms (default 250)*/,
            direction?: /* Direction (in or out), leave blank for automatic */,
            display?: /* Which display styling to use when animating (default 'block') */,
            callback?: /* Callback called when the animation is finished */
        });
    }
    
    public otherPropertiesMethods() {
        // Whether an animation is currently running
        this.transition.isAnimating;
        // Stop the currently running transition
        this.transition.stop();
        // Stop the currently running transition and all queued transitions
        this.transition.stopAll();
        // Stop all animations not including the current one
        this.transition.clearQueue();
    }
}
`
}

@Component({
    selector: 'transition-example-standard',
    template: new TransitionPage().exampleStandardTemplate
})
export class TransitionExampleStandard {
    public transitions = ["scale", "fade", "fade up", "fade down", "fade left", "fade right", "horizontal flip", "vertical flip",
        "drop", "fly left", "fly right", "fly up", "fly down", "swing left", "swing right", "swing up", "swing down", "browse", "browse right",
        "slide left", "slide right", "slide up", "slide down", "jiggle", "flash", "shake", "pulse", "tada", "bounce"];
    public selectedTransition = "fade";
}

export const TransitionPageComponents:Array<any> = [TransitionPage, TransitionExampleStandard];
