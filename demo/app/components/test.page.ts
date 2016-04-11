import {Component} from 'angular2/core';

import {PageTitle} from "../internal/page-title.component";

import {CHECKBOX_DIRECTIVES} from '../../../components/checkbox';
import {Search, SearchValueAccessor} from "../../../components/search/search.component";
import {TEMPLATE_DIRECTIVES} from "../../../components/template";

@Component({
    selector: 'test-component-page',
    directives: [PageTitle, CHECKBOX_DIRECTIVES, TEMPLATE_DIRECTIVES, Search, SearchValueAccessor],
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
        <sui-search [placeholder]="placeholder" [options]="options" [(ngModel)]="selected" templateId="search"></sui-search>
    </div>
    <div class="ui segment">
        <p>Selected option: {{ selected }}</p>    
    </div>
</div>
<template suiTemplate="search" #result="result">
    <div class="title">{{ result }}</div>
</template>
`
})
export class TestComponentPage {
    public options:Array<string> = ["Example", "Test", "What", "No", "Benefit", "Oranges", "Artemis", "Teeeest"];
    public placeholder:string = "Search weirdness...";
}
