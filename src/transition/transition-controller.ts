import { Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { Transition, TransitionDirection } from "./transition";

export class TransitionController {
    private _renderer:Renderer2;

    private _element:ElementRef;

    private _changeDetector:ChangeDetectorRef;

    // Used to delay animations until we have an element to animate.
    private get _isReady():boolean {
        return this._renderer != undefined && this._element != undefined && this._changeDetector != undefined;
    }

    // Sets the 'display' style when visible.
    private _display:string;

    // Stores queued transitions.
    private _queue:Transition[];

    private _isAnimating:boolean;

    public get isAnimating():boolean {
        return this._isAnimating;
    }

    // Set when the element is visible, and while it is transitioning out.
    private _isVisible:boolean;

    public get isVisible():boolean {
        return this._isVisible;
    }

    // Set when the element is hidden, and not while it is transitioning.
    private _isHidden:boolean;

    public get isHidden():boolean {
        return this._isHidden;
    }

    // Gets the first transition in the queue.
    private get _queueFirst():Transition {
        return this._queue[0];
    }

    // Gets the last transition in the queue.
    private get _queueLast():Transition {
        return this._queue[this._queue.length - 1];
    }

    // Stores the setTimeout pointer for cancelling the animation callback.
    private _animationTimeout:number;

    constructor(isInitiallyVisible:boolean = true, display:string = "block") {
        // isInitiallyVisible sets whether the element starts out visible.
        this._isVisible = isInitiallyVisible;
        this._isHidden = !this._isVisible;

        this._display = display;
        this._queue = [];

        this._isAnimating = false;
    }

    // Sets the renderer to be used for animating.
    public registerRenderer(renderer:Renderer2):void {
        this._renderer = renderer;
        this.performTransition();
    }

    // Sets the element to perform the animations on.
    public registerElement(element:ElementRef):void {
        this._element = element;
        this.performTransition();
    }

    // Sets the change detector to detect changes when using ChangeDetectionStrategy.OnPush.
    public registerChangeDetector(changeDetector:ChangeDetectorRef):void {
        this._changeDetector = changeDetector;
        this.performTransition();
    }

    public animate(transition:Transition):void {
        // Test if transition is one of the list that doesn't change the visible state.
        // Should these eventually become classes?
        const isDirectionless = ["jiggle", "flash", "shake", "pulse", "tada", "bounce"].indexOf(transition.type) !== -1;
        if (isDirectionless) {
            transition.direction = TransitionDirection.Static;
        } else if (transition.direction == undefined || transition.direction === TransitionDirection.Either) {
            // Set the direction to the opposite of the current visible state automatically if not set, or set to either direction.
            transition.direction = this._isVisible ? TransitionDirection.Out : TransitionDirection.In;
            if (this._queueLast) {
                // If there is an transition in the queue already, set the direction to the opposite of the direction of that transition.
                if (this._queueLast.direction === TransitionDirection.In) {
                    transition.direction = TransitionDirection.Out;
                } else if (this._queueLast.direction === TransitionDirection.Out) {
                    transition.direction = TransitionDirection.In;
                }
            }
        }

        // Store the transition in the queue before attempting to perform it.
        this._queue.push(transition);

        this.performTransition();
    }

    private performTransition():void {
        if (!this._isReady || this._isAnimating || !this._queueFirst) {
            // Don't transition until we are ready, or if we are animating, or if there aren't any transitions in the queue.
            return;
        }

        this._isAnimating = true;

        const transition = this._queueFirst;

        // Set the Semantic UI classes for transitioning.
        transition.classes.forEach(c => this._renderer.addClass(this._element, c));
        this._renderer.addClass(this._element, `animating`);
        this._renderer.addClass(this._element, transition.directionClass);

        // Set the Semantic UI styles for transitioning.
        this._renderer.setStyle(this._element, `animationDuration`, `${transition.duration}ms`);
        this._renderer.setStyle(this._element, `display`, this._display);

        if (transition.direction === TransitionDirection.In) {
            // Unset hidden if we are transitioning in.
            this._isHidden = false;
        }

        // Wait the length of the animation before calling the complete callback.
        this._animationTimeout = window.setTimeout(() => this.finishTransition(transition), transition.duration);
    }

    // Called when a transition has completed.
    private finishTransition(transition:Transition):void {
        // Unset the Semantic UI classes & styles for transitioning.
        transition.classes.forEach(c => this._renderer.removeClass(this._element, c));
        this._renderer.removeClass(this._element, `animating`);
        this._renderer.removeClass(this._element, transition.directionClass);

        this._renderer.removeStyle(this._element, `animationDuration`);
        this._renderer.removeStyle(this._element, `display`);

        if (transition.direction === TransitionDirection.In) {
            // If we have just animated in, we are now visible.
            this._isVisible = true;
        } else if (transition.direction === TransitionDirection.Out) {
            // If we have transitioned out, we should be invisible and hidden.
            this._isVisible = false;
            this._isHidden = true;
        }

        if (transition.onComplete) {
            // Call the user-defined transition callback.
            transition.onComplete();
        }

        // Delete the transition from the queue.
        this._queue.shift();
        this._isAnimating = false;

        this._changeDetector.markForCheck();

        // Immediately attempt to perform another transition.
        this.performTransition();
    }

    // Stops the current transition, leaves the rest of the queue intact.
    public stop(transition:Transition = this._queueFirst):void {
        if (!transition || !this._isAnimating) {
            return;
        }

        clearTimeout(this._animationTimeout);
        this.finishTransition(transition);
    }

    // Stops the current transition, and empties the queue.
    public stopAll():void {
        this.clearQueue();
        this.stop();
    }

    // Empties the transition queue but carries on with the current transition.
    public clearQueue():void {
        if (this.isAnimating) {
            this._queue = [this._queueFirst];
            return;
        }
        this._queue = [];
    }
}
