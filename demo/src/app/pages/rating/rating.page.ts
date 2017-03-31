import {Component} from '@angular/core';

const exampleStandardTemplate = `
<div class="ui form">
    <div class="field">
        <label>Rating</label>
        <sui-rating [(ngModel)]="rating" max="10" [isReadonly]="readonly"></sui-rating>
    </div>
    <div class="field">
        <label>Value</label>
        <input type="number" [(ngModel)]="rating">
    </div>
    <div class="field">
        <sui-checkbox [(ngModel)]="readonly">Read Only?</sui-checkbox>
    </div>
</div>
`;

const exampleStyledTemplate = `
<h5 class="ui top attached header">Stars</h5>
<div class="ui attached segment">
    <sui-rating class="star" [ngModel]="3" max="5"></sui-rating>
</div>
<h5 class="ui attached header">Hearts</h5>
<div class="ui bottom attached segment">
    <sui-rating class="heart" [ngModel]="3" max="5"></sui-rating>
</div>
`;

@Component({
    selector: 'demo-page-rating',
    templateUrl: './rating.page.html'
})
export class RatingPage {
    public api = [
        {
            selector: "<sui-rating>",
            properties: [
                {
                    name: "max",
                    description: "Sets the highest value the rating allows as input.",
                    defaultValue: "5"
                },
                {
                    name: "ngModel",
                    description: "Bind the rating value to the value of the provided variable."
                },
                {
                    name: "isReadonly",
                    description: "Sets whether or not the rating is read-only. This only affects the UI, <code>[ngModel]</code> changes will still display.",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the rating value is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "valueChange",
                    description: "Fires whenever the rating value is changed."
                }
            ]
        },
    ];
    public exampleStandardTemplate = exampleStandardTemplate;
    public exampleStyledTemplate = exampleStyledTemplate;
}

@Component({
    selector: 'rating-example-standard',
    template: exampleStandardTemplate
})
export class RatingExampleStandard {
    public rating = 3;
}

@Component({
    selector: 'rating-example-styled',
    template: exampleStyledTemplate
})
export class RatingExampleStyled {}

export const RatingPageComponents = [RatingPage, RatingExampleStandard, RatingExampleStyled];
