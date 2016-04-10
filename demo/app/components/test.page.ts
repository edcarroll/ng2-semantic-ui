import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';
import {TAB_DIRECTIVES} from '../../../components/tab';

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES, TAB_DIRECTIVES],
    template: `
<page-title>
    <div header>Test</div>
    <div sub-header>
        <p>Test component!</p>
    </div>
</page-title>
<div class="ui main container">
    <div class="ui dividing right rail"></div>
    <h2 class="ui dividing header">Examples</h2>

    <div class="ui segment">
        <sui-tabset>
            <div class="ui pointing secondary menu">
                <a class="item" *ngFor="#tab of tabs; #i = index" [suiTabHeader]="i">{{ tab.header }}</a>
                <a class="item" suiTabHeader="first" [isDisabled]="secondTab">First</a>
                <a class="item" suiTabHeader="second" [isDisabled]="secondTab">Second</a>
                <a class="item" suiTabHeader="third" [isDisabled]="secondTab" [(isActive)]="thirdTab">Third</a>
            </div>
            <div class="ui segment" suiTabContent="first">first</div>
            <div class="ui segment" suiTabContent="second">second</div>
            <div class="ui segment" suiTabContent="third">third</div>
            <div class="ui segment" *ngFor="#tab of tabs; #i = index" [suiTabContent]="i">
                {{ tab.content }}
            </div>
        </sui-tabset>
        <button class="ui primary button" (click)="tabs.push({ header: 'Another', content:'another' })">Add Tab</button>
        <button class="ui primary button" (click)="tabs.pop()">Remove Tab</button>
        <button class="ui secondary button" (click)="thirdTab = true">Activate 3rd</button>
        <sui-checkbox [(ngModel)]="thirdTab">Activate 3rd Tab?</sui-checkbox>
        <sui-checkbox [(ngModel)]="secondTab">Disable 2nd Tab?</sui-checkbox>
    </div>    
</div>
`
})
export class TestComponentPage {
    public tabs = [
        { header: "Fourth", content: "fourth" },
        { header: "Fifth", content: "fifth" },
        { header: "Sixth", content: "sixth" }
    ];
    public thirdTab = true;
}
