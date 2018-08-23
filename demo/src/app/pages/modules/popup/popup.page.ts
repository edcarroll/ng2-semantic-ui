import { Component, Input } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";
import { SuiPopupConfig } from "ng2-semantic-ui";

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

const exampleWidthTemplate = `
<ng-template let-popup #popupTemplate>
<div class="content">
  <div class="ui three column divided center aligned grid">
    <div class="column">
      <h4 class="ui header">Basic Plan</h4>
      <p><b>2</b> projects, $10 a month</p>
      <div class="ui button">Choose</div>
    </div>
    <div class="column">
      <h4 class="ui header">Business Plan</h4>
      <p><b>5</b> projects, $20 a month</p>
      <div class="ui button">Choose</div>
    </div>
    <div class="column">
      <h4 class="ui header">Premium Plan</h4>
      <p><b>8</b> projects, $25 a month</p>
      <div class="ui button">Choose</div>
    </div>
  </div>
</div>
</ng-template>

<i class="circular heart icon link" suiPopup popupWidth="wide" 
popupText="Hello. This is a wide pop-up which allows for lots of content with additional space. 
You can fit a lot of words here and the paragraphs will be pretty wide."></i>
<i class="circular heart icon link" suiPopup popupWidth="very wide" 
popupText="Hello. This is a very wide pop-up which allows for lots of content with additional space. 
You can fit a lot of words here and the paragraphs will be pretty wide."></i>
<br/>
<br/>
<button class="ui icon button" suiPopup popupWidth="flowing" [popupTemplate]="popupTemplate" popupTrigger="outsideClick">
    Show flowing popup
</button>

`;

const exampleSizeTemplate = `
<i class="circular star icon link" suiPopup popupSize="mini" popupText="Hello, this is a mini popup"></i>
<i class="circular star icon link" suiPopup popupSize="tiny" popupText="Hello, this is a tiny popup"></i>
<i class="circular star icon link" suiPopup popupSize="small" popupText="Hello, this is a small popup"></i>
<i class="circular star icon link" suiPopup popupText="Hello, this is a standard popup"></i>
<i class="circular star icon link" suiPopup popupSize="large" popupText="Hello, this is a large popup"></i>
<i class="circular star icon link" suiPopup popupSize="huge" popupText="Hello, this is a huge popup"></i>
`;

@Component({
    selector: "demo-page-popup",
    templateUrl: "./popup.page.html"
})
export class PopupPage {
    public api:ApiDefinition = [
        {
            selector: "[suiPopup]",
            properties: [
                {
                    name: "popupText",
                    type: "string",
                    description: "Sets the text within the popup."
                },
                {
                    name: "popupHeader",
                    type: "string",
                    description: "Sets the title of the popup."
                },
                {
                    name: "popupPlacement",
                    type: "PopupPlacement",
                    description: "Sets the placement of the popup relative to the anchor.",
                    defaultValue: "top left"
                },
                {
                    name: "popupSize",
                    type: "PopupSize",
                    description: "Sets the size of the popup. Available options are: <code>mini</code>, " +
                    "<code>tiny</code>, <code>small</code>, <code>large</code> & <code>huge</code>"
                },
                {
                    name: "popupWidth",
                    type: "PopupWidth",
                    description: "Sets the width of the popup. Available options are: <code>wide</code>, " +
                    "<code>very wide</code>, <code>flowing</code>"
                },
                {
                    name: "popupInverted",
                    type: "boolean",
                    description: "When <code>true</code> the popup has a black background with white text.",
                    defaultValue: "false"
                },
                {
                    name: "popupTrigger",
                    type: "PopupTrigger",
                    description: "Specifies the trigger for the popup. Options are: <code>hover</code>, " +
                                 "<code>click</code>, <code>outsideClick</code>, <code>focus</code> & <code>manual</code>.",
                    defaultValue: "hover"
                },
                {
                    name: "popupDelay",
                    type: "number",
                    description: "Sets the time delay in milliseconds before the popup opens after triggered.",
                    defaultValue: "0"
                },
                {
                    name: "popupTemplate",
                    type: "TemplateRef<ITemplatePopupContext<T>>",
                    description: "Sets the template to use when rendering the popup."
                },
                {
                    name: "popupTemplateContext",
                    type: "T",
                    description: "Sets the context object available to the popup template."
                },
                {
                    name: "popupBasic",
                    type: "boolean",
                    description: "When <code>true</code> the popup's arrow is hidden.",
                    defaultValue: "false"
                },
                {
                    name: "popupFlowing",
                    type: "boolean",
                    description: "When <code>true</code> have no maximum width and continue to flow to fit its content.",
                    defaultValue: "false"
                },
                {
                    name: "popupInline",
                    type: "boolean",
                    description: "When <code>true</code> popup will be appended as a sibling of the popup trigger element.",
                    defaultValue: "false"
                },
                {
                    name: "popupTransition",
                    type: "string",
                    description: "Sets the transition to use when displaying the popup.",
                    defaultValue: "scale"
                },
                {
                    name: "popupTransitionDuration",
                    type: "number",
                    description: "Sets the duration of the transition used when displaying the popup.",
                    defaultValue: "200"
                },
                {
                    name: "popupConfig",
                    type: "IPopupConfig",
                    description: "Takes an <code>IPopupConfig</code> object that provides " +
                                 "values for various configuration options simultaneously."
                }
            ]
        }
    ];

    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleTemplateTemplate:string = exampleTemplateTemplate;
    public examplePlacementTemplate:string = examplePlacementTemplate;
    public exampleSizeTemplate:string = exampleSizeTemplate;
    public exampleWidthTemplate:string = exampleWidthTemplate;

    public placements:string[] = [
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

    public position:string = "bottom right";

    public manualPopupMarkup:string = `
<div class="ui segment" suiPopup popupText="Manual" popupTrigger="manual" #popup="suiPopup">
    <button class="ui button" (click)="popup.open()">Open!</button>
    <button class="ui button" (click)="openPopup(popup)">Conditionally Open!</button>
    <button class="ui button" (click)="popup.toggle()">Toggle!</button>
    <button class="ui button" (click)="popup.close()">Close!</button>
</div>
`;

    public manualPopupCode:string = `
import {IPopup} from "ng2-semantic-ui";

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

    public globalConfigCode:string = `
import {SuiPopupConfig} from "ng2-semantic-ui";

@Component({})
export class MyComponent {
    constructor(globalConfig:SuiPopupConfig) {
        globalConfig.isInverted = true;
        globalConfig.delay = 300;
    }
}
`;
}

@Component({
    selector: "example-popup-standard",
    template: exampleStandardTemplate,
    providers: [SuiPopupConfig]
})
export class PopupExampleStandard {}

@Component({
    selector: "example-popup-template",
    template: exampleTemplateTemplate,
    providers: [SuiPopupConfig]
})
export class PopupExampleTemplate {}

@Component({
    selector: "example-popup-placement",
    template: examplePlacementTemplate,
    providers: [SuiPopupConfig]
})
export class PopupExamplePlacement {
    @Input()
    public position:string = "right bottom";
}

@Component({
    selector: "example-popup-size",
    template: exampleSizeTemplate,
    providers: [SuiPopupConfig]
})
export class PopupExampleSize {}

@Component({
    selector: "example-popup-width",
    template: exampleWidthTemplate,
    providers: [SuiPopupConfig]
})
export class PopupExampleWidth {}

export const PopupPageComponents = [
    PopupPage,
    PopupExampleStandard,
    PopupExampleTemplate,
    PopupExamplePlacement,
    PopupExampleSize,
    PopupExampleWidth
];
