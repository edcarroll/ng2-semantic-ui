import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

// import {PROGRESS_DIRECTIVES} from '../../../components/progress';

@Component({
    selector: 'test-component-page',
    directives: [PageTitle],
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
        <sui-progress-bar [value]="value" [progress]="true" precision="2">Progress Bar</sui-progress-bar>
        <div class="ui input">
            <input type="number" [(ngModel)]="value">
        </div>
    </div>
</div>
`
})
export class TestComponentPage {
    public value = 50;
}
