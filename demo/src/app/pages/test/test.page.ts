import {Component, AfterViewInit, ViewChild, TemplateRef} from '@angular/core';
import {SuiModalService} from '../../../../../components/modal/modal.service';
import {ModalTemplateContext, ModalInstance} from '../../../../../components/modal/modal-instance';

@Component({
    selector: 'demo-page-test',
    templateUrl: './test.page.html'
})
export class TestPage implements AfterViewInit {

    @ViewChild('modalTemplate')
    public modalTemplate:TemplateRef<ModalTemplateContext<null>>

    constructor(public modalService:SuiModalService) {
        console.log(modalService);
    }

    public ngAfterViewInit() {
        const modal = new ModalInstance(true);
        modal.template = this.modalTemplate;

        this.modalService.open(modal);
    }

    public alert() {
        alert("modal closed!");
    }
}
