import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-collapse',
  templateUrl: './collapse.page.html'
})
export class CollapsePage {
    public api = [
        {
            selector: "[suiCollapse]",
            properties: [
                {
                    name: "suiCollapse",
                    description: "Sets whether or not the element is collapsed.",
                    required: true
                },
                {
                    name: "collapseDuration",
                    description: "Sets the duration of the collapse animation.",
                    defaultValue: "350"
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = `
<div class="ui segments">
    <div class="ui segment">
        <button class="ui primary button" (click)="collapse = !collapse">
            Toggle Collapse
        </button>
    </div>
    <div class="ui segment">
        <div [suiCollapse]="collapse">
            <div class="ui segment">
                <h4 class="ui header">Collapsible Panel</h4>
                <p>Content of the panel.</p>
            </div>
        </div>
    </div>
</div>
`;
    public polyfillCode:string = `<script src="https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js"></script>`;
}

@Component({
    selector: 'collapse-example-standard',
    template: new CollapsePage().exampleStandardTemplate
})
export class CollapseExampleStandard {
    private collapse:boolean = false;
}

export const CollapsePageComponents:Array<any> = [CollapsePage, CollapseExampleStandard];
