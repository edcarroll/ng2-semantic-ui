import { Renderer2, ElementRef, Directive, Input, HostBinding, ChangeDetectorRef } from "@angular/core";
import { TransitionController } from "./transition-controller";

// Possible directions for a transition.
export enum TransitionDirection {
    In,
    Out,
    Either,
    Static
}

export class Transition {
    public readonly type:string;

    public readonly duration:number;

    public direction:TransitionDirection;

    // Converts TransitionDirection to class name.
    public get directionClass():string {
        switch (this.direction) {
            case TransitionDirection.In: return "in";
            case TransitionDirection.Out: return "out";
        }
    }

    // Stores the individual classes for the transition, e.g. "fade out" -> ["fade", "out"].
    public readonly classes:string[];

    public onComplete:() => void;

    constructor(name:string,
                duration:number = 250,
                direction:TransitionDirection = TransitionDirection.Either,
                onComplete:(() => void) = () => {}) {

        this.type = name;

        // We set a minimum duration of 1ms, to give the appearance of an immediate transition
        // whilst allowing positioning calculations to happen without a visible flicker.
        this.duration = Math.max(duration, 1);

        this.direction = direction;
        this.classes = this.type.split(" ");
        this.onComplete = onComplete;
    }
}

@Directive({
    selector: "[suiTransition]",
    exportAs: "transition"
})
export class SuiTransition {
    // Each transition must have a controller associated that dispatches the transitions.
    private _controller:TransitionController;

    @Input()
    public set suiTransition(tC:TransitionController) {
        // Set the transition controller (e.g. '<div [suiTransition]="transitionController"></div>').
        this.setTransitionController(tC);
    }

    @HostBinding("class.transition")
    public transitionClass:boolean = true;

    @HostBinding("class.visible")
    public get isVisible():boolean {
        if (this._controller) {
            return this._controller.isVisible;
        }
        return false;
    }

    @HostBinding("class.hidden")
    public get isHidden():boolean {
        if (this._controller) {
            return this._controller.isHidden;
        }
        return false;
    }

    constructor(private _renderer:Renderer2, private _element:ElementRef, private _changeDetector:ChangeDetectorRef) {}

    // Initialises the controller with the injected renderer and elementRef.
    public setTransitionController(transitionController:TransitionController):void {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this._element.nativeElement);
        this._controller.registerChangeDetector(this._changeDetector);
    }
}
