import {Component, EventEmitter, Input} from '@angular/core';
import {MessageConfig} from './message-config';
import {LiveMessage} from './live-message';
import {ActiveMessage} from './active-message';

@Component({
    selector: 'sui-message-container',
    template: `
<sui-message *ngFor="let message of _messages">
    <div class="header" *ngIf="message.config.header">{{ message.config.header }}</div>
    <p>{{ message.config.text }}</p>
</sui-message>
`
})
export class SuiMessageContainer {
    private _messages:LiveMessage[];
    private _queue:MessageConfig[];

    @Input()
    public maxShown:number;

    constructor() {
        this._messages = [];
        this._queue = [];

        this.maxShown = 10;
    }

    public show(message:MessageConfig) {
        if (this._messages.length == this.maxShown) {
            this._queue.push(message);
        }
        else {
            const live = new LiveMessage(message);

            this._messages.push(live);
        }

        return new ActiveMessage(message);
    }
}