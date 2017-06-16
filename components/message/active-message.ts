import { MessageConfig } from "./message-config";
import { ComponentRef } from "@angular/core";
import { SuiMessage } from "./message";

export abstract class SuiActiveMessage {
    public abstract onClick(callback:() => void):SuiActiveMessage;
    public abstract onDismiss(callback:() => void):SuiActiveMessage;
}

export class ActiveMessage implements SuiActiveMessage {
    private _config:MessageConfig;
    public componentRef:ComponentRef<SuiMessage>;

    public get component():SuiMessage {
        return this.componentRef.instance;
    }

    constructor(config:MessageConfig, componentRef:ComponentRef<SuiMessage>) {
        this._config = config;
        this.componentRef = componentRef;

        this.component.onDismiss.subscribe(() => this.componentRef.destroy());
    }

    public onClick(callback:() => void):ActiveMessage {
        this._config.onClick.subscribe(() => callback());
        return this;
    }

    public onDismiss(callback:() => void):ActiveMessage {
        this._config.onDismiss.subscribe(() => callback());
        return this;
    }
}
