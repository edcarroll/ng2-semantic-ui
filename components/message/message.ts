import {Component, Input, Output, EventEmitter, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import {SuiTransition, TransitionController, Transition, TransitionDirection} from '../transition/transition';
import {ViewChild} from "@angular/core";

@Component({
    selector: 'sui-message',
    exportAs: 'message',
    template: `
<div class="ui message {{ classes }}" *ngIf="!isDismissed" [suiTransition]="transition">
    <i class="close icon" *ngIf="dismissible" (click)="dismiss()"></i>
    <ng-content></ng-content>
</div>
`
})
export class SuiMessage {
    @Input()
    public dismissible:boolean = true;

    @Output()
    public onDismiss:EventEmitter<SuiMessage> = new EventEmitter<SuiMessage>(false);

    private transition:TransitionController = new TransitionController();

    private isDismissed:boolean = false;

    private dismiss():void {
        this.transition.animate(new Transition("fade", 300, TransitionDirection.Out, () => {
            this.isDismissed = true;
            this.onDismiss.emit(this);
        }))
    }

    @Input("class")
    private classes:string = "";
}
