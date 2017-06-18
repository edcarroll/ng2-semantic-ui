import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { SuiMessageContainer } from "../../../../../components/message/message-container";
import { MessageConfig, MessageState } from "../../../../../components/message/message-config";
import { MessageController } from "../../../../../components/message/message-controller";
import { SuiMessageService } from "../../../../../components/message/message-service";
import { MessagePosition } from "../../../../../components/message/message-global-container";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage {
    public controller:MessageController;

    constructor(private _messageService:SuiMessageService) {
        this.controller = new MessageController();
        this._messageService.position = MessagePosition.BottomRight;
        this._messageService.isNewestOnTop = true;
    }

    public open():void {
        const message = new MessageConfig(Date.now().toString(), MessageState.Default, "Header");

        // this.controller.show(message);
        this._messageService.show(message);
    }
}
