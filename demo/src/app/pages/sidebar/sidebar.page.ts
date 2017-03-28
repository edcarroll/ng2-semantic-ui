import {Component} from '@angular/core';

@Component({
  selector: 'demo-page-sidebar',
  templateUrl: './sidebar.page.html'
})
export class SidebarPage {
    public api = [
        {
            selector: "<sui-sidebar-container>"
        },
        {
            selector: "<sui-sidebar>",
            properties: [
                {
                    name: "isVisible",
                    description: "Sets whether or not the sidebar is displayed.",
                    defaultValue: "false"
                },
                {
                    name: "direction",
                    description: "Sets the direction of the sidebar relative to the <code>sui-sidebar-sibling</code> contents.",
                    defaultValue: "left"
                },
                {
                    name: "transition",
                    description: "Sets the transition used when displaying the sidebar. Options are <code>overlay</code>, <code>uncover</code>, <code>scale down</code>, <code>push</code>, <code>slide along</code> & <code>slide out</code>.",
                    defaultValue: "uncover"
                }
            ],
            events: [
                {
                    name: "isVisibleChange",
                    description: "Fires when the sidebar's visible state is changed. Supports <code>[(isVisible)]</code> syntax."
                }
            ]
        },
        {
            selector: "<sui-sidebar-sibling>",
            properties: [
                {
                    name: "isDimmedWhenVisible",
                    description: "Sets whether the page content beside the sidebar is dimmed when the sidebar is visible.",
                    defaultValue: "false"
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = `
<sui-message class="success">
    <div class="header">
        This is a message!
    </div>
    <p>This message can be styled (as shown) and dismissed with the close icon in the top right.</p>
</sui-message>
`;
    public exampleNoDismissTemplate:string = `
<sui-message class="attached warning" [isDismissable]="false">
    <div class="header">
        Attached message!
    </div>
    <p>This message isn't dismissible.</p>
</sui-message>
<div class="ui bottom attached segment">
    <p>Example content</p>
</div>
`;
}

// @Component({
//     selector: 'message-example-standard',
//     template: new MessagePage().exampleStandardTemplate
// })
// export class MessageExampleStandard {}

export const SidebarPageComponents:Array<any> = [SidebarPage];
