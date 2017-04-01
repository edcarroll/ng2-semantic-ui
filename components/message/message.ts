import {Component, Input, Output, EventEmitter, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import {SuiTransition, Transition, TransitionDirection} from '../transition/transition';
import {TransitionController} from '../transition/transition-controller';

@Component({
    selector: 'sui-message',
    template: `
<div class="ui message {{ classes }}" *ngIf="!isDismissed" [suiTransition]="transition">
    <i class="close icon" *ngIf="isDismissable" (click)="dismiss()"></i>
    <ng-content></ng-content>
</div>
`
})
export class SuiMessage {
    @Input()
    public isDismissable:boolean = true;

    @Output()
    public onDismiss:EventEmitter<SuiMessage> = new EventEmitter<SuiMessage>(false);

    private transition:TransitionController = new TransitionController();

    public isDismissed:boolean = false;

    public dismiss():void {
        this.transition.animate(new Transition("fade", 300, TransitionDirection.Out, () => {
            this.isDismissed = true;
            this.onDismiss.emit(this);
        }))
    }

    @Input("class")
    private classes:string = "";
}
