import { Component, EventEmitter, Input, ComponentFactoryResolver, ViewContainerRef, ViewChild } from "@angular/core";
import { MessageConfig } from "./message-config";
import { ActiveMessage } from "./active-message";
import { SuiMessage } from "./message";
import { SuiComponentFactory } from "../util/component-factory.service";

@Component({
    selector: "sui-message-container",
    template: `
<div #top></div>
<div #bottom></div>
`,
    styles: [`
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
    private _queue:MessageConfig[];

    @Input()
    public maxShown:number;

    @ViewChild("top", { read: ViewContainerRef })
    public topContainer:ViewContainerRef;

    @ViewChild("bottom", { read: ViewContainerRef })
    public bottomContainer:ViewContainerRef;

    constructor(private _componentFactory:SuiComponentFactory) {
        this._messages = [];
        this._queue = [];

        this.maxShown = 10;
    }

    public show(config:MessageConfig):ActiveMessage {
        const componentRef = this._componentFactory.createComponent(SuiMessage);
        this._componentFactory.attachToView(this.topContainer, componentRef);

        const message = componentRef.instance;
        message.loadConfig(config);
        message.show();

        const active = new ActiveMessage(config, componentRef);

        this._messages.push(active);

        return active;
    }
}
