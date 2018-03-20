import { Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { TransitionController } from "../classes/transition-controller";
export declare class SuiTransition {
    private _renderer;
    private _element;
    private _changeDetector;
    private _controller;
    suiTransition: TransitionController;
    transitionClass: boolean;
    readonly isVisible: boolean;
    readonly isHidden: boolean;
    constructor(_renderer: Renderer2, _element: ElementRef, _changeDetector: ChangeDetectorRef);
    setTransitionController(transitionController: TransitionController): void;
}
