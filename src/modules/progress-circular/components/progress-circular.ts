import { Component, Input, HostBinding } from "@angular/core";

@Component({
    selector: "sui-progress-circular",
    template: `
<div class="circle">
    <span *ngIf="showProgress">{{percentage}}%</span>
    <div class="slice" [class.rect50]="_value<=_maximum/2" [class.rect100]="_value>_maximum/2">
        <div class="bar" [style.transform]="'rotate('+degree+'deg)'"></div>
        <div class="fill"></div>
    </div>
</div>
`,
    styles: [`
.circle {
    position: relative;
    font-size: 120px;
    width: 1em;
    height: 1em;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    margin: 0 0.1em 0.1em 0;
    background-color: rgba(0,0,0,.1);
}
.circle:after {
    position: absolute;
    width: 0.84em;
    height: 0.84em;
    top: 0.08em;
    left: 0.08em;
    display: block;
    background-color: #FFFFFF;
    content: " ";
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    -ms-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}
.slice {
    position: absolute;
    width: 1em;
    height: 1em;
}
.bar, .fill {
    position: absolute;
    border: 0.08em solid #767676;
    width: 1em;
    height: 1em;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    clip: rect(0em, 0.5em, 1em, 0em);
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
.slice.rect100 .fill{
        transform: rotate(180deg);
}
.circle > span {
    position: absolute;
    width: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    width: 5em;
    line-height: 5em;
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
    private degree:number;
    private percentage:string;

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
        this.degree = 360/(this._maximum/this._value);
        const percentage = (this._value / this.maximum) * 100;
        this.percentage = percentage.toFixed();
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

    constructor() {
        this.value = 0;
        this.maximum = 100;
        this.showProgress = true;
        this.degree = 0;
        this.percentage = '0';
    }
}
