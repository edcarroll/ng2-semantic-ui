import {Component} from '@angular/core';

import {MESSAGE_DIRECTIVES} from '../../../../components/message';
// import {MESSAGE_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'message-example-standard',
    directives: [MESSAGE_DIRECTIVES],
    templateUrl: "app/components/message/standard.example.html"
})
export class MessageExampleStandard { }

@Component({
    selector: 'message-example-no-dismiss',
    directives: [MESSAGE_DIRECTIVES],
    templateUrl: "app/components/message/no-dismiss.example.html"
})
export class MessageExampleNoDismiss { }

export const MESSAGE_EXAMPLES:Array<any> = [MessageExampleStandard, MessageExampleNoDismiss];