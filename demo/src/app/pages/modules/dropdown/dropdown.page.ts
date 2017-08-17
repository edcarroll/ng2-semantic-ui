import { Component, Input } from '@angular/core';
import { ApiDefinition } from "../../../components/api/api.component";

const exampleFileMenuTemplate = `
<div class="ui dropdown" suiDropdown>
    <div class="text">File</div>
    <i class="dropdown icon"></i>
    <div class="menu" suiDropdownMenu>
        <div class="item">New</div>
        <div class="item">
            <span class="description">ctrl + o</span>
            Open...
        </div>
        <div class="item">
            <span class="description">ctrl + s</span>
            Save as...
        </div>
        <div class="item">
            <span class="description">ctrl + r</span>
            Rename
        </div>
        <div class="item">Make a copy</div>
        <div class="item">
            <i class="folder icon"></i>
            Move to folder
        </div>
        <div class="item">
            <i class="trash icon"></i>
            Move to trash
        </div>
        <div class="divider"></div>
        <div class="item">Download As...</div>
        <div class="item" suiDropdown>
            <i class="dropdown icon"></i>
            Publish To Web
            <div class="menu" suiDropdownMenu>
                <div class="item">Google Docs</div>
                <div class="item">Google Drive</div>
                <div class="item">Dropbox</div>
                <div class="item">Another Service...</div>
            </div>
        </div>
        <div class="item">E-mail Collaborators</div>
    </div>
</div>
`;

const exampleStandardTemplate = `
<p>You can use the keyboard to navigate the dropdown.</p>
<div class="ui primary dropdown button" suiDropdown [(isOpen)]="isOpen" [isDisabled]="isDisabled">
    <div class="text">Dropdown</div>
    <i class="dropdown icon"></i>
    <div class="menu" suiDropdownMenu>
        <div class="item">Item 1</div>
        <div class="disabled item">Disabled Item</div>
        <div class="item" suiDropdown>
            <i class="dropdown icon"></i>
            Nested
            <div class="menu" suiDropdownMenu>
                <div class="item">Sub-item 1</div>
                <div class="item">Sub-item 2</div>
            </div>
        </div>
        <div class="item">Item 4</div>
    </div>
</div>
<button class="ui secondary button" (click)="isOpen = !isOpen">Toggle Dropdown</button>
<sui-checkbox [(ngModel)]="isDisabled != isDisabled">Disabled?</sui-checkbox>
`;

const exampleStyledTemplate = `
<div class="ui primary pointing dropdown button" suiDropdown>
    <div class="text">Pointing</div>
    <i class="dropdown icon"></i>
    <div class="menu" suiDropdownMenu>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
    </div>
</div>
<div class="ui secondary left pointing dropdown button" suiDropdown >
    Right
    <i class="caret right icon"></i>
    <div class="menu" suiDropdownMenu>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
    </div>
</div>
<div class="ui floating dropdown" suiDropdown >
    <div class="text">Floating</div>
    <i class="dropdown icon"></i>
    <div class="menu" suiDropdownMenu>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
    </div>
</div>
`;

const exampleMenuTemplate = `
<div class="ui menu">
    <a class="item">Home</a>
    <div class="ui pointing dropdown link item" suiDropdown>
        <span class="text">Shopping</span>
        <i class="dropdown icon"></i>
        <div class="menu" suiDropdownMenu>
            <div class="header">Categories</div>
            <div class="item" suiDropdown>
                <i class="dropdown icon"></i>
                <span class="text">Clothing</span>
                <div class="menu" suiDropdownMenu>
                    <div class="header">Mens</div>
                    <div class="item">Shirts</div>
                    <div class="item">Pants</div>
                    <div class="item">Jeans</div>
                    <div class="item">Shoes</div>
                    <div class="divider"></div>
                    <div class="header">Womens</div>
                    <div class="item">Dresses</div>
                    <div class="item">Shoes</div>
                    <div class="item">Bags</div>
                </div>
            </div>
            <div class="item">Home Goods</div>
            <div class="item">Bedroom</div>
            <div class="divider"></div>
            <div class="header">Order</div>
            <div class="item">Status</div>
            <div class="item">Cancellations</div>
        </div>
    </div>
    <a class="item">Forums</a>
    <a class="item">Contact Us</a>
</div>
`;

const exampleHoverTriggerTemplate = `
<div class="ui primary dropdown button" suiDropdown [hoverOpenDelay]="openDelay" [hoverCloseDelay]="closeDelay" [openTrigger]="openTrigger" [closeTriggers]="activeCloseTriggers">
    <div class="text">Menu</div>
    <i class="dropdown icon"></i>
    <div class="menu" suiDropdownMenu>
        <div class="item">Item 1</div>
        <div class="disabled item">Disabled Item</div>
        <div class="item" suiDropdown>
            <i class="dropdown icon"></i>
            Nested 1
            <div class="menu" suiDropdownMenu>
                <div class="item">Sub-item 1</div>
                <div class="item">Sub-item 2</div>
            </div>
        </div>
        <div class="item">Item 4</div>
        <div class="item" suiDropdown>
            <i class="dropdown icon"></i>
            Nested 2
            <div class="menu" suiDropdownMenu>
                <div class="item">Sub-item 1</div>
                <div class="item">Sub-item 2</div>
            </div>
        </div>
    </div>
</div>
<br/>
<br/>
<div class="ui small form">
    <div class="inline fields">
        <label>Open Trigger</label>
        <div class="field">
            <sui-radio-button value="click" [(ngModel)]="openTrigger"><code>click</code></sui-radio-button>
        </div>
        <div class="field">
            <sui-radio-button value="hover" [(ngModel)]="openTrigger"><code>hover</code></sui-radio-button>
        </div>
    </div>

    <div class="inline fields" *ngIf="openTrigger === 'hover'">
        <div class="field">
            <label>Hover Open Delay (ms)</label>
            <div class="ui action input">
                <input type="number" [(ngModel)]="openDelay">
                <button class="ui icon button" (click)="openDelay = openDelay + 50">
                    <i class="plus icon"></i>
                </button>
                <button class="ui icon button" (click)="openDelay = openDelay - 50">
                    <i class="minus icon"></i>
                </button>
            </div>
        </div>

        <div class="field">
            <label>Hover Close Delay (ms)</label>
            <div class="ui action input">
                <input type="number" [(ngModel)]="closeDelay">
                <button class="ui icon button" (click)="closeDelay = closeDelay + 50">
                    <i class="plus icon"></i>
                </button>
                <button class="ui icon button" (click)="closeDelay = closeDelay - 50">
                    <i class="minus icon"></i>
                </button>
            </div>
        </div>
    </div>

    <div class="grouped fields">
        <label>Closing Triggers</label>
        <div class="field" *ngFor="let o of closeTriggers;let i = index">
            <sui-checkbox [(ngModel)]="o.active"><code>{{o.trigger}}</code> - {{o.description}}</sui-checkbox>
        </div>
    </div>
</div>
`;

@Component({
    selector: "demo-page-dropdown",
    templateUrl: "./dropdown.page.html"
})
export class DropdownPage {
    public api:ApiDefinition = [
        {
            selector: "[suiDropdown]",
            properties: [
                {
                    name: "isOpen",
                    type: "boolean",
                    description: "Sets whether or not the dropdown is open.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    type: "boolean",
                    description: "Sets whether or not the dropdown is disabled.",
                    defaultValue: "false"
                },
                {
                    name: "openTrigger",
                    type: "DropdownOpenTrigger",
                    description: "Specifies a trigger to open the dropdown. Options are: <code>click</code> or <code>hover</code>.",
                    defaultValue: "click"
                },
                {
                    name: "closeTriggers",
                    type: "DropdownCloseTrigger | DropdownCloseTrigger[]",
                    description: "Specifies one or more triggers to close the dropdown. Options are: <code>click</code>,  <code>itemClick</code>,  <code>outsideClick</code> & <code>outsideHover</code>.",
                    defaultValue: "[click, itemClick, outsideClick]"
                },
                {
                    name: "hoverOpenDelay",
                    type: "number",
                    description: "Specifies the delay in milliseconds before opening the dropdown on hover.",
                    defaultValue: "100"
                },
                {
                    name: "hoverCloseDelay",
                    type: "number",
                    description: "Specifies the delay in milliseconds before closing the dropdown on outside hover.",
                    defaultValue: "500"
                }
            ],
            events: [
                {
                    name: "isOpenChange",
                    type: "boolean",
                    description: "Fires whenever the dropdown is toggled. <code>[(isOpen)]</code> syntax is supported."
                }
            ]
        },
        {
            selector: "[suiDropdownMenu]",
            properties: [
                {
                    name: "menuAutoSelectFirst",
                    type: "boolean",
                    description: "Sets whether or not the first item in the dropdown is highlighted.",
                    defaultValue: "false"
                },
                {
                    name: "menuTransition",
                    type: "string",
                    description: "Sets the transition used when displaying the dropdown menu.",
                    defaultValue: "slide down"
                },
                {
                    name: "menuTransitionDuration",
                    type: "number",
                    description: "Sets the duration for the menu transition.",
                    defaultValue: "200"
                }
            ]
        }
    ];

    public exampleFileMenuTemplate:string = exampleFileMenuTemplate;
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleStyledTemplate:string = exampleStyledTemplate;
    public exampleMenuTemplate:string = exampleMenuTemplate;
    public exampleHoverTriggerTemplate:string = exampleHoverTriggerTemplate;
}

@Component({
    selector: "example-dropdown-file-menu",
    template: exampleFileMenuTemplate
})
export class DropdownExampleFileMenu {}

@Component({
    selector: "example-dropdown-standard",
    template: exampleStandardTemplate
})
export class DropdownExampleStandard {
    public isOpen:boolean;
    public isDisabled:boolean;
}

@Component({
    selector: "example-dropdown-styled",
    template: exampleStyledTemplate
})
export class DropdownExampleStyled {}

@Component({
    selector: "example-dropdown-menu",
    template: exampleMenuTemplate
})
export class DropdownExampleMenu {}

@Component({
    selector: "example-dropdown-hover-trigger",
    template: exampleHoverTriggerTemplate
})
export class DropdownExampleHoverTrigger {
    public outside:boolean = false;
    public openDelay:number = 100;
    public closeDelay:number = 500;

    public closeTriggers: { trigger: string; active: boolean; description:string}[] = [
        { trigger: "click", active: false, description: "on same trigger element used to open dropdown" },
        { trigger: "itemClick", active: false, description: "click on any item within dropdown menu" },
        { trigger: "outsideClick", active: false, description: "click anywhere outside of dropdown" },
        { trigger: "outsideHover", active: false, description: "move pointer outside of dropdown"  }
    ];

    private _openTrigger: string = "click";
    @Input()
    public get openTrigger(): string {
        return this._openTrigger;
    }
    public set openTrigger(val: string) {
        this._openTrigger = val;
        let defaultCloseTriggers = [];
        if (val === "click") {
            defaultCloseTriggers = ["click", "outsideClick", "itemClick"];
        } else {
            defaultCloseTriggers = ["outsideHover", "itemClick"];
        }
        this.closeTriggers.forEach(t => t.active = defaultCloseTriggers.indexOf(t.trigger) > -1);
    }

    public get activeCloseTriggers(): string[] {
        return this.closeTriggers.filter(t => t.active).map(t => t.trigger);
    }

    constructor() {
        this.openTrigger = "click";
    }
}

export const DropdownPageComponents = [
    DropdownPage,

    DropdownExampleFileMenu,
    DropdownExampleStandard,
    DropdownExampleStyled,
    DropdownExampleMenu,
    DropdownExampleHoverTrigger
];
