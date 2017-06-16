import { Component, EventEmitter, Input, ComponentFactoryResolver, ViewContainerRef, ViewChild } from "@angular/core";
import { MessageConfig } from "./message-config";
import { ActiveMessage, SuiActiveMessage } from "./active-message";
import { SuiMessage } from "./message";
import { SuiComponentFactory } from "../util/component-factory.service";

@Component({
    selector: "sui-message-container",
    template: `
<div #top></div>
<div #bottom></div>
`,
    styles: [`
:host {
    display: block;
}

:host >>> sui-message {
    display: block;
    margin-bottom: 1rem;
}

:host >>> sui-message:last-of-type {
    margin-bottom: 0;
}
`]
})
export class SuiMessageContainer {
    private _messages:ActiveMessage[];
    private _queue:ActiveMessage[];

    @Input()
    public maxShown:number;

    @ViewChild("top", { read: ViewContainerRef })
    public topContainer:ViewContainerRef;

    @ViewChild("bottom", { read: ViewContainerRef })
    public bottomContainer:ViewContainerRef;

    constructor(private _componentFactory:SuiComponentFactory) {
        this._messages = [];
        this._queue = [];

        this.maxShown = 7;
    }

    public show(config:MessageConfig):SuiActiveMessage {
        const componentRef = this._componentFactory.createComponent(SuiMessage);

        const message = componentRef.instance;
        message.loadConfig(config);

        const active = new ActiveMessage(config, componentRef)
            .onDismiss(() => this.onMessageClose(active));

        if (this._messages.length < this.maxShown) {
            this.open(active);
        } else {
            this._queue.push(active);
        }

        return active;
    }

    private open(message:ActiveMessage):void {
        this._messages.push(message);

        this._componentFactory.attachToView(this.topContainer, message.componentRef);
        message.component.show();
    }

    private onMessageClose(message:ActiveMessage):void {
        this._messages = this._messages.filter(m => m !== message);

        if (this._queue.length > 0) {
            const queued = this._queue.shift();

            this.open(queued);
        }
    }
}
