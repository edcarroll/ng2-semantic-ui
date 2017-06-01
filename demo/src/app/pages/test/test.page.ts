import {Component, AfterViewInit, ViewChild, TemplateRef} from '@angular/core';
import {SuiModalService} from '../../../../../components/modal/modal.service';
import {ModalConfig, ComponentModalConfig, TemplateModalConfig, ModalSize} from '../../../../../components/modal/modal-config';
import {Modal} from '../../../../../components/modal/modal-controls';
import {ModalTemplate} from '../../../../../components/modal/modal-template';

interface IAcceptRejectModalContext {
    title:string;
    question:string;
}

@Component({
    selector: 'modal-accept-reject',
    template: `
<div class="header">{{ modal.context.title }}</div>
<div class="content">
    <p>{{ modal.context.question }}</p>
</div>
<div class="actions">
    <button class="ui red button" (click)="modal.deny('deny')">Cancel</button>
    <button class="ui green button" (click)="modal.approve('approve')">OK</button>
</div>
`
})
export class AcceptRejectModalComponent {
    constructor(public modal:Modal<IAcceptRejectModalContext, string, string>) {}
}

export class AcceptRejectModal extends ComponentModalConfig<IAcceptRejectModalContext, string, string> {
    constructor(title:string, question:string) {
        super(AcceptRejectModalComponent, { title, question }, false);

        this.size = ModalSize.Small;
    }
}

@Component({
    selector: 'demo-page-test',
    templateUrl: './test.page.html'
})
export class TestPage implements AfterViewInit {

    @ViewChild('modalTemplate')
    public modalTemplate:ModalTemplate<null, string, string>

    constructor(public modalService:SuiModalService) {}

    public ngAfterViewInit() {
        // const modal = new TemplateModalInstance<null, string, string>(this.modalTemplate, null, true);
        const modal = new AcceptRejectModal("Are you sure?", "Are you sure you want to do this?");

        // modal.closeResult = "default!";

        this.modalService
            .open(modal)
            .onApprove(str => alert(str))
            .onDeny(str => alert(str));
        }

    public alert(str:string) {
        alert(str);
    }
}
