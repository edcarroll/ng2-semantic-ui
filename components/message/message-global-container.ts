
import { Component } from "@angular/core";
import { MessageController } from "./message-controller";
import { SuiMessageService } from "./message-service";

@Component({
    selector: "sui-message-global-container",
    template: `<sui-message-container [controller]="controller"></sui-message-container>`
})
export class SuiMessageGlobalContainer {
    public controller:MessageController;
}
