import {Component, Input, Output, EventEmitter, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import {SuiTransition} from "../transition/transition";
import {ViewChild} from "@angular/core";

@Component({
    selector: 'sui-message',
    exportAs: 'suiMessage',
    template: `
<div class="ui message {{ classes }}" *ngIf="!dismissed" #message>
    <i class="close icon" *ngIf="dismissible" (click)="dismiss()"></i>
    <ng-content></ng-content>
</div>
`
})
export class SuiMessage implements AfterViewInit {
    @Input() public dismissible:boolean = true;

    @Output() public onDismiss:EventEmitter<SuiMessage> = new EventEmitter<SuiMessage>(false);

    @ViewChild('message')
    private messageComponent:ElementRef;

    private _transition:SuiTransition;
    constructor(private renderer:Renderer) {}

    ngAfterViewInit() {
        this._transition = new SuiTransition(this.messageComponent, this.renderer);
    }

    private dismissed:boolean = false;

    private dismiss():void {
        this._transition.animate({
            name: "fade",
            duration: 400,
            callback: () => {
                this.dismissed = true;
                this.onDismiss.emit(this)
            }
        });
    }

    @Input("class")
    private classes:string = "";
}

export const SUI_MESSAGE_DIRECTIVES = [SuiMessage];
