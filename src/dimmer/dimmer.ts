import { Component, Input, Output, HostBinding, HostListener, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { SuiTransition, Transition, TransitionDirection } from "../transition/transition";
import { TransitionController } from "../transition/transition-controller";

@Component({
    selector: "sui-dimmer",
    template: `
<div class="content">
    <div class="center">
        <ng-content></ng-content>
    </div>
</div>
`,
    styles: [`
:host.dimmer {
    transition: none;
}
`]
})
export class SuiDimmer extends SuiTransition {
    @HostBinding("class.ui")
    @HostBinding("class.dimmer")
    private _dimmerClasses:boolean;

    private _transitionController:TransitionController;

    private _isDimmed:boolean;

    @HostBinding("class.active")
    @Input()
    public get isDimmed():boolean {
        return this._isDimmed;
    }

    public set isDimmed(value:boolean) {
        const isDimmed = !!value;

        if (!this._transitionController) {
            // Initialise transition functionality when first setting dimmed, to ensure initial state doesn't transition.
            this._transitionController = new TransitionController(isDimmed, "block");

            this.setTransitionController(this._transitionController);
        }

        if (this._isDimmed !== isDimmed) {
            this._isDimmed = isDimmed;

            if (this._transitionController.isVisible !== isDimmed) {
                this._transitionController.stopAll();
                this._transitionController.animate(
                    new Transition("fade", this.transitionDuration, isDimmed ? TransitionDirection.In : TransitionDirection.Out));
            }
        }
    }

    @Output()
    public isDimmedChange:EventEmitter<boolean>;

    @Input()
    public isClickable:boolean;

    @Input()
    public transition:string;

    @Input()
    public transitionDuration:number;

    constructor(renderer:Renderer2, element:ElementRef, changeDetector:ChangeDetectorRef) {
        super(renderer, element, changeDetector);

        this._isDimmed = false;
        this.isDimmedChange = new EventEmitter<boolean>();
        this.isClickable = true;

        this._dimmerClasses = true;
    }

    @HostListener("click")
    private onClick():void {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    }
}
