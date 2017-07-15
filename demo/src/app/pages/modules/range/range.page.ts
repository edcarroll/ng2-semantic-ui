import { Component } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";

const exampleStandardTemplate = `
<div class="ui form">
    <div class="field">
        <label>Range</label>
        <sui-range [(value)]="value" [isReadonly]="readonly"></sui-range>
    </div>
    <div class="field">
        <label>Value</label>
        <div class="ui action input">
            <input type="number" [(ngModel)]="value">

            <button class="ui green icon button" (click)="value = value + 10">
                <i class="plus icon"></i>
            </button>
            <button class="ui red icon button" (click)="value = value - 10">
                <i class="minus icon"></i>
            </button>
        </div>
    </div>
    <div class="field">
        <sui-checkbox [(ngModel)]="readonly">Read Only?</sui-checkbox>
    </div>
</div>
`;

const exampleMinMaxTemplate = `
<div class="ui form">
    <div class="field">
        <label>Range with max value of 42 and min value of 11</label>
        <sui-range [(value)]="value" [max]="42" [min]="11"></sui-range>
    </div>
    <div class="field">
        <label>Value</label>
        <div class="ui action input">
            <input type="number" [(ngModel)]="value">

            <button class="ui green icon button" (click)="value = value + 10">
                <i class="plus icon"></i>
            </button>
            <button class="ui red icon button" (click)="value = value - 10">
                <i class="minus icon"></i>
            </button>
        </div>
    </div>
</div>
`;

const exampleStepTemplate = `
<div class="ui form">
    <div class="field">
        <label>Range that skips 5 values each step</label>
        <sui-range [(value)]="value" [step]="5"></sui-range>
    </div>
    <div class="field">
        <label>Value</label>
        <div class="ui action input">
            <input type="number" [(ngModel)]="value">

            <button class="ui green icon button" (click)="value = value + 10">
                <i class="plus icon"></i>
            </button>
            <button class="ui red icon button" (click)="value = value - 10">
                <i class="minus icon"></i>
            </button>
        </div>
    </div>
</div>
`;

@Component({
    selector: "demo-page-range",
    templateUrl: "./range.page.html"
})
export class RangePage {
    public api:ApiDefinition = [
        {
            selector: "<sui-range>",
            properties: [
                {
                    name: "min",
                    type: "number",
                    description: "The minimum value of the range.",
                    defaultValue: "0"
                },
                {
                    name: "max",
                    type: "number",
                    description: "The maximum value of the range.",
                    defaultValue: "100"
                },
                {
                    name: "step",
                    type: "number",
                    description: "The amount each step skips in value, for step 2 the value will skip like so: 0, 2, 4...",
                    defaultValue: "100"
                },
                {
                    name: "isReadonly",
                    type: "boolean",
                    description: "Sets whether or not the value is read-only. ",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "valueChange",
                    type: "number",
                    description: "Fires whenever the value value is changed."
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleMinMaxTemplate:string = exampleMinMaxTemplate;
    public exampleStepTemplate:string = exampleStepTemplate;
    public cssInclude:string = `<link rel="stylesheet" href="https://unpkg.com/semantic-ui-range@1.0.1/range.css">`;
}

@Component({
    selector: "example-range-standard",
    template: exampleStandardTemplate
})
export class RangeExampleStandard {
    public value:number = 3;
    public readonly:boolean;
}

@Component({
    selector: "example-range-min-max",
    template: exampleMinMaxTemplate
})
export class RangeExampleMinMax {
    public value:number = 3;
    public readonly:boolean;
}

@Component({
    selector: "example-range-step",
    template: exampleStepTemplate
})
export class RangeExampleStep {
    public value:number = 5;
    public readonly:boolean;
}

export const RangePageComponents = [RangePage, RangeExampleStandard, RangeExampleMinMax, RangeExampleStep];
