import {Component, HostBinding} from 'angular2/core';

@Component({
    selector: 'page-title',
    directives: [],
    template: `
<div class="ui container">
    <h1 class="ui header">
        <ng-content select="[header]"></ng-content>
        <div class="sub header">
            <iframe class="github" src="https://ghbtns.com/github-btn.html?user=edcarroll&repo=ng2-semantic-ui&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
            <ng-content select="[sub-header]"></ng-content>
        </div>
    </h1>
</div>
`,
    styles: [`:host { display: block; }`]
})
export class PageTitle {
    @HostBinding('class.ui')
    @HostBinding('class.masthead')
    @HostBinding('class.vertical')
    @HostBinding('class.segment') classes = true;
}