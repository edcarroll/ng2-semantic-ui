import {Component, HostBinding, ElementRef, Renderer, HostListener, Input, ViewContainerRef, EventEmitter, ViewChild} from "@angular/core";
import {SuiTransition} from "../transition/transition";

@Component({
    selector: 'sui-select-multi-label',
    template: `
<span #optionRenderTarget></span>
<span *ngIf="!useTemplate">{{ readValue(value) }}</span>
<i class="delete icon" (click)="deselectOption()"></i>
`
})
export class SuiSelectMultiLabel {
    @HostBinding('class.ui')
    @HostBinding('class.label') classes = true;

    private _transition:SuiTransition;
    constructor(private el:ElementRef, private renderer:Renderer) {
        this._transition = new SuiTransition(el, renderer);
        this._transition.animate({
            name: "scale",
            direction: "in",
            display: "inline-block",
            duration: 100
        });
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
        this._transition.animate({
            name: "scale",
            direction: "out",
            duration: 100,
            callback: () => this.selected.emit(this.value)
        });
        return false;
    }
}
