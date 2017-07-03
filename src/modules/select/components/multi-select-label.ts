import {
    Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef,
    ViewChild, Renderer2, ElementRef, Output, ChangeDetectorRef
} from "@angular/core";
import { SuiTransition, TransitionController, Transition, TransitionDirection } from "../../transition";
import { HandledEvent } from "../../../misc/util";
import { ISelectRenderedOption } from "./select-option";

@Component({
    selector: "sui-multi-select-label",
    template: `
<span #templateSibling></span>
<span *ngIf="!usesTemplate">{{ readLabel(value) }}</span>
<i class="delete icon" (click)="deselectOption($event)"></i>
`
})
export class SuiMultiSelectLabel<T> extends SuiTransition implements ISelectRenderedOption<T> {
    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding("class.ui")
    @HostBinding("class.label")
    private _labelClasses:boolean;

    private _transitionController:TransitionController;

    @Input()
    public value:T;

    @Output()
    public onDeselected:EventEmitter<T>;

    public readLabel:(obj:T) => string;

    public usesTemplate:boolean;

    @ViewChild("templateSibling", { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    constructor(renderer:Renderer2, element:ElementRef, changeDetector:ChangeDetectorRef) {
        super(renderer, element, changeDetector);

        // Initialise transition functionality.
        this._transitionController = new TransitionController(false, "inline-block");
        this.setTransitionController(this._transitionController);

        this.onDeselected = new EventEmitter<T>();
        this.readLabel = (value:T) => "";
        this.usesTemplate = false;

        this._labelClasses = true;

        this._transitionController.animate(new Transition("scale", 100, TransitionDirection.In));
    }

    public deselectOption(e:HandledEvent):void {
        e.eventHandled = true;

        this._transitionController.animate(
            new Transition("scale", 100, TransitionDirection.Out, () =>
                this.onDeselected.emit(this.value)));
    }

    @HostListener("click", ["$event"])
    public onClick(e:HandledEvent):void {
        e.eventHandled = true;
    }
}
