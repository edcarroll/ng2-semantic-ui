import { MessageConfig } from "./message-config";
import { SuiActiveMessage } from "./active-message";
import { SuiMessageContainer } from "./message-container";


export class MessageController {
    private _container:SuiMessageContainer;

    public registerContainer(container:SuiMessageContainer):void {
        this._container = container;
    }

    public show(config:MessageConfig):SuiActiveMessage {
        if (!this._container) {
            throw new Error("You must pass this controller to a message container.");
        }

        return this._container.show(config);
    }
}
