import {Component, ViewChild} from '@angular/core';
import {ApiDefinition} from 'app/components/api/api.component';
import {SuiModalService} from '../../../../../components/modal/modal.service';
import {ModalTemplate} from '../../../../../components/modal/modal-template';
import {TemplateModalConfig} from '../../../../../components/modal/modal-config';

const exampleTemplateModalTemplate = `
<ng-template let-context let-modal="modal" #modalTemplate>
    <div class="header">Example</div>
    <div class="content">
        <p>{{ context.data }}</p>
    </div>
    <div class="actions">
        <button class="ui red button" (click)="modal.deny('denied!')">Cancel</button>
        <button class="ui green button" (click)="modal.approve('approved!')">OK</button>
    </div>
</ng-template>
`;

const exampleTemplateTemplate = `
${exampleTemplateModalTemplate}

<div class="ui fluid action input">
    <input type="text" placeholder="Modal content..." [(ngModel)]="dynamicContent">
    <button class="ui primary button" (click)="open(dynamicContent)">Open</button>
</div>
`;

@Component({
  selector: 'demo-page-modal',
  templateUrl: './modal.page.html'
})
export class ModalPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-modal>",
            properties: [
                {
                    name: "isClosable",
                    type: "boolean",
                    description: "Sets whether the modal can be closed with a close button, clicking outside, or the <code>ESC</code> key.",
                    defaultValue: "true"
                },
                {
                    name: "closeResult",
                    type: "T",
                    description: "Sets the result to deny the modal with when closed. Used in combination with <code>isClosable</code>."
                },
                {
                    name: "size",
                    type: "ModalSize",
                    description: "Sets the modal size. Available options are: <code>small</code>, <code>normal</code> & <code>large</code>.",
                    defaultValue: "normal"
                },
                {
                    name: "isFullScreen",
                    type: "boolean",
                    description: "Sets whether the modal takes up the full width of the screen.",
                    defaultValue: "false"
                },
                {
                    name: "isBasic",
                    type: "boolean",
                    description: "Sets whether or not clicking the dimmer will dismiss it.",
                    defaultValue: "true"
                },
                {
                    name: "transition",
                    type: "string",
                    description: "Sets the transition used when displaying the modal.",
                    defaultValue: "scale"
                },
                {
                    name: "transitionDuration",
                    type: "number",
                    description: "Sets the duration for the modal transition.",
                    defaultValue: "500"
                }
            ],
            events: [
                {
                    name: "approved",
                    type: "T",
                    description: "Fires when the modal closes, after <code>approve</code> has been called."
                },
                {
                    name: "denied",
                    type: "U",
                    description: "Fires when the modal closes, after <code>deny</code> has been called."
                },
                {
                    name: "dismissed",
                    type: "void",
                    description: "Fires when the modal closes, regardless of the modal outcome."
                }
            ]
        }
    ];
    public exampleTemplateTemplate = exampleTemplateModalTemplate;

    public autoCode = `
<sui-modal [isClosable]="true" (dismissed)="alert($event)" #modal>
    <div class="header">Example</div>
    <div class="content">
        <p>Modal content</p>
    </div>
    <div class="actions">
        <button class="ui red button" (click)="modal.deny()">Cancel</button>
        <button class="ui green button" (click)="modal.approve('done')">OK</button>
    </div>
</sui-modal>
`;

    public templateTemplate = exampleTemplateModalTemplate;

    public templateComponent = `
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';

export interface IContext {
    data:string;
}

@Component({})
export class MyComponent {
    @ViewChild('modalTemplate')
    public modalTemplate:ModalTemplate<IContext, string, string>

    constructor(public modalService:SuiModalService) {}
}
`;

    public templateOpen = `
public open(dynamicContent:string = "Example") {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.isClosable = false;
    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(result => { /* approve callback */ }) 
        .onDeny(result => { /* deny callback */});
}
`;
}

@Component({
    selector: 'modal-example-template',
    template: exampleTemplateTemplate
})
export class ModalExampleTemplate {
    @ViewChild('modalTemplate')
    public modalTemplate:ModalTemplate<{ data:string }, string, string>

    public dynamicContent:string = "Example of dynamic content.";

    constructor(public modalService:SuiModalService) {}

    public open(dynamicContent:string = "Example") {
        const config = new TemplateModalConfig<{ data:string }, string, string>(this.modalTemplate);

        config.isClosable = false;
        config.context = { data: dynamicContent };

        this.modalService
            .open(config)
            .onApprove(r => alert(r)) 
            .onDeny(r => alert(r));
    }
}

export const ModalPageComponents = [ModalPage, ModalExampleTemplate];