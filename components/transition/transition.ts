import {Renderer, ElementRef, Directive, Input, HostBinding} from '@angular/core';

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

    public get directionClass() {
        switch (this.direction) {
            case TransitionDirection.In: return "in";
            case TransitionDirection.Out: return "out";
        }
    }

    public readonly classes:string[];

    public onComplete:() => any;

    constructor(name:string, duration:number = 250, direction:TransitionDirection = TransitionDirection.Either, onComplete:(() => any) = () => {}) {
        this.type = name;
        this.duration = duration;
        this.direction = direction;
        this.classes = this.type.split(" ");
        this.onComplete = onComplete;
    }
}

export class TransitionController {
    private _renderer:Renderer;

    private _element:ElementRef;

    private get _isReady() {
        return this._renderer != null && this._element != null;
    }

    private _display:string;

    private _queue:Transition[];

    private _isAnimating:boolean;

    public get isAnimating() {
        return this._isAnimating;
    }

    private _isVisible:boolean;

    public get isVisible() {
        return this._isVisible;
    }

    private _isHidden:boolean;

    public get isHidden() {
        return this._isHidden;
    }
    
    private get _queueFirst() {
        return this._queue[0];
    }

    private get _queueLast() {
        return this._queue[this._queue.length - 1];
    }

    private _animationTimeout:any;

    constructor(isInitiallyVisible:boolean = true, display:string = "block") {
        this._isVisible = isInitiallyVisible;
        this._isHidden = !this._isVisible;

        this._display = display;
        this._queue = [];

        this._isAnimating = false;
    }

    public registerRenderer(renderer:Renderer) {
        this._renderer = renderer;
        this.performTransition();
    }

    public registerElement(element:ElementRef) {
        this._element = element;
        this.performTransition();
    }

    public animate(transition:Transition) {
        let isDirectionless = ["jiggle", "flash", "shake", "pulse", "tada", "bounce"].indexOf(transition.type) != -1;
        if (isDirectionless) {
            transition.direction = TransitionDirection.Static;
        }
        else if (!transition.direction || transition.direction == TransitionDirection.Either) {
            transition.direction = this._isVisible ? TransitionDirection.Out : TransitionDirection.In;
            if (this._queueLast) {
                transition.direction = this._queueLast.direction == TransitionDirection.In ? TransitionDirection.Out : TransitionDirection.In;
            }
        }

        this._queue.push(transition);

        this.performTransition();
    }

    private performTransition() {
        if (!this._isReady || this._isAnimating || !this._queueFirst) {
            return;
        }

        this._isAnimating = true;

        let transition = this._queueFirst;

        transition.classes.forEach(c => this._renderer.setElementClass(this._element, c, true));
        this._renderer.setElementClass(this._element, `animating`, true);
        this._renderer.setElementClass(this._element, transition.directionClass, true);

        this._renderer.setElementStyle(this._element, `animationDuration`, `${transition.duration}ms`);
        this._renderer.setElementStyle(this._element, `display`, this._display);

        if (transition.direction == TransitionDirection.In) {
            this._isHidden = false;
        }
    
        this._animationTimeout = setTimeout(() => this.finishTransition(transition), transition.duration);
    }

    private finishTransition(transition:Transition) {
        transition.classes.forEach(c => this._renderer.setElementClass(this._element, c, false));
        this._renderer.setElementClass(this._element, `animating`, false);
        this._renderer.setElementClass(this._element, transition.directionClass, false);

        this._renderer.setElementStyle(this._element, `animationDuration`, null);
        this._renderer.setElementStyle(this._element, `display`, null);

        if (transition.direction == TransitionDirection.In) {
            this._isVisible = true;
        }
        else if (transition.direction == TransitionDirection.Out) {
            this._isVisible = false;
            this._isHidden = true;
        }

        if (transition.onComplete) {
            transition.onComplete();
        }

        this._queue.shift();
        this._isAnimating = false;

        this.performTransition();
    }

    public stop(transition:Transition = this._queueFirst) {
        if (!transition || !this._isAnimating) {
            return;
        }

        clearTimeout(this._animationTimeout);
        this.finishTransition(transition);
    }

    public stopAll() {
        this.clearQueue();
        this.stop();
    }

    public clearQueue() {
        if (this.isAnimating) {
            this._queue = [this._queueFirst];
            return;
        }
        this._queue = [];
    }
}

@Directive({
    selector: '[suiTransition]',
    exportAs: 'transition'
})
export class SuiTransition {
    private _controller:TransitionController;

    @Input()
    private set suiTransition(tC:TransitionController) {
        this.setTransitionController(tC);
    }

    @HostBinding('class.transition')
    public transitionClass = true;

    @HostBinding('class.visible')
    public get isVisible() {
        if (this._controller) {
            return this._controller.isVisible;
        }
        return false;
    }

    @HostBinding('class.hidden')
    public get isHidden() {
        if (this._controller) {
            return this._controller.isHidden;
        }
        return false;
    }

    constructor(public renderer:Renderer, public element:ElementRef) {}

    public setTransitionController(transitionController:TransitionController) {
        this._controller = transitionController;
        this._controller.registerRenderer(this.renderer);
        this._controller.registerElement(this.element.nativeElement);
    }
}