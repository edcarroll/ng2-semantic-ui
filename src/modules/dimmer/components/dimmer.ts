import {
    Component, Input, Output, HostBinding, HostListener, EventEmitter, Renderer2,
    ElementRef, ChangeDetectorRef
} from "@angular/core";
import { TransitionController, SuiTransition, TransitionDirection, Transition } from "../../transition/internal";

@Component({
    selector: "sui-dimmer",
    template: `
<div [class.content]="wrapContent">
    <ng-content></ng-content>
</div>
`,
    styles: [`
:host.dimmer:not(.hidden) {
    transition: none;
    display: flex !important;
}
`]
})
export class SuiDimmer extends SuiTransition {
    @HostBinding("class.ui")
    @HostBinding("class.dimmer")
    public readonly hasClasses:boolean;

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

            this._isDimmed = isDimmed;
        } else if (this._isDimmed !== isDimmed) {

            this._isDimmed = isDimmed;

            this._transitionController.stopAll();
            this._transitionController.animate(
                new Transition("fade", this.transitionDuration, isDimmed ? TransitionDirection.In : TransitionDirection.Out));
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

    /* Internal for now */
    @Input()
    public wrapContent:boolean;

    constructor(renderer:Renderer2, element:ElementRef, changeDetector:ChangeDetectorRef) {
        super(renderer, element, changeDetector);

        this._isDimmed = false;
        this.isDimmedChange = new EventEmitter<boolean>();
        this.isClickable = true;

        this.wrapContent = true;

        this.hasClasses = true;
    }

    @HostListener("click")
    public onClick():void {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    }
}
