import { Component, ViewChild } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";
import {
    SuiModalService, ModalTemplate, TemplateModalConfig, ComponentModalConfig,
    ModalSize, SuiModal
} from "ng2-semantic-ui";
import { AlertModal } from "../../../modals/alert.modal";

const exampleTemplateModalTemplate = `
<ng-template let-context let-modal="modal" #modalTemplate>
    <div class="header">Example</div>
    <div class="content">
        <p>{{ context.data }}</p>
    </div>
    <div class="actions">
        <button class="ui red button" (click)="modal.deny('denied')">Cancel</button>
        <button class="ui green button" (click)="modal.approve('approved')" autofocus>OK</button>
    </div>
</ng-template>
`;

// Don't use template concatenation here as the Angular compiler complains.
// tslint:disable-next-line:prefer-template
export const exampleTemplateTemplate = exampleTemplateModalTemplate + `
<div class="ui fluid action input">
    <input type="text" placeholder="Modal content..." [(ngModel)]="dynamicContent">
    <button class="ui primary button" (click)="open(dynamicContent)">Open</button>
</div>
`;

const exampleComponentModalTemplate = `
<div class="header">{{ modal.context.title }}</div>
<div class="content">
    <p>{{ modal.context.question }}</p>
</div>
<div class="actions">
    <button class="ui red button" (click)="modal.deny(undefined)">Cancel</button>
    <button class="ui green button" (click)="modal.approve(undefined)" autofocus>OK</button>
</div>
`;

const exampleComponentTemplate = `
<div class="ui form">
<div class="field">
    <label>Modal Size:</label>
    <sui-select class="selection" [(ngModel)]="size" [options]="availableSizes" #sizes>
        <sui-select-option *ngFor="let s of sizes.availableOptions" [value]="s"></sui-select-option>
    </sui-select>
</div>
<button class="ui primary button" (click)="open()">Confirm?</button>
</div>
`;

@Component({
    selector: "demo-page-modal",
    templateUrl: "./modal.page.html"
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
                    description: "Sets the modal size. " +
                                 "Available options are: <code>mini</code>, <code>tiny</code>, <code>small</code>, " +
                                 "<code>normal</code> & <code>large</code>.",
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
                    name: "isInverted",
                    type: "boolean",
                    description: "Sets whether the modal displays against a light background.",
                    defaultValue: "false"
                },
                {
                    name: "isCentered",
                    type: "boolean",
                    description: "Whether or not the modal should be placed in the center of the page",
                    defaultValue: "true"
                },
                {
                    name: "mustScroll",
                    type: "boolean",
                    description: "Whether or not the modal should be always scrolling. " +
                    "Should be used when the modal content is dynamic and can exceed the height of the browser",
                    defaultValue: "false"
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
    public exampleTemplateTemplate:string = exampleTemplateModalTemplate;

    public autoCode:string = `
<sui-modal [isClosable]="true" (dismissed)="alert($event)" #modal>
    <div class="header">Example</div>
    <div class="content">
        <p>Modal content</p>
    </div>
    <div class="actions">
        <button class="ui red button" (click)="modal.deny()">Cancel</button>
        <button class="ui green button" (click)="modal.approve('done')" autofocus>OK</button>
    </div>
</sui-modal>
`;

    public templateTemplate:string = exampleTemplateModalTemplate;

    public templateComponent:string = `
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

    public templateOpen:string = `
public open(dynamicContent:string = "Example") {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(result => { /* approve callback */ })
        .onDeny(result => { /* deny callback */});
}
`;

    public componentComponent:string = `
import {SuiModal, ComponentModalConfig, ModalSize} from "ng2-semantic-ui"

interface IConfirmModalContext {
    title:string;
    question:string;
}

@Component({
    selector: 'modal-confirm',
    template: \`${exampleComponentModalTemplate}\`
})
export class ConfirmModalComponent {
    constructor(public modal:SuiModal<IConfirmModalContext, void, void>) {}
}
`;

    public componentHelper:string = `
export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(title:string, question:string, size = ModalSize.Small) {
        super(ConfirmModalComponent, { title, question });

        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = size;
    }
}
`;

    public componentOpen:string = `
this.modalService
    .open(new ConfirmModal("Are you sure?", "Are you sure about accepting this?", this.modalSize))
    .onApprove(() => alert("User has accepted."))
    .onDeny(() => alert("User has denied."));
`;

}

@Component({
    selector: "example-modal-template",
    template: exampleTemplateTemplate
})
export class ModalExampleTemplate {
    @ViewChild("modalTemplate")
    public modalTemplate:ModalTemplate<{ data:string }, string, string>;

    public dynamicContent:string = "Example of dynamic content.";

    constructor(public modalService:SuiModalService) {}

    public open(dynamicContent:string = "Example"):void {
        const config = new TemplateModalConfig<{ data:string }, string, string>(this.modalTemplate);

        config.closeResult = "dismissed";
        config.context = { data: dynamicContent };

        this.modalService
            .open(config)
            .onApprove(r => this.alert(`Accepted with result: '${r}'.`))
            .onDeny(r => this.alert(`Denied with result: '${r}'.`));
    }

    public alert(message:string):void {
        this.modalService.open(new AlertModal(message));
    }
}

interface IConfirmModalContext {
    title:string;
    question:string;
}

@Component({
    selector: "example-modal-confirm",
    template: exampleComponentModalTemplate
})
export class ConfirmModalComponent {
    constructor(public modal:SuiModal<IConfirmModalContext, void, void>) {}
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(title:string, question:string, size:ModalSize = ModalSize.Small) {
        super(ConfirmModalComponent, { title, question });

        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = size;
    }
}

@Component({
    selector: "example-modal-component",
    template: exampleComponentTemplate
})
export class ModalExampleComponent {

    public availableSizes:string[] = ["mini", "tiny", "small", "normal", "large"];
    public size:ModalSize = ModalSize.Small;

    constructor(public modalService:SuiModalService) {}

    public open():void {
        this.modalService
            .open(new ConfirmModal("Are you sure?", "Are you sure about accepting this?", this.size))
            .onApprove(() => this.alert("User has accepted."))
            .onDeny(() => this.alert("User has denied."));
    }

    public alert(message:string):void {
        this.modalService.open(new AlertModal(message));
    }
}

export const ModalPageComponents = [ModalPage, ModalExampleTemplate, ConfirmModalComponent, ModalExampleComponent];
