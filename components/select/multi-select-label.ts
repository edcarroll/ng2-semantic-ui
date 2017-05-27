import {Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild, Renderer, ElementRef, Output, ChangeDetectorRef} from '@angular/core';
import {SuiTransition, Transition, TransitionDirection} from '../transition/transition';
import {TransitionController} from '../transition/transition-controller';
import {ISelectRenderedOption} from './select-option';

@Component({
    selector: 'sui-multi-select-label',
    template: `
<span #templateSibling></span>
<span *ngIf="!usesTemplate">{{ readLabel(value) }}</span>
<i class="delete icon" (click)="deselectOption($event)"></i>
`
})
export class SuiMultiSelectLabel<T> extends SuiTransition implements ISelectRenderedOption<T> {
    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding('class.ui')
    @HostBinding('class.label')
    private _labelClasses:boolean;

    private _transitionController:TransitionController;

    @Input()
    public value:T;

    @Output()
    public onDeselected:EventEmitter<T>;

    public readLabel:(obj:T) => string;

    public usesTemplate:boolean;

    @ViewChild('templateSibling', { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    constructor(renderer:Renderer, element:ElementRef, changeDetector:ChangeDetectorRef) {
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

    public deselectOption(event:MouseEvent) {
        event.stopPropagation();

        this._transitionController.animate(new Transition("scale", 100, TransitionDirection.Out, () =>
            this.onDeselected.emit(this.value)));
    }

    @HostListener("click", ["$event"])
    public onClick(event:MouseEvent) {
        event.stopPropagation();
    }
}