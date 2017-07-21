import { Component } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";
import { SuiModalService } from "ng2-semantic-ui";
import { AlertModal } from "../../../modals/alert.modal";

const exampleStandardTemplate = `
<sui-tabset>
    <div class="ui top attached tabular menu">
        <a class="item" suiTabHeader="1">First</a>
        <a class="item" suiTabHeader="2">Second</a>
        <a class="item" suiTabHeader="3">Third</a>
    </div>
    <div class="ui bottom attached segment" suiTabContent="1">First tab!</div>
    <div class="ui bottom attached segment" suiTabContent="2">Second tab!</div>
    <div class="ui bottom attached segment" suiTabContent="3">Third tab!</div>
</sui-tabset>
`;

const examplePropertiesTemplate = `
<sui-tabset>
    <div class="ui top attached tabular menu">
        <a class="item" suiTabHeader="1" [(isActive)]="firstActive">First</a>
        <a class="item" suiTabHeader="2" [(isActive)]="secondActive" (activate)="alert()">
            <i class="alarm icon"></i>
            Second
        </a>
        <a class="item" suiTabHeader="3" [(isActive)]="thirdActive" [isDisabled]="thirdDisabled">Third</a>

    </div>
    <div class="ui bottom attached segment" suiTabContent="1">
        <button class="ui blue button" (click)="secondActive = true">Activate 2nd Tab</button>
    </div>
    <div class="ui bottom attached segment" suiTabContent="2">
        <button class="ui violet button" (click)="thirdActive = true">Activate 3rd Tab</button>
    </div>
    <div class="ui bottom attached segment" suiTabContent="3">
        <button class="ui purple button" (click)="firstActive = true">Activate 1st Tab</button>
    </div>
</sui-tabset>
<div class="ui segment">
    <sui-checkbox [(ngModel)]="thirdDisabled">Third tab disabled?</sui-checkbox>
</div>
`;

const exampleDynamicTemplate = `
<sui-tabset>
    <div class="ui top attached tabular menu">
        <a class="item" suiTabHeader="static">Static</a>
        <a class="item" *ngFor="let tab of tabs; let i = index" [suiTabHeader]="i" [(isActive)]="active[i]">{{ tab.header }}</a>
    </div>
    <div class="ui bottom attached segment" *ngFor="let tab of tabs; let i = index" [suiTabContent]="i">{{ tab.content }}</div>
    <div class="ui bottom attached segment" suiTabContent="static">
        <p>Static tabs alongside dynamic tabs are supported.</p>
        <p>Note that the order that <code>[suiTabContent]</code> elements are defined doesn't affect the headers.</p>
    </div>
</sui-tabset>
<div class="ui segment">
    <button class="ui primary button" (click)="addTab()">Add Tab</button>
    <button class="ui secondary button" (click)="removeTab()">Remove Tab</button>
</div>
`;

const exampleStyledTemplate = `
<sui-tabset>
    <div class="ui secondary menu">
        <a class="item" suiTabHeader="1">First</a>
        <a class="item" suiTabHeader="2">Second</a>
        <a class="item" suiTabHeader="3">Third</a>
    </div>
    <div class="ui segment" suiTabContent="1">
        <sui-tabset>
            <div class="ui pointing secondary menu">
                <a class="item" suiTabHeader="1">Nested 1</a>
                <a class="item" suiTabHeader="2">Nested 2</a>
            </div>
            <div class="ui segment" suiTabContent="1">First nested tab!</div>
            <div class="ui segment" suiTabContent="2">Second nested tab!</div>
        </sui-tabset>
    </div>
    <div class="ui segment" suiTabContent="2">Second tab!</div>
    <div class="ui segment" suiTabContent="3">Third tab!</div>
</sui-tabset>
`;

@Component({
    selector: "demo-page-tabs",
    templateUrl: "./tabs.page.html"
})
export class TabsPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-tabset>"
        },
        {
            selector: "[suiTabHeader]",
            properties: [
                {
                    name: "suiTabHeader",
                    type: "string",
                    description: "Specifies the ID so the content can be linked to a <code>[suiTabContent]</code>. This must be unique.",
                    required: true
                },
                {
                    name: "isActive",
                    type: "boolean",
                    description: "Sets whether the tab is active. Supports being set to <code>false</code> " +
                                 "at which time the closest available tab is activated.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    type: "boolean",
                    description: "Sets whether not the tab is disabled. If the tab is active when it is disabled, " +
                                 "the closest available tab is activated.",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "isActiveChange",
                    type: "boolean",
                    description: "Fires when the tab's active status is changed. Using the <code>[(isActive)]</code> " +
                                 "syntax is recommended so that the value is updated when the active tab changes."
                },
                {
                    name: "activate",
                    type: "void",
                    description: "Fires when the tab activates."
                },
                {
                    name: "deactivate",
                    type: "void",
                    description: "Fires when the tab deactivates."
                }
            ]
        },
        {
            selector: "[suiTabContent]",
            properties: [
                {
                    name: "suiTabContent",
                    type: "string",
                    description: "Specifies the ID so the content can be linked to a <code>[suiTabHeader]</code>. This must be unique.",
                    required: true
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public examplePropertiesTemplate:string = examplePropertiesTemplate;
    public exampleDynamicTemplate:string = exampleDynamicTemplate;
    public exampleStyledTemplate:string = exampleStyledTemplate;
}

@Component({
    selector: "example-tab-standard",
    template: exampleStandardTemplate
})
export class TabExampleStandard {}

@Component({
    selector: "example-tab-properties",
    template: examplePropertiesTemplate
})
export class TabExampleProperties {
    public firstActive:boolean;
    public secondActive:boolean;
    public thirdActive:boolean;

    public thirdDisabled:boolean;

    constructor(public modalService:SuiModalService) {
        this.firstActive = true;
    }

    public alert():void {
        this.modalService.open(new AlertModal("You've chosen the alert tab!"));
    }
}

@Component({
    selector: "example-tab-dynamic",
    template: exampleDynamicTemplate
})
export class TabExampleDynamic {
    public active:boolean[] = [];
    public tabs:{ header:string; content:string }[] = [
        { header: "1st", content: "Dynamic content" },
        { header: "2nd", content: "More content" },
        { header: "3rd", content: "Even more content" }
    ];

    public addTab():void {
        this.active.push(true);
        this.tabs.push({
            header: "New",
            content: "Another dynamic tab"
        });
    }
    public removeTab():void {
        this.active.pop();
        this.tabs.pop();
    }
}

@Component({
    selector: "example-tab-styled",
    template: exampleStyledTemplate
})
export class TabExampleStyled {
    public pointing:boolean = true;
}

export const TabsPageComponents = [TabsPage, TabExampleStandard, TabExampleProperties, TabExampleDynamic, TabExampleStyled];
