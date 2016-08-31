import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-dropdown',
  templateUrl: 'dropdown.page.html',
  styleUrls: ['dropdown.page.css']
})
export class DropdownPage {
    public api = [
        {
            selector: "[suiDropdown]",
            properties: [
                {
                    name: "isOpen",
                    description: "Sets whether or not the dropdown is open.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    description: "Sets whether or not the dropdown is disabled",
                    defaultValue: "false"
                },
                {
                    name: "autoClose",
                    description: "Defines when the dropdown is closed. Options are: <code>itemClick</code>, <code>outsideClick</code> & <code>disabled</code>.",
                    defaultValue: "itemClick"
                }
            ],
            events: [
                {
                    name: "isOpenChange",
                    description: "Fires whenever the dropdown is toggled. <code>[(isOpen)]</code> syntax is supported."
                },
                {
                    name: "onToggle",
                    description: "Fires whenever the dropdown is toggled, as above."
                }
            ]
        },
        {
            selector: "[suiDropdownMenu]"
        }
    ]
}

@Component({
    selector: 'dropdown-example-standard',
    template: `
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
`
})
export class DropdownExampleStandard { }

@Component({
    selector: 'dropdown-example-styled',
    template: `
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
`
})
export class DropdownExampleStyled { }

export const DROPDOWN_EXAMPLES:Array<any> = [DropdownExampleStandard, DropdownExampleStyled];
