import {Component, Input, HostBinding} from '@angular/core';

@Component({
    selector: 'sui-progress',
    exportAs: 'suiProgress',
    template: `
<div class="bar" [style.width.%]="percentage">
    <div class="progress" *ngIf="progress">{{ percentage }}%</div>
</div>
<div class="label">
    <ng-content></ng-content>
</div>
`,
    styles: [`.bar { transition-duration: 300ms !important; }`]
})
export class SuiProgress {
    @HostBinding('class.ui')
    @HostBinding('class.progress') classes = true;

    @HostBinding('class.success')
    private get reachedMaximum() {
        return this.value == this.maximum && this.autoSuccess;
    }

    private _value:number = 0;
    private unscaledValue:number = 0;
    private _maximum:number = 100;

    @Input() public autoSuccess:boolean = true;
    @Input() public progress:boolean = true;
    @Input() public precision:number = 0;

    @Input()
    public set value(value:any) {
        value = parseFloat(value);
        if (Number.isNaN(value)) {
            return;
        }
        value = Math.max(value, 0);
        //Keep this for when maximum changes
        this.unscaledValue = value;

        value = Math.min(value, this.maximum);
        this._value = parseFloat((value / this.maximum * 100).toFixed(Math.min(20, Math.max(this.precision, 0))));
    }

    public get value() {
        return this._value;
    }

    @Input()
    public set maximum(value:any) {
        value = parseFloat(value);
        if (Number.isNaN(value)) {
            return;
        }
        value = Math.max(value, 0);
        this._maximum = value;
        this.value = this.unscaledValue;
    }

    public get maximum() {
        return this._maximum;
    }

    @HostBinding('attr.data-percent')
    private get percentage():string {
        return this._value.toString();
    }

    @Input('class')
    private set classValue(value:string) {
        if (value.includes("attached") || value.includes("tiny")) {
            this.progress = false;
        }
    }
}

export const SUI_PROGRESS_DIRECTIVES = [SuiProgress];
