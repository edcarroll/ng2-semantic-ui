import { Component } from "@angular/core";

@Component({
    selector: "demo-page-localization",
    templateUrl: "./localization.page.html"
})
export class LocalizationPage {
    public manualDismissMarkup:string = `
<sui-message #message>
    <div class="header">
        Dismiss Manually
    </div>
</sui-message>

<button (click)="message.dismiss()">Dismiss</button>
<button (click)="dismiss(message)">Dismiss (advanced)</button>
`;

    public manualDismissCode:string = `
import {IMessage} from "ng2-semantic-ui";

@Component({})
export class MyComponent {
    public dismiss(message:IMessage) {
        message.dismiss();
    }
}
`;
}

export const LocalizationPageComponents = [LocalizationPage];
