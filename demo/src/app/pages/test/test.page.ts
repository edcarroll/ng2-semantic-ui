import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { SuiMessageContainer } from "../../../../../components/message/message-container";
import { MessageConfig, MessageState } from "../../../../../components/message/message-config";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html"
})
export class TestPage {

    @ViewChild("messages")
    public messages:SuiMessageContainer;

    constructor() {}

    public open():void {
        const message = new MessageConfig(null, MessageState.Default, "Hello, world!");
        message.state = MessageState.Success;
        this.messages.show(message);
    }
}
