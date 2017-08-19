import { MessageConfig } from "./message-config";
import { ComponentRef } from "@angular/core";
import { SuiMessage } from "../components/message";

export abstract class SuiActiveMessage {
    public abstract onClick(callback:() => void):SuiActiveMessage;
    public abstract onDismiss(callback:() => void):SuiActiveMessage;

    public abstract dismiss():void;
}

export class ActiveMessage implements SuiActiveMessage {
    public config:MessageConfig;
    public componentRef:ComponentRef<SuiMessage>;

    public get component():SuiMessage {
        return this.componentRef.instance;
    }

    constructor(config:MessageConfig, componentRef:ComponentRef<SuiMessage>) {
        this.config = config;
        this.componentRef = componentRef;

        this.component.onDismiss.subscribe(() => this.componentRef.destroy());
    }

    public onClick(callback:() => void):ActiveMessage {
        this.config.onClick.subscribe(() => callback());
        return this;
    }

    public onDismiss(callback:() => void):ActiveMessage {
        this.config.onDismiss.subscribe(() => callback());
        return this;
    }

    public dismiss():void {
        this.component.dismiss();
    }
}
