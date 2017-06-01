import {Component, AfterViewInit, ViewChild, TemplateRef} from '@angular/core';
import {SuiModalService} from '../../../../../components/modal/modal.service';
import {ModalInstance} from '../../../../../components/modal/modal-instance';
import {Modal} from '../../../../../components/modal/modal-controls';
import {ModalTemplate} from '../../../../../components/modal/modal-template';

@Component({
    selector: 'modal-accept-reject',
    template: `
<div class="header">Confirm?</div>
<div class="content">
    <p>Hey there!</p>
    <p>Hellloooo</p>
</div>
<div class="actions">
    <button class="ui red button" (click)="modal.deny('deny')">Cancel</button>
    <button class="ui green button" (click)="modal.approve('approve')">OK</button>
</div>
`
})
export class AcceptRejectModalComponent {
    constructor(public modal:Modal<{ question:string }, void, void>) {
        console.log(modal.context.question);
    }
}

export class AcceptRejectModal extends ModalInstance<{ question:string }> {
    constructor(question:string) {
        super(null, false);

        this.component = AcceptRejectModalComponent;
        this.context = { question };
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
        // const modal = new ModalInstance<null, string, string>(this.modalTemplate, true);
        const modal = new AcceptRejectModal("hello!");

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
