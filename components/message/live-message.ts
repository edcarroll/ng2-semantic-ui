import {MessageConfig} from './message-config';

export class LiveMessage {
    public config:MessageConfig;

    private _displayTimeout:number;

    constructor(config:MessageConfig) {
        this.config = config;

        this._displayTimeout = window.setTimeout(() => this.onTimedOut(), this.config.timeout);
    }

    public onMouseEnter() {
        clearTimeout(this._displayTimeout);
    }

    public onMouseLeave() {
        this._displayTimeout = window.setTimeout(() => this.onTimedOut(), this.config.extendedTimeout);
    }

    public onTimedOut() {
        console.log("bye");
    }
}