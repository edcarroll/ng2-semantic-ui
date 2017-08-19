import { Component, EventEmitter, Input, ComponentFactoryResolver, ViewContainerRef, ViewChild, ElementRef } from "@angular/core";
import { MessageConfig } from "../classes/message-config";
import { ActiveMessage, SuiActiveMessage } from "../classes/active-message";
import { SuiMessage } from "./message";
import { SuiComponentFactory } from "../../../misc/util/index";
import { MessageController, IMessageController } from "../classes/message-controller";

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
    public set controller(controller:MessageController) {
        controller.registerContainer(this);
    }

    @ViewChild("containerSibling", { read: ViewContainerRef })
    public containerSibling:ViewContainerRef;

    constructor(private _componentFactory:SuiComponentFactory, private _element:ElementRef) {
        this._messages = [];
        this._queue = [];
    }

    public show(config:MessageConfig, maxShown:number, showNewestFirst:boolean):SuiActiveMessage {
        const componentRef = this._componentFactory.createComponent(SuiMessage);
        componentRef.instance.loadConfig(config);

        const active = new ActiveMessage(config, componentRef)
            .onDismiss(() => this.onMessageClose(active, showNewestFirst));

        if (this._messages.length < maxShown) {
            this.open(active, showNewestFirst);
        } else {
            this.queue(active);
        }

        return active;
    }

    private open(message:ActiveMessage, showNewestFirst:boolean):void {
        this._messages.push(message);
        console.log(this._messages);

        this._componentFactory.attachToView(message.componentRef, this.containerSibling);
        if (!showNewestFirst) {
            this._componentFactory.moveToElement(message.componentRef, this._element.nativeElement);
        }

        message.component.show();
    }

    private queue(message:ActiveMessage):void {
        this._queue.push(message);
    }

    public dismissAll():void {
        this._queue = [];
        console.log(this._messages);
        this._messages.forEach(m => m.dismiss());
    }

    private onMessageClose(message:ActiveMessage, showNewestFirst:boolean):void {
        this._messages = this._messages.filter(m => m !== message);

        if (this._queue.length > 0) {
            const [queued] = this._queue.slice(0, 1);

            this.open(queued, showNewestFirst);
        }
    }
}
