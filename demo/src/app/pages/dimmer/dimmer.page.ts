import {Component} from '@angular/core';

const exampleStandardTemplate = `
<div class="ui segment">
    <h4 class="ui header">Example segment</h4>
    <sui-dimmer [(isDimmed)]="isDimmed" [isClickable]="isClickable">
        <h4 class="ui inverted header">I can have content too!</h4>
    </sui-dimmer>
    <p>Some random content for the example segment.</p>
    <p>Some more content!.</p>
</div>
<button class="ui primary button" (click)="isDimmed = !isDimmed">Toggle Dimmer</button>
<sui-checkbox [(ngModel)]="isClickable">Click to close?</sui-checkbox>
`;

const exampleVariationsTemplate = `
<div class="ui segment">
    <sui-dimmer class="page" [(isDimmed)]="pageDimmed">
        <h2 class="ui inverted icon header">
            <i class="heart icon"></i>
            The page has been dimmed!
        </h2>
    </sui-dimmer>
    <sui-dimmer class="inverted" [(isDimmed)]="segmentDimmed">
        <div class="ui text loader">Enables loading screens!</div>
    </sui-dimmer>
    <p>Page dimmers and inverted dimmers are possible!</p>
    <button class="ui primary button" (click)="pageDimmed = !pageDimmed">Dim Page</button>
    <button class="ui primary button" (click)="segmentDimmed = !segmentDimmed">Dim Segment</button>
</div>
`;

@Component({
  selector: 'demo-page-dimmer',
  templateUrl: './dimmer.page.html'
})
export class DimmerPage {
    public api = [
        {
            selector: "<sui-dimmer>",
            properties: [
                {
                    name: "isDimmed",
                    description: "Sets whether or not the dimmer is active.",
                    defaultValue: "false"
                },
                {
                    name: "isClickable",
                    description: "Sets whether or not clicking the dimmer will dismiss it.",
                    defaultValue: "true"
                }
            ],
            events: [
                {
                    name: "isDimmedChange",
                    description: "Fires whenever the dimmer is toggled. Use the <code>[(isDimmed)]</code> syntax to update when the user clicks out of the dimmer."
                }
            ]
        }
    ];
    public exampleStandardTemplate = exampleStandardTemplate;
    public exampleVariationsTemplate = exampleVariationsTemplate;
}

@Component({
    selector: 'dimmer-example-standard',
    template: exampleStandardTemplate
})
export class DimmerExampleStandard {
    public isClickable:boolean = true;
}

@Component({
    selector: 'dimmer-example-variations',
    template: exampleVariationsTemplate
})
export class DimmerExampleVariations {
    public isClickable:boolean = true;
}

export const DimmerPageComponents = [DimmerPage, DimmerExampleStandard, DimmerExampleVariations];
