import { Component, EventEmitter, Input, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { MessageConfig } from "./message-config";
import { ActiveMessage } from "./active-message";
import { SuiMessage } from "./message";
import { SuiComponentFactory } from "../util/component-factory.service";

@Component({
    selector: "sui-message-container",
    template: `
`
})
export class SuiMessageContainer {
    private _messages:ActiveMessage[];
    private _queue:MessageConfig[];

    @Input()
    public maxShown:number;

    constructor(private _componentFactory:SuiComponentFactory,
                private _viewContainerRef:ViewContainerRef) {

        this._messages = [];
        this._queue = [];

        this.maxShown = 10;
    }

    public show(config:MessageConfig):ActiveMessage {
        const componentRef = this._componentFactory.createComponent(SuiMessage);
        this._componentFactory.attachToView(this._viewContainerRef, componentRef);

        const message = componentRef.instance;
        message.loadConfig(config);
        message.show();

        const active = new ActiveMessage(config, componentRef);

        this._messages.push(active);

        return active;
    }
}
