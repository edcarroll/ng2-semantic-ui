import { Component, Input, HostBinding } from "@angular/core";

@Component({
    selector: "sui-progress-circular",
    template: `
<div class="circle">
    <span class="progress" *ngIf="showProgress">{{percentage}}%</span>
    <div class="slice" [class.rect50]="isHalf" [class.rect100]="!isHalf">
        <div class="bar" [style.transform]="'rotate('+degree+'deg)'"></div>
        <div class="fill"></div>
    </div>
</div>
`,
    styles: [`
:host.big .circle {
    font-size: 240px;
}
:host.small .circle {
    font-size: 48px;
}

:host.red .bar,:host.red .fill {
    border-color: #db2828;
}
:host.red .progress {
    color: #db2828;
}
:host.orange .bar,:host.orange .fill {
    border-color: #f2711c;
}
:host.orange .progress {
    color: #f2711c;
}
:host.yellow .bar,:host.yellow .fill {
    border-color: #fbbd08;
}
:host.yellow .progress {
    color: #fbbd08;
}
:host.olive .bar,:host.olive .fill {
    border-color: #b5cc18;
}
:host.olive .progress {
    color: #b5cc18;
}
:host.success .bar,:host.success .fill {
    border-color: #21ba45 !important;
}
:host.success .progress {
    color: #21ba45 !important;
}
:host.green .bar,:host.green .fill {
    border-color: #21ba45;
}
:host.green .progress {
    color: #21ba45;
}
:host.teal .bar,:host.teal .fill {
    border-color: #00b5ad;
}
:host.teal .progress {
    color: #00b5ad;
}
:host.blue .bar,:host.blue .fill {
    border-color: #2185d0;
}
:host.blue .progress {
    color: #2185d0;
}
:host.violet .bar,:host.violet .fill {
    border-color: #6435c9;
}
:host.violet .progress {
    color: #6435c9;
}
:host.purple .bar,:host.purple .fill {
    border-color: #a333c8;
}
:host.purple .progress {
    color: #a333c8;
}
:host.pink .bar,:host.pink .fill {
    border-color: #e03997;
}
:host.pink .progress {
    color: #e03997;
}
:host.brown .bar,:host.brown .fill {
    border-color: #a5673f;
}
:host.brown .progress {
    color: #a5673f;
}
:host.grey .bar,:host.grey .fill {
    border-color: #767676;
}
:host.grey .progress {
    color: #767676;
}
:host.black .bar,:host.black .fill {
    border-color: #1b1c1d;
}
:host.black .progress {
    color: #1b1c1d;
}
.circle, .slice, .bar, .fill {
    width: 1em;
    height: 1em;
}
.slice {
    margin-left: -0.08em;
    margin-top: -0.08em;
}
.circle {
    position: relative;
    font-size: 120px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    margin: 0 0.1em 0.1em 0;
    background-color: transparent;
    width: 1em;
    height: 1em;
    border: 0.08em solid rgba(0,0,0,.1);
}
.slice {
    position: absolute;
}
.bar, .fill {
    position: absolute;
    border: 0.08em solid #767676;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    clip: rect(0em, 0.5em, 1em, 0em);
    -webkit-transition: border-color 0.2s linear;
    -moz-transition: border-color 0.2s linear;
    -ms-transition: border-color 0.2s linear;
    -o-transition: border-color 0.2s linear;
    transition: border-color 0.2s linear;
}
.bar {
    -webkit-transition: -webkit-transform 0.2s linear;
    -moz-transition: -moz-transform 0.2s linear;
    -ms-transition: -ms-transform 0.2s linear;
    -o-transition: -o-transform 0.2s linear;
    transition: transform 0.2s linear;
}
.slice.rect50 {
    clip: rect(0em, 1em, 1em, 0.5em);
}
.slice.rect100 {
    clip: rect(auto, auto, auto, auto);
}
.slice.rect50 .fill {
    display: none;
}
.fill{
    transform: rotate(180deg);
}
.circle > span {
    position: absolute;
    width: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    width: 4.2em;
    line-height: 4.2em;
    font-size: 0.2em;
    color: #767676;
    display: block;
    text-align: center;
    white-space: nowrap;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    -ms-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}
`]
})
export class SuiProgressCircular {
    private _value:number;
    private _maximum:number;
    private _precision:number;
    private _degree:number;
    private _percentage:string;
    private _isHalf:boolean;

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
        this._value = Math.min(Math.max(this._value, 0), this._maximum);
    }

    @HostBinding("attr.data-percent")
    public get percentage():string {
        const boundedValue = Math.min(Math.max(this.value, 0), this.maximum);

        const percentage = (boundedValue / this.maximum) * 100;

        return percentage.toFixed(this.precision);
    }

    public get isHalf() {
        return +this.percentage <= 51;
    }

    public get degree() {
        return 360 / (this._maximum / this._value);
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
    public autoSuccess:boolean;

    @HostBinding("class.success")
    private get _reachedMaximum():boolean {
        return ((this.value >= this.maximum) && this.autoSuccess);
    }

    constructor() {
        this.value = 0;
        this.maximum = 100;
        this.showProgress = true;
        this._degree = 0;
        this._percentage = "0";
        this._isHalf = false;
        this.autoSuccess = true;
    }
}
