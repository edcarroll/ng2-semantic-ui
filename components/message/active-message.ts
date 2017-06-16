import { MessageConfig } from "./message-config";
import { ComponentRef } from "@angular/core";
import { SuiMessage } from "./message";

export class ActiveMessage {
    private _config:MessageConfig;
    private _componentRef:ComponentRef<SuiMessage>;

    public get component():SuiMessage {
        return this._componentRef.instance;
    }

    constructor(config:MessageConfig, componentRef:ComponentRef<SuiMessage>) {
        this._config = config;
        this._componentRef = componentRef;

        this.component.onDismiss.subscribe(() => this._componentRef.destroy());
    }

    public onClick(callback:() => void):ActiveMessage {
        this._config.onClick.subscribe(() => callback());
        return this;
    }
}
