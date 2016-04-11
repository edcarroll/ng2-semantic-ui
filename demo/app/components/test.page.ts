import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';
import {Search} from "../../../components/search/search.component";

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES, Search],
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
        <sui-search [(isOpen)]="open"></sui-search>
        <button class="ui primary button" (click)="open = !open">Toggle</button>
    </div>    
</div>
`
})
export class TestComponentPage {
    public value = 5;
    public isReadonly = true;
}
