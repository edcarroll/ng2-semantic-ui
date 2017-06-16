import { Component, EventEmitter, Input, ComponentFactoryResolver, ViewContainerRef, ViewChild, ElementRef } from "@angular/core";
import { MessageConfig } from "./message-config";
import { ActiveMessage, SuiActiveMessage } from "./active-message";
import { SuiMessage } from "./message";
import { SuiComponentFactory } from "../util/component-factory.service";
import { MessageController } from "./message-controller";

@Component({
    selector: "sui-message-container",
    template: `
<div #containerSibling></div>
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

:host >>> sui-message {
    cursor: pointer;
}
`]
})
export class SuiMessageContainer {
    private _messages:ActiveMessage[];
    private _queue:ActiveMessage[];

    @Input()
    public maxShown:number;

    @Input()
    public showNewestFirst:boolean;

    @Input()
    public set controller(controller:MessageController) {
        controller.registerContainer(this);
    }

    @ViewChild("containerSibling", { read: ViewContainerRef })
    public containerSibling:ViewContainerRef;

    constructor(private _componentFactory:SuiComponentFactory, private _element:ElementRef) {
        this._messages = [];
        this._queue = [];

        this.maxShown = 7;
        this.showNewestFirst = true;
    }

    public show(config:MessageConfig):SuiActiveMessage {
        const componentRef = this._componentFactory.createComponent(SuiMessage);
        componentRef.instance.loadConfig(config);

        const active = new ActiveMessage(config, componentRef)
            .onDismiss(() => this.onMessageClose(active));

        if (this._messages.length < this.maxShown) {
            this.open(active);
        } else {
            this.queue(active);
        }

        return active;
    }

    private open(message:ActiveMessage):void {
        this._messages.push(message);

        this._componentFactory.attachToView(message.componentRef, this.containerSibling);
        if (!this.showNewestFirst) {
            this._componentFactory.moveToElement(message.componentRef, this._element.nativeElement);
        }
        message.component.show();
    }

    private queue(message:ActiveMessage):void {
        this._queue.push(message);
    }

    private onMessageClose(message:ActiveMessage):void {
        this._messages = this._messages.filter(m => m !== message);

        if (this._queue.length > 0) {
            const queued = this._queue.shift();

            this.open(queued);
        }
    }
}
