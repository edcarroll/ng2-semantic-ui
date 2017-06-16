import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TransitionController } from "../transition/transition-controller";
import { MessageState, MessageConfig } from "./message-config";
import { Transition, TransitionDirection } from "../transition/transition";
import { HandledEvent } from "../util/util";

export interface IClasses {
    [name:string]:true;
}

@Component({
    selector: "sui-message",
    template: `
<div class="ui message"
     [suiTransition]="transitionController"
     [ngClass]="classes"
     (mousemove)="cancelTimer()"
     (mouseleave)="beginTimer(extendedTimeout)"
     (click)="onClicked($event)">

    <i class="close icon" *ngIf="closeButton" (click)="dismiss($event)"></i>
    <ng-content></ng-content>
    <ng-container *ngIf="isDynamic">
        <div class="header" *ngIf="header">{{ header }}</div>
        <p>{{ text }}</p>
    </ng-container>
</div>
`
})
export class SuiMessageTest {
    public isDynamic:boolean;
    public isClosing:boolean;

    public text:string;
    public header:string;
    public state:MessageState;

    public timeout:number;
    public extendedTimeout:number;

    @Input("isDismissable")
    public closeButton:boolean;

    public transitionController:TransitionController;

    @Input()
    public transition:string;
    public transitionInDuration:number;

    @Input("transitionDuration")
    public transitionOutDuration:number;

    private _displayTimeout:number;

    @Output("click")
    public onClick:EventEmitter<void>;

    @Output("dismiss")
    public onDismiss:EventEmitter<void>;

    @Input()
    public class:string;

    public get classes():IClasses {
        const classes:IClasses = {};
        classes[this.state] = true;
        this.class.split(" ").forEach(c => classes[c] = true);
        return classes;
    }

    constructor() {
        const config = new MessageConfig("");
        this.loadConfig(config);

        this.isDynamic = false;
        this.class = "";
        this.transitionController = new TransitionController(false);

        this.show();
    }

    public loadConfig(config:MessageConfig):void {
        this.isDynamic = true;

        this.text = config.text;
        this.header = config.header;
        this.state = config.state;

        this.timeout = config.timeout;
        this.extendedTimeout = config.extendedTimeout;

        this.closeButton = config.closeButton;

        this.transition = config.transition;
        this.transitionInDuration = config.transitionInDuration;
        this.transitionOutDuration = config.transitionOutDuration;

        this.onClick = config.onClick;
        this.onDismiss = config.onDismiss;
    }

    public show():void {
        this.transitionController.stopAll();
        this.transitionController.animate(
            new Transition(
                this.transition,
                this.isDynamic ? 4000 : 0,
                TransitionDirection.In,
                () => {
                    if (this.isDynamic) {
                        this.beginTimer(this.timeout);
                    }
                }));
    }

    public dismiss(e?:HandledEvent):void {
        if (e) {
            e.eventHandled = true;
        }
        this.hide();
    }

    public hide():void {
        this.isClosing = true;

        this.transitionController.stopAll();
        this.transitionController.animate(
            new Transition(
                this.transition,
                this.transitionOutDuration,
                TransitionDirection.Out,
                () => {
                    this.isClosing = false;
                    this.onDismiss.emit();
                }));
    }

    public beginTimer(timeout:number):void {
        if (this.isDynamic) {
            this._displayTimeout = window.setTimeout(() => this.onTimedOut(), timeout);
        }
    }

    public cancelTimer():void {
        if (this.isDynamic) {
            clearTimeout(this._displayTimeout);

            if (this.isClosing) {
                this.isClosing = false;

                this.transitionController.cancel();
            }
        }
    }

    public onClicked(e:HandledEvent):void {
        if (!e.eventHandled) {
            this.cancelTimer();
            this.onClick.emit();
        }
    }

    private onTimedOut():void {
        this.hide();
    }
}
