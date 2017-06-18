import { MessageConfig } from "./message-config";
import { SuiActiveMessage } from "./active-message";
import { SuiMessageContainer } from "./message-container";

export interface IMessageController {
    maxShown:number;
    isNewestOnTop:boolean;
    show(config:MessageConfig):SuiActiveMessage;
    dismissAll():void;
}

export class MessageController implements IMessageController {
    private _container:SuiMessageContainer;

    public maxShown:number;
    public isNewestOnTop:boolean;

    constructor() {
        this.maxShown = 7;
        this.isNewestOnTop = true;
    }

    public registerContainer(container:SuiMessageContainer):void {
        this._container = container;
    }

    public show(config:MessageConfig):SuiActiveMessage {
        this.throwContainerError();

        return this._container.show(config, this.maxShown, this.isNewestOnTop);
    }

    public dismissAll():void {
        this.throwContainerError();

        return this._container.dismissAll();
    }

    private throwContainerError():void {
        if (!this._container) {
            throw new Error("You must pass this controller to a message container.");
        }
    }
}
