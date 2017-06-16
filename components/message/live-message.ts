import { MessageConfig } from "./message-config";

export class LiveMessage {
    public config:MessageConfig;

    private _displayTimeout:number;

    constructor(config:MessageConfig) {
        this.config = config;

        this._displayTimeout = window.setTimeout(() => this.onTimedOut(), this.config.timeout);
    }

    public onMouseEnter():void {
        clearTimeout(this._displayTimeout);
    }

    public onMouseLeave():void {
        this._displayTimeout = window.setTimeout(() => this.onTimedOut(), this.config.extendedTimeout);
    }

    public onTimedOut():void {
        console.log("bye");
    }
}
