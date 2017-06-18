import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { SuiMessageContainer } from "../../../../../components/message/message-container";
import { MessageConfig, MessageState } from "../../../../../components/message/message-config";
import { MessageController } from "../../../../../components/message/message-controller";
import { SuiMessageService } from "../../../../../components/message/message-service";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage {
    public controller:MessageController;

    constructor(private _messageService:SuiMessageService) {
        this.controller = new MessageController();
    }

    public open():void {
        const message = new MessageConfig("hello, world!", MessageState.Default, "Header");
        message.state = MessageState.Default;
        message.hasProgress = true;

        this.controller.show(message);
    }
}
