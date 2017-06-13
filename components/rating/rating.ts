import {Component, Directive, Input, Output, EventEmitter, HostBinding, HostListener, forwardRef} from "@angular/core";
import {customValueAccessorFactory, CustomValueAccessor, CustomValueAccessorHost} from "../util/custom-value-accessor";

@Component({
    selector: "sui-rating",
    template: `
<i class="icon"
   *ngFor="let icon of icons; let i = index"
   (mouseover)="onMouseover(i)"
   (click)="onClick(i)"
   [class.selected]="_hoveredIndex >= i && !isReadonly"
   [class.active]="value > i">
</i>
`,
    styles: [`
:host.read-only .icon {
    cursor: auto
}
`]
})
export class SuiRating implements CustomValueAccessorHost<number> {
    @HostBinding("class.ui")
    @HostBinding("class.rating")
    private _ratingClasses:boolean;

    public value:number;

    @Output()
    public valueChange:EventEmitter<number>;

    private _maximum:number;

    @Input()
    public get maximum() {
        return this._maximum;
    }

    public set maximum(value:number) {
        this._maximum = +value;
    }

    @HostBinding("class.read-only")
    @Input()
    public isReadonly:boolean;

    public get icons() {
        return new Array(this.maximum);
    }

    private _hoveredIndex:number = -1;

    constructor() {
        this.value = 0;
        this.valueChange = new EventEmitter<number>();

        this.maximum = 5;
        this.isReadonly = false;

        this._ratingClasses = true;
    }

    private onClick(i:number) {
        if (!this.isReadonly) {
            this.value = i + 1;
            this.valueChange.emit(this.value);
        }
    }

    private onMouseover(i:number) {
        this._hoveredIndex = i;
    }

    @HostListener("mouseout")
    private onMouseout() {
        this._hoveredIndex = -1;
    }

    public writeValue(value:number) {
        this.value = value;
    }
}

@Directive({
    selector: "sui-rating",
    host: { "(valueChange)": "onChange($event)" },
    providers: [customValueAccessorFactory(SuiRatingValueAccessor)]
})
export class SuiRatingValueAccessor extends CustomValueAccessor<number, SuiRating> {
    constructor(host:SuiRating) {
        super(host);
    }
}
