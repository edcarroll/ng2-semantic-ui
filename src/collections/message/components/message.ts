import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TransitionController, Transition, TransitionDirection } from "../../../modules/transition/internal";

export interface IMessage {
    dismiss():void;
}

@Component({
    selector: "sui-message",
    template: `
<div class="ui message {{ class }}" *ngIf="!isDismissed" [suiTransition]="transitionController">
    <i class="close icon" *ngIf="isDismissable" (click)="dismiss()"></i>
    <ng-content></ng-content>
</div>
`,
    styles: [`
/* Fix for CSS Bug */
.ui.icon.visible.message {
    display: flex !important;
}
`]
})
export class SuiMessage implements IMessage {
    @Input()
    public isDismissable:boolean;

    @Output("dismiss")
    public onDismiss:EventEmitter<SuiMessage>;

    public isDismissed:boolean;

    public transitionController:TransitionController;

    @Input()
    public transition:string;

    @Input()
    public transitionDuration:number;

    @Input("class")
    public class:string;

    constructor() {
        this.isDismissable = true;
        this.onDismiss = new EventEmitter<SuiMessage>();

        this.isDismissed = false;

        this.transitionController = new TransitionController();
        this.transition = "fade";
        this.transitionDuration = 300;

        this.class = "";
    }

    public dismiss():void {
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, () => {
            this.isDismissed = true;
            this.onDismiss.emit(this);
        }));
    }
}
