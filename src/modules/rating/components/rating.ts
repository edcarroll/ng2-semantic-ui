import { Component, Directive, Input, Output, EventEmitter, HostBinding, HostListener } from "@angular/core";
import { ICustomValueAccessorHost, customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/index";

@Component({
    selector: "sui-rating",
    template: `
<i class="icon"
   *ngFor="let icon of icons; let i = index"
   (mouseover)="onMouseover(i)"
   (click)="onClick(i)"
   [class.selected]="hoveredIndex >= i && !isReadonly"
   [class.active]="value > i">
</i>
`,
    styles: [`
:host.read-only .icon {
    cursor: auto
}
`]
})
export class SuiRating implements ICustomValueAccessorHost<number> {
    @HostBinding("class.ui")
    @HostBinding("class.rating")
    private _ratingClasses:boolean;

    @Input()
    public value:number;

    @Output()
    public valueChange:EventEmitter<number>;

    private _maximum:number;

    @Input()
    public get maximum():number {
        return this._maximum;
    }

    public set maximum(value:number) {
        this._maximum = +value;
    }

    @HostBinding("class.read-only")
    @Input()
    public isReadonly:boolean;

    public get icons():undefined[] {
        // tslint:disable-next-line:prefer-literal
        return new Array(this.maximum);
    }

    public hoveredIndex:number = -1;

    constructor() {
        this.value = 0;
        this.valueChange = new EventEmitter<number>();

        this.maximum = 5;
        this.isReadonly = false;

        this._ratingClasses = true;
    }

    public onClick(i:number):void {
        if (!this.isReadonly) {
            this.value = i + 1;
            this.valueChange.emit(this.value);
        }
    }

    public onMouseover(i:number):void {
        this.hoveredIndex = i;
    }

    @HostListener("mouseout")
    public onMouseout():void {
        this.hoveredIndex = -1;
    }

    public writeValue(value:number):void {
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
