import { Component, Input, HostBinding } from "@angular/core";

@Component({
    selector: "sui-progress",
    template: `
<div class="bar" [style.width.%]="percentage">
    <div class="progress" *ngIf="showProgress">{{ percentage }}%</div>
</div>
<div class="label">
    <ng-content></ng-content>
</div>
`,
    styles: [`
.bar {
    transition-duration: 300ms !important;
    z-index: 1;
}
`]
})
export class SuiProgress {
    @HostBinding("class.ui")
    @HostBinding("class.progress")
    public readonly hasClasses:boolean;

    private _value:number;
    private _maximum:number;
    private _precision:number;

    private _overrideSuccess:boolean;

    @Input()
    public autoSuccess:boolean;

    @Input()
    public showProgress:boolean;

    @Input()
    public get value():number {
        return this._value;
    }

    public set value(value:number) {
        // Convert value from string to number where necessary.
        const converted = +value;

        if (Number.isNaN(converted)) {
            return;
        }

        this._value = converted;
    }

    @Input()
    public get maximum():number {
        return this._maximum;
    }

    public set maximum(value:number) {
        // Convert value from string to number where necessary.
        const converted = +value;

        if (Number.isNaN(converted)) {
            return;
        }

        this._maximum = converted;
    }

    @Input()
    public get precision():number {
        return this._precision;
    }

    public set precision(value:number) {
        // Convert value from string to number where necessary.
        const converted = +value;

        if (Number.isNaN(converted)) {
            return;
        }

        this._precision = Math.min(Math.max(converted, 0), 20);
    }

    @HostBinding("class.success")
    public get reachedMaximum():boolean {
        return this._overrideSuccess || ((this.value >= this.maximum) && this.autoSuccess);
    }

    @HostBinding("attr.data-percent")
    public get percentage():string {
        const boundedValue = Math.min(Math.max(this.value, 0), this.maximum);

        const percentage = (boundedValue / this.maximum) * 100;

        return percentage.toFixed(this.precision);
    }

    @Input("class")
    public set classValue(classes:string) {
        if (classes.includes("attached") || classes.includes("tiny")) {
            this.showProgress = false;
        }
        if (classes.includes("success")) {
            this._overrideSuccess = true;
        }
    }

    constructor() {
        this.value = 0;
        this.maximum = 100;
        this.precision = 0;

        this._overrideSuccess = false;
        this.autoSuccess = true;
        this.showProgress = true;

        this.hasClasses = true;
    }
}
