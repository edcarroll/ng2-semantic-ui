import {Component} from 'angular2/core';

@Component({
    selector: 'example',
    directives: [],
    template: `
<div class="info">
    <ng-content select="info"></ng-content>
    <i class="icon code" (click)="detail = !detail"></i>
</div>
<div class="html ui top attached segment">
    <ng-content select="result"></ng-content>
    <div class="ui top attached label">
        Example <i data-content="Copy code" class="copy link icon"></i>
    </div>
</div>
<div *ngIf="detail" class="annotation transition visible" style="display: none;">
    <div class="ui instructive bottom attached segment">
        <ng-content select="code"></ng-content>
    </div>
</div>
`
})
export class ExampleComponent {
    private detail:boolean = false;
}