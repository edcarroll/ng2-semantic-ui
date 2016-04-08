import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES],
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
        <sui-radio-button name="test" value="a" [(ngModel)]="test">
            Hello {{ test }}
        </sui-radio-button>
        <br>
        <sui-radio-button name="test" value="b" [isReadonly]="checkbox" [(ngModel)]="test" class="slider">
            Hello {{ test }}
        </sui-radio-button>
    </div>
    
    <div class="ui compact segment">
        <sui-checkbox name="test" [isDisabled]="test != 'a'" [(ngModel)]="checkbox" class="fitted">
            
        </sui-checkbox>
    </div>
    
    <div class="ui segment">
        <button class="ui primary button" (click)="test = 'b'">Set radio to 'b'</button>
    </div>
</div>
`
})
export class TestComponentPage { public test = "b"; public checkbox = true }