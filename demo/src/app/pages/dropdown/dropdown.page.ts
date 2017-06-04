import {Component} from '@angular/core';
import {ApiDefinition} from '../../components/api/api.component';

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

@Component({
    selector: 'demo-page-dropdown',
    templateUrl: './dropdown.page.html'
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
                    description: "Defines when the dropdown is closed. Options are: <code>itemClick</code>, <code>outsideClick</code> & <code>disabled</code>.",
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
    public exampleStandardTemplate = exampleStandardTemplate;
    public exampleStyledTemplate = exampleStyledTemplate;
}

@Component({
    selector: 'dropdown-example-standard',
    template: exampleStandardTemplate
})
export class DropdownExampleStandard {
    public isOpen:boolean;
    public isDisabled:boolean;
}

@Component({
    selector: 'dropdown-example-styled',
    template: exampleStyledTemplate
})
export class DropdownExampleStyled {}

export const DropdownPageComponents = [DropdownPage, DropdownExampleStandard, DropdownExampleStyled];
