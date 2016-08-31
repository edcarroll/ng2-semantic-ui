import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.css']
})
export class TabsPage {
    public api = [
        {
            selector: "<sui-tabset>"
        },
        {
            selector: "[suiTabHeader]",
            properties: [
                {
                    name: "suiTabHeader",
                    description: "Specifies the ID so the content can be linked to a <code>[suiTabContent]</code>. This must be unique.",
                    required: true
                },
                {
                    name: "isActive",
                    description: "Sets whether the tab is active. Supports being set to <code>false</code> at which time the closest available tab is activated.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    description: "Sets whether not the tab is disabled. If the tab is active when it is disabled, the closest available tab is activated.",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "isActiveChange",
                    description: "Fires when the tab's active status is changed. Using the <code>[(isActive)]</code> syntax is recommended so that the value is updated when the active tab changes."
                },
                {
                    name: "onActivate",
                    description: "Fires when the tab becomes active."
                }
            ]
        },
        {
            selector: "[suiTabContent]",
            properties: [
                {
                    name: "suiTabContent",
                    description: "Specifies the ID so the content can be linked to a <code>[suiTabHeader]</code>. This must be unique.",
                    required: true
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = `
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
    public examplePropertiesTemplate:string = `
<sui-tabset>
    <div class="ui top attached tabular menu">
        <a class="item" suiTabHeader="1" [(isActive)]="firstActive">First</a>
        <a class="item" suiTabHeader="2" [(isActive)]="secondActive" (onActivate)="alert()">
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
    public exampleDynamicTemplate:string = `
<sui-tabset>
    <div class="ui top attached tabular menu">
        <a class="item" suiTabHeader="static">Static</a>
        <a class="item" *ngFor="let tab of tabs; let i = index" [suiTabHeader]="i">{{ tab.header }}</a>
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
    public exampleStyledTemplate:string = `
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
}

@Component({
    selector: 'tab-example-standard',
    template: new TabsPage().exampleStandardTemplate
})
export class TabExampleStandard { }

@Component({
    selector: 'tab-example-properties',
    template: new TabsPage().examplePropertiesTemplate
})
export class TabExampleProperties {
    public alert = function() {
        window.alert("You've chosen the alert tab!");
    }
}

@Component({
    selector: 'tab-example-dynamic',
    template: new TabsPage().exampleDynamicTemplate
})
export class TabExampleDynamic {
    public tabs = [
        { header: "1st", content: "Dynamic content" },
        { header: "2nd", content: "More content" },
        { header: "3rd", content: "Even more content" }
    ];
    public addTab() {
        this.tabs.push({
            header: "New",
            content: "Another dynamic tab"
        });
    };
    public removeTab() {
        this.tabs.pop();
    }
}

@Component({
    selector: 'tab-example-styled',
    template: new TabsPage().exampleStyledTemplate
})
export class TabExampleStyled {
    public pointing = true;
}

export const TabsPageComponents:Array<any> = [TabsPage, TabExampleStandard, TabExampleProperties, TabExampleDynamic, TabExampleStyled];
