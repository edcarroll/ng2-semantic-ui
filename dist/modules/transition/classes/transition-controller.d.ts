import { Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { Transition } from "./transition";
export declare class TransitionController {
    private _renderer;
    private _element;
    private _changeDetector;
    private readonly _isReady;
    private _display;
    private _queue;
    private _isAnimating;
    readonly isAnimating: boolean;
    private _isVisible;
    readonly isVisible: boolean;
    private _isHidden;
    readonly isHidden: boolean;
    private readonly _queueFirst;
    private readonly _queueLast;
    private _animationTimeout;
    constructor(isInitiallyVisible?: boolean, display?: string);
    registerRenderer(renderer: Renderer2): void;
    registerElement(element: ElementRef): void;
    registerChangeDetector(changeDetector: ChangeDetectorRef): void;
    animate(transition: Transition): void;
    private performTransition();
    private finishTransition(transition);
    stop(transition?: Transition): void;
    stopAll(): void;
    clearQueue(): void;
}
