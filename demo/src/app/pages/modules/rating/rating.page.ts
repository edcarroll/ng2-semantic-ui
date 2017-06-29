import { Component } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";

const exampleStandardTemplate = `
<div class="ui form">
    <div class="field">
        <label>Rating</label>
        <sui-rating [(ngModel)]="rating" [maximum]="10" [isReadonly]="readonly"></sui-rating>
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
    <sui-rating class="star" [ngModel]="3" [maximum]="5"></sui-rating>
</div>
<h5 class="ui attached header">Hearts</h5>
<div class="ui bottom attached segment">
    <sui-rating class="heart" [ngModel]="3" [maximum]="5"></sui-rating>
</div>
`;

@Component({
    selector: "demo-page-rating",
    templateUrl: "./rating.page.html"
})
export class RatingPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-rating>",
            properties: [
                {
                    name: "maximum",
                    type: "number",
                    description: "Sets the highest value the rating allows as input.",
                    defaultValue: "5"
                },
                {
                    name: "isReadonly",
                    type: "boolean",
                    description: "Sets whether or not the rating is read-only. " +
                                 "This only affects the UI, <code>[ngModel]</code> changes will still display.",
                    defaultValue: "false"
                },
                {
                    name: "ngModel",
                    type: "number",
                    description: "Bind the rating value to the value of the provided variable."
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    type: "number",
                    description: "Fires whenever the rating value is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "valueChange",
                    type: "number",
                    description: "Fires whenever the rating value is changed."
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleStyledTemplate:string = exampleStyledTemplate;
}

@Component({
    selector: "example-rating-standard",
    template: exampleStandardTemplate
})
export class RatingExampleStandard {
    public rating:number = 3;
    public readonly:boolean;
}

@Component({
    selector: "example-rating-styled",
    template: exampleStyledTemplate
})
export class RatingExampleStyled {}

export const RatingPageComponents = [RatingPage, RatingExampleStandard, RatingExampleStyled];
