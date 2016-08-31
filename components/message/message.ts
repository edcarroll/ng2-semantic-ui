import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'sui-message',
    exportAs: 'suiMessage',
    template: `
<div class="ui message {{ classes }}" *ngIf="!dismissed">
    <i class="close icon" *ngIf="dismissible" (click)="dismiss()"></i>
    <ng-content></ng-content>
</div>
`
})
export class SuiMessage {
    @Input() public dismissible:boolean = true;

    @Output() public onDismiss:EventEmitter<SuiMessage> = new EventEmitter<SuiMessage>(false);

    private dismissed:boolean = false;

    private dismiss():void {
        this.dismissed = true;
        this.onDismiss.emit(this);
    }

    @Input("class")
    private classes:string = "";
}

export const SUI_MESSAGE_DIRECTIVES = [SuiMessage];
