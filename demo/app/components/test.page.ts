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
                <!--<a class="item" *ngFor="#tab of tabs; #i = index" [suiTabHeader]="i">{{ tab?.header }}</a>-->
                <a class="item" [suiTabHeader]="first">First</a>
                <a class="item" [suiTabHeader]="third" [isDisabled]="secondTab">Second</a>
                <a class="item" [suiTabHeader]="second" [isActive]="thirdTab">Third</a>
            </div>
            <div class="ui segment" [suiTab]="first">first</div>
            <div class="ui segment" [suiTab]="second">second</div>
            <div class="ui segment" [suiTab]="third">third</div>
            <!--<div class="ui segment" *ngFor="#tab of tabs; #i = index" [suiTab]="i">-->
                <!--{{ tab?.content }}-->
            <!--</div>-->
        </sui-tabset>
        <button class="ui primary button" (click)="tabs.push({ header: 'Another', content:'More Content' })">Add Tab</button>
        <sui-checkbox [(ngModel)]="thirdTab">Activate 3rd Tab?</sui-checkbox>
        <sui-checkbox [(ngModel)]="secondTab">Disable 2nd Tab?</sui-checkbox>
    </div>    
</div>
`
})
export class TestComponentPage {
    public tabs = [
        { header: "First", content: "first" },
        { header: "Second", content: "second" },
        { header: "Third", content: "third" }
    ];
    public thirdTab = true;
}
