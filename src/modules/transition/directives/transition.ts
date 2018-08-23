import { Renderer2, ElementRef, Directive, Input, HostBinding, ChangeDetectorRef } from "@angular/core";
import { TransitionController } from "../classes/transition-controller";

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

    constructor(protected _renderer:Renderer2, protected _element:ElementRef, private _changeDetector:ChangeDetectorRef) {}

    // Initialises the controller with the injected renderer and elementRef.
    public setTransitionController(transitionController:TransitionController):void {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this._element.nativeElement);
        this._controller.registerChangeDetector(this._changeDetector);
    }
}
