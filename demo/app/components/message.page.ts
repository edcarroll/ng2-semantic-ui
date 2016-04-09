import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";
import {Example} from './../internal/example.component'
import {Api} from "../internal/api.component";

import {MESSAGE_EXAMPLES} from "./message/message.example";

@Component({
    selector: 'message-component-page',
    directives: [PageTitle, Example, Api, MESSAGE_EXAMPLES],
    templateUrl: "app/components/message.page.html"
})
export class MessageComponentPage {
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