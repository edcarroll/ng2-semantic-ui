import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';
import {Search} from "../../../components/search/search.component";
import {TEMPLATE_DIRECTIVES} from "../../../components/template";

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES, TEMPLATE_DIRECTIVES, Search],
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
        <sui-search [placeholder]="placeholder" [options]="options" templateUrl="app/components/search/search.template.html"></sui-search>
    </div>
</div>
<template suiTemplate="search" #result="result">
    <div class="title">{{ result }}</div>
</template>
`
})
export class TestComponentPage {
    public options:Array<string> = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis"];
    public placeholder:string = "Search weirdness...";
}
