import {Component} from '@angular/core';

const exampleStandardTemplate = `
<div class="ui segment">
    <sui-progress [value]="value" [progress]="progress" [maximum]="maximum" [precision]="precision">
        Progress Bar Label
    </sui-progress>

    <div class="ui small form">
        <div class="four fields">
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
                <label>Maximum</label>
                <input type="number" [(ngModel)]="maximum">
            </div>
            <div class="field">
                <label>Precision</label>
                <input type="number" [(ngModel)]="precision">
            </div>
        </div>
        <div class="field">
            <sui-checkbox [(ngModel)]="progress">Show Progress?</sui-checkbox>
        </div>
    </div>
</div>
`;

const exampleVariationsTemplate = `
<div class="ui segment">
    <sui-progress class="top attached purple active" [value]="changingValue" [autoSuccess]="false"></sui-progress>
    <sui-progress class="indicating" [value]="changingValue">Indicating</sui-progress>
    <sui-progress class="active" [value]="changingValue">Active</sui-progress>
    <sui-progress class="warning" [value]="changingValue">Warning</sui-progress>
    <sui-progress class="error" [value]="changingValue">Error</sui-progress>
    <sui-progress class="disabled" [value]="randomValue">Disabled</sui-progress>
    <sui-progress class="tiny" [value]="changingValue">Tiny (autohides progress)</sui-progress>
    <sui-progress class="bottom attached indicating active" [value]="changingValue"></sui-progress>
</div>
`;

@Component({
    selector: 'demo-page-progress',
    templateUrl: './progress.page.html'
})
export class ProgressPage {
    public api = [
        {
            selector: "<sui-progress>",
            properties: [
                {
                    name: "value",
                    description: "Sets whether or not the element is collapsed. Values not in <code>[0, ..., maximum]</code> are automatically bounded.",
                    defaultValue: "0"
                },
                {
                    name: "maximum",
                    description: "Sets the maximum value. When <code>value > maximum</code> the progress bar is full. Use the 1st example to try out this functionality.",
                    defaultValue: "100"
                },
                {
                    name: "progress",
                    description: "Whether or not the current progress label is displayed.",
                    defaultValue: "true"
                },
                {
                    name: "precision",
                    description: "Sets the number of decimal places on the current progress label.",
                    defaultValue: "0"
                },
                {
                    name: "autoSuccess",
                    description: "Sets whether or not the progress bar automatically turns green when <code>value == maximum</code>.",
                    defaultValue: "true"
                },
            ]
        }
    ];
    public exampleStandardTemplate = exampleStandardTemplate;
    public exampleVariationsTemplate = exampleVariationsTemplate;
}

@Component({
    selector: 'progress-example-standard',
    template: exampleStandardTemplate
})
export class ProgressExampleStandard {
    public value:number = 55;
    public progress:boolean = true;
    public maximum:number = 100;
    public precision:number = 0;
}

@Component({
    selector: 'progress-example-variations',
    template: exampleVariationsTemplate
})
export class ProgressExampleVariations {
    public value:number = 55;

    constructor() {
        this.updateChangingValue();
        this.randomValue = Math.floor(Math.random() * 100) + 1;
    }

    private updateChangingValue() {
        setTimeout(() => {
            if (this.changingValue > 120) {
                this.changingValue = -20;
            }
            else {
                this.changingValue += 2;
            }
            this.updateChangingValue();
        }, 75);
    }

    public changingValue = -20;
    public randomValue = 0;
}

export const ProgressPageComponents = [ProgressPage, ProgressExampleStandard, ProgressExampleVariations];
