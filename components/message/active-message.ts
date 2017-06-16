import { MessageConfig } from "./message-config";

export class ActiveMessage {
    private _config:MessageConfig;

    constructor(config:MessageConfig) {
        this._config = config;
    }

    public onClick(callback:() => void):ActiveMessage {
        this._config.onClick.subscribe(() => callback());
        return this;
    }
}
