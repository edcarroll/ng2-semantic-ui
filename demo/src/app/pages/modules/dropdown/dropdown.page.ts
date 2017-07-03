import { Component } from "@angular/core";
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
<p>(autoClose set to <code>disabled</code>)</p>
<div class="ui primary pointing dropdown button" suiDropdown autoClose="disabled">
    <div class="text">Pointing</div>
    <i class="dropdown icon"></i>
    <div class="menu" suiDropdownMenu>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
    </div>
</div>
<div class="ui secondary left pointing dropdown button" suiDropdown autoClose="disabled">
    Right
    <i class="caret right icon"></i>
    <div class="menu" suiDropdownMenu>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
    </div>
</div>
<div class="ui segment">
    <p>(autoClose set to <code>outsideClick)</code></p>
    <div class="ui floating dropdown" suiDropdown autoClose="outsideClick">
        <div class="text">Floating</div>
        <i class="dropdown icon"></i>
        <div class="menu" suiDropdownMenu>
            <div class="item">Item 1</div>
            <div class="item">Item 2</div>
        </div>
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
                    description: "Sets whether or not the dropdown is disabled",
                    defaultValue: "false"
                },
                {
                    name: "autoClose",
                    type: "DropdownAutoCloseType",
                    description: "Defines when the dropdown is closed." +
                                 "Options are: <code>itemClick</code>, <code>outsideClick</code> & <code>disabled</code>.",
                    defaultValue: "itemClick"
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

export const DropdownPageComponents = [
    DropdownPage,

    DropdownExampleFileMenu,
    DropdownExampleStandard,
    DropdownExampleStyled,
    DropdownExampleMenu
];
