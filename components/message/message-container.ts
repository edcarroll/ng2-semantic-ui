import { Component, EventEmitter, Input, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { MessageConfig } from "./message-config";
import { ActiveMessage } from "./active-message";
import { SuiMessage } from "./message";

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

    constructor(private _viewContainerRef:ViewContainerRef,
                private _componentFactoryResolver:ComponentFactoryResolver) {

        this._messages = [];
        this._queue = [];

        this.maxShown = 10;
    }

    public show(config:MessageConfig):ActiveMessage {
        // Resolve component factory for the `SuiPopup` component.
        const factory = this._componentFactoryResolver.resolveComponentFactory(SuiMessage);

        // Generate a component using the view container reference and the previously resolved factory.
        const componentRef = this._viewContainerRef.createComponent(factory);

        const message = componentRef.instance;
        message.loadConfig(config);
        message.show();

        const active = new ActiveMessage(config, componentRef);

        this._messages.push(active);

        return active;
    }
}
