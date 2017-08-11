import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MessageController, SuiMessageService, MessagePosition, MessageConfig, MessageState } from "ng2-semantic-ui";

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
        message.hasProgress = true;
        // this.controller.show(message);
        this._messageService.show(message);
    }
}
