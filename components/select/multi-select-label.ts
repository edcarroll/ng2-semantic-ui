import {Component, HostBinding, ElementRef, Renderer, HostListener, Input, ViewContainerRef, EventEmitter, ViewChild} from "@angular/core";
import {SuiTransition, Transition, TransitionDirection} from '../transition/transition';
import {TransitionController} from '../transition/transition-controller';

@Component({
    selector: 'sui-select-multi-label',
    template: `
<span #optionRenderTarget></span>
<span *ngIf="!useTemplate">{{ readValue(value) }}</span>
<i class="delete icon" (click)="deselectOption()"></i>
`
})
export class SuiSelectMultiLabel extends SuiTransition {
    @HostBinding('class.ui')
    @HostBinding('class.label') classes = true;

    private _transition:TransitionController;

    constructor(renderer:Renderer, el:ElementRef) {
        super(renderer, el);
        
        this._transition = new TransitionController(false, "inline-block");
        this.setTransitionController(this._transition);

        this._transition.animate(new Transition("scale", 100, TransitionDirection.In));
    }

    public useTemplate:boolean = false;

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();
        return false;
    }

    public readValue = (value:any) => "";

    @Input()
    public value:any;

    public selected:EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('optionRenderTarget', { read: ViewContainerRef })
    public viewContainerRef:ViewContainerRef;

    public deselectOption() {
        event.stopPropagation();

        this._transition.animate(new Transition("scale", 100, TransitionDirection.Out, () => this.selected.emit(this.value)));

        return false;
    }
}
