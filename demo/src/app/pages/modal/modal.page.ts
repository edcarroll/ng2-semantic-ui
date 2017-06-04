import {Component} from '@angular/core';
import {ApiDefinition} from 'app/components/api/api.component';

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
    // public exampleStandardTemplate = exampleStandardTemplate;
    // public exampleVariationsTemplate = exampleVariationsTemplate;
}

export const ModalPageComponents = [ModalPage];