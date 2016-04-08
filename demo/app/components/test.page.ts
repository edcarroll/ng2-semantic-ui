import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {DIMMER_DIRECTIVES} from '../../../components/dimmer';

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, DIMMER_DIRECTIVES],
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

    <div class="ui blurring segment">
        <h3 class="ui header">Hello!</h3>
        
        <p>This is some body content.</p>
    </div>
    <sui-dimmer [(isDimmed)]="dimmed" [isDisabled]="disabled" class="page">
            <h5 class="ui inverted header">
                Dimmed Message!
            </h5>
        </sui-dimmer>
    <button class="ui primary button" (click)="dimmed = !dimmed">Dim</button>
    <button class="ui primary button" (click)="disabled = !disabled">Disable</button>
</div>
`
})
export class TestComponentPage { public test = "b"; public checkbox = true }
