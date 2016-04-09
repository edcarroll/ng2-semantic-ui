import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {MESSAGE_DIRECTIVES} from '../../../components/message';

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, MESSAGE_DIRECTIVES],
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
        <sui-message class="pink">
            <div class="header">
                Welcome back!
            </div>
            <p>This is a special notification which you can dismiss if you're bored with it.</p>
        </sui-message>
    </div>    
</div>
`
})
export class TestComponentPage { }
