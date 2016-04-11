import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';
import {RATING_DIRECTIVES} from "../../../components/rating";

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES, RATING_DIRECTIVES],
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
        <sui-rating class="star" max="8" [(ngModel)]="value" [isReadonly]="isReadonly"></sui-rating>
        <sui-checkbox [(ngModel)]="isReadonly">Is readonly?</sui-checkbox>
    </div>    
</div>
`
})
export class TestComponentPage {
    public value = 5;
    public isReadonly = true;
}
