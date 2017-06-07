import {Component, Input, HostBinding} from '@angular/core';

@Component({
    selector: 'sui-progress',
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
}
`]
})
export class SuiProgress {
    @HostBinding('class.ui')
    @HostBinding('class.progress')
    private _popupClasses = true;

    private _value:number;
    private _maximum:number;
    private _precision:number;

    private _overrideSuccess:boolean;

    @Input()
    public autoSuccess:boolean;

    @Input()
    public showProgress:boolean;

    @Input()
    public get value() {
        return this._value;
    }

    public set value(value:number) {
        // Convert value from string to number where necessary.
        value = +value;

        if (Number.isNaN(value)) {
            return;
        }

        this._value = value;
    }

    @Input()
    public get maximum() {
        return this._maximum;
    }

    public set maximum(value:number) {
        // Convert value from string to number where necessary.
        value = +value;

        if (Number.isNaN(value)) {
            return;
        }

        this._maximum = value;
    }

    @Input()
    public get precision() {
        return this._precision;
    }

    public set precision(value:number) {
        // Convert value from string to number where necessary.
        value = +value;

        if (Number.isNaN(value)) {
            return;
        }

        this._precision = Math.min(Math.max(value, 0), 20);
    }

    @HostBinding('class.success')
    private get reachedMaximum() {
        return this._overrideSuccess || ((this.value >= this.maximum) && this.autoSuccess);
    }

    @HostBinding('attr.data-percent')
    public get percentage() {
        const boundedValue = Math.min(Math.max(this.value, 0), this.maximum);

        const percentage = (boundedValue / this.maximum) * 100;

        return percentage.toFixed(this.precision);
    }

    @Input('class')
    private set classValue(classes:string) {
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

        this._popupClasses = true;
    }
}