import {Component, AfterViewInit, ViewChild, TemplateRef} from '@angular/core';
import {SuiModalService} from '../../../../../components/modal/modal.service';
import {SuiMessageContainer} from '../../../../../components/message/message-container';
import {MessageConfig, MessageState} from '../../../../../components/message/message-config';

@Component({
    selector: 'demo-page-test',
    templateUrl: './test.page.html'
})
export class TestPage implements AfterViewInit {

    @ViewChild('messages')
    public messages:SuiMessageContainer

    constructor() {}

    public ngAfterViewInit() {
        const message = new MessageConfig(null, MessageState.Default, "Hello, world!");

        this.messages.show(message);
        this.messages.show(message);
    }
}
