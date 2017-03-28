import {Component} from '@angular/core';

@Component({
  selector: 'demo-page-sidebar',
  templateUrl: './sidebar.page.html'
})
export class SidebarPage {
    public api = [
        {
            selector: "<sui-sidebar-container>"
        },
        {
            selector: "<sui-sidebar>",
            properties: [
                {
                    name: "isVisible",
                    description: "Sets whether or not the sidebar is displayed.",
                    defaultValue: "false"
                },
                {
                    name: "direction",
                    description: "Sets the direction of the sidebar relative to the <code>sui-sidebar-sibling</code> contents.",
                    defaultValue: "left"
                },
                {
                    name: "transition",
                    description: "Sets the transition used when displaying the sidebar. Options are <code>overlay</code>, <code>uncover</code>, <code>scale down</code>, <code>push</code>, <code>slide along</code> & <code>slide out</code>.",
                    defaultValue: "uncover"
                }
            ],
            events: [
                {
                    name: "isVisibleChange",
                    description: "Fires when the sidebar's visible state is changed. Supports <code>[(isVisible)]</code> syntax."
                }
            ]
        },
        {
            selector: "<sui-sidebar-sibling>",
            properties: [
                {
                    name: "isDimmedWhenVisible",
                    description: "Sets whether the page content beside the sidebar is dimmed when the sidebar is visible.",
                    defaultValue: "false"
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = `
<div class="ui top attached demo menu">
    <a class="item" (click)="sidebar.toggle()">
        <i class="sidebar icon"></i> Menu
    </a>
</div>
<sui-sidebar-container class="ui bottom attached segment">
    <sui-sidebar class="inverted vertical" #sidebar>
        <a class="item">1</a>
        <a class="item">2</a>
    </sui-sidebar>
    <sui-sidebar-sibling [isDimmedWhenVisible]="true">
        <div class="ui basic segment">
            <h3 class="ui header">Content</h3>
            <p>Example content beside the sidebar</p>
            <button class="ui button" (click)="sidebar.open()">Open Sidebar</button>
        </div>
    </sui-sidebar-sibling>
</sui-sidebar-container>
`;
    public exampleDirectionTemplate:string = `
<div class="ui top attached demo menu">
    <a class="item" (click)="sidebar.toggle()">
        <i class="sidebar icon"></i> Menu
    </a>
</div>
<sui-sidebar-container class="ui bottom attached segment">
    <sui-sidebar class="inverted" direction="bottom" [(isVisible)]="isVisible" #sidebar>
        <a class="item">1</a>
        <a class="item">2</a>
    </sui-sidebar>
    <sui-sidebar-sibling>
        <div class="ui basic segment">
            <h3 class="ui header">Content</h3>
            <p>Sidebar visibility: {{ isVisible }}</p>
            <button class="ui button" (click)="sidebar.open()">Open Sidebar</button>
        </div>
    </sui-sidebar-sibling>
</sui-sidebar-container>
`;
}

@Component({
    selector: 'sidebar-example-standard',
    template: new SidebarPage().exampleStandardTemplate
})
export class SidebarExampleStandard {}

@Component({
    selector: 'sidebar-example-direction',
    template: new SidebarPage().exampleDirectionTemplate
})
export class SidebarExampleDirection {
    isVisible:boolean = false;
}

export const SidebarPageComponents:Array<any> = [SidebarPage, SidebarExampleStandard, SidebarExampleDirection];
