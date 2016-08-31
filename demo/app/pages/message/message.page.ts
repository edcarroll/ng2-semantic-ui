import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-message',
  templateUrl: 'message.page.html',
  styleUrls: ['message.page.css']
})
export class MessagePage {
    public api = [
        {
            selector: "<sui-message>",
            properties: [
                {
                    name: "dismissible",
                    description: "Sets whether or not the message has a dismiss button.",
                    defaultValue: "true"
                }
            ],
            events: [
                {
                    name: "onDismiss",
                    description: "Fires when the message is dismissed by the user."
                }
            ]
        }
    ]
}

@Component({
    selector: 'message-example-standard',
    template: `
<sui-message class="success">
    <div class="header">
        This is a message!
    </div>
    <p>This message can be styled (as shown) and dismissed with the close icon in the top right.</p>
</sui-message>
`
})
export class MessageExampleStandard { }

@Component({
    selector: 'message-example-no-dismiss',
    template: `
<sui-message class="attached warning" [dismissible]="false">
    <div class="header">
        Attached message!
    </div>
    <p>This message isn't dismissible.</p>
</sui-message>
<div class="ui bottom attached segment">
    <p>Example content</p>
</div>
`
})
export class MessageExampleNoDismiss { }

export const MESSAGE_EXAMPLES:Array<any> = [MessageExampleStandard, MessageExampleNoDismiss];
