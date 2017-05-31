import {Component, Input} from '@angular/core';
import {ApiDefinition} from "../../components/api/api.component";

const exampleStandardTemplate = `
<button class="ui green icon button" suiPopup popupHeader="Example" popupText="This is an example popup">
    <i class="add icon"></i>
</button>
`;

const exampleTemplateTemplate = `
<ng-template let-popup #popupTemplate>
    <div class="header">Rating</div>
    <div class="content">
        <sui-rating class="star" (click)="popup.close()"></sui-rating>
    </div>
</ng-template>
<button class="ui icon button" suiPopup [popupTemplate]="popupTemplate" popupTrigger="outsideClick">
    <i class="star icon"></i> Rate
</button>
`;

const examplePlacementTemplate = `
<div class="ui card" suiPopup popupText="You can customise my placement!" popupInverted [popupPlacement]="position">
    <div class="content">
        <div class="header">Positioning</div>
        <div class="description">
            Popup placement can be anywhere around the content.
        </div>
    </div>
</div>
`;

@Component({
    selector: 'demo-page-popup',
    templateUrl: './popup.page.html'
})
export class PopupPage {
    public api:ApiDefinition = [
        {
            selector: "[suiPopup]",
            properties: [
                {
                    name: "popupText",
                    description: "Sets the text within the popup.",
                    defaultValue: ""
                },
                {
                    name: "popupHeader",
                    description: "Sets the title of the popup."
                },
                {
                    name: "popupTemplate",
                    description: "Sets the template to use when rendering the popup."
                },
                {
                    name: "popupPlacement",
                    description: "Sets the placement of the popup relative to the anchor.",
                    defaultValue: "top left"
                },
                {
                    name: "popupInverted",
                    description: "When <code>true</code> the popup has a black background with white text.",
                    defaultValue: "false"
                },
                {
                    name: "popupTrigger",
                    description: "Specifies the trigger for the popup. Available options are: <code>hover</code>, <code>click</code>, <code>outsideClick</code>, <code>focus</code> & <code>manual</code>.",
                    defaultValue: "hover"
                },
                {
                    name: "popupDelay",
                    description: "Sets the time delay in milliseconds before the popup opens after triggered.",
                    defaultValue: "0"
                },
                {
                    name: "popupBasic",
                    description: "When <code>true</code> the popup's arrow is hidden.",
                    defaultValue: "false"
                },
                {
                    name: "popupTransition",
                    description: "Sets the transition to use when displaying the popup.",
                    defaultValue: "scale"
                },
                {
                    name: "popupTransitionDuration",
                    description: "Sets the duration of the transition used when displaying the popup.",
                    defaultValue: "200"
                }
            ]
        }
    ];
    
    public exampleStandardTemplate = exampleStandardTemplate;
    public exampleTemplateTemplate = exampleTemplateTemplate;
    public examplePlacementTemplate = examplePlacementTemplate;

    public placements = [
        "top left",
        "top",
        "top right",
        "bottom left",
        "bottom",
        "bottom right",
        "left top",
        "left",
        "left bottom",
        "right top",
        "right",
        "right bottom"
    ];

    public position = "right bottom";

    public manualPopupMarkup = `
<div class="ui segment" suiPopup popupText="Manual" popupTrigger="manual" #popup="suiPopup">
    <button class="ui button" (click)="popup.open()">Open!</button>
    <button class="ui button" (click)="openPopup(popup)">Conditionally Open!</button>
    <button class="ui button" (click)="popup.toggle()">Toggle!</button>
    <button class="ui button" (click)="popup.close()">Close!</button>
</div>
`;

    public manualPopupCode = `
import {IPopup} from "ng2-semantic-ui";
import {ApiDefinition} from '../../components/api/api.component';

@Component({})
export class MyComponent {
    private _condition:boolean;

    public openPopup(popup:IPopup) {
        if (this._condition) {
            popup.open();
        }
    }
}
`;
}

@Component({
    selector: 'popup-example-standard',
    template: exampleStandardTemplate
})
export class PopupExampleStandard {}

@Component({
    selector: 'popup-example-template',
    template: exampleTemplateTemplate
})
export class PopupExampleTemplate {}

@Component({
    selector: 'popup-example-placement',
    template: examplePlacementTemplate
})
export class PopupExamplePlacement {
    @Input()
    public position:string = "right bottom";
}

export const PopupPageComponents = [PopupPage, PopupExampleStandard, PopupExampleTemplate, PopupExamplePlacement];
