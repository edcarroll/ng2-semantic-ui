import {Component, AfterViewInit, ViewChild, TemplateRef} from '@angular/core';
import {SuiModalService} from '../../../../../components/modal/modal.service';
import {ModalConfig, ComponentModalConfig, TemplateModalConfig, ModalSize} from '../../../../../components/modal/modal-config';
import {Modal} from '../../../../../components/modal/modal-controls';
import {ModalTemplate} from '../../../../../components/modal/modal-template';

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
        // const modal = new AcceptRejectModal("Are you sure?", "Are you sure you want to do this?");

        // modal.closeResult = "default!";

        // let activeModal = this.modalService
        //     .open(modal)
        //     .onApprove(str => alert(str))
        //     .onDeny(str => alert(str));

        // setTimeout(() => activeModal.destroy(), 2000);
    }

    public alert(str:string) {
        alert(str);
    }
}
