import {Component, Directive, Input, Output, EventEmitter, HostBinding, HostListener, forwardRef} from '@angular/core';
import {customValueAccessorFactory, CustomValueAccessor} from '../util/custom-value-accessor';

@Component({
    selector: 'sui-rating',
    template: `
<i class="icon"
   *ngFor="let icon of icons; let i = index"
   (mouseover)="mouseover(i)"
   (click)="click(i)"
   [class.selected]="_hoveredIndex >= i && !isReadonly"
   [class.active]="_value > i">
</i>
`,
    styles: [`
:host.read-only .icon {
cursor: auto
}
`]
})
export class SuiRating {
    @HostBinding('class.ui')
    @HostBinding('class.rating') ratingClasses = true;

    private _value:number = 0;
    private _max:number = 5;

    @Input()
    public set max(value:any) {
        this._max = parseInt(value);
    }

    public get icons() {
        return Array(this._max);
    }

    @Output()
    public valueChange:EventEmitter<number> = new EventEmitter<number>(false);

    private _hoveredIndex:number = -1;
    
    private mouseover(i:number) {
        this._hoveredIndex = i;
    }

    @HostListener('mouseout')
    private mouseout() {
        this._hoveredIndex = -1;
    }

    private click(i:number) {
        if (!this.isReadonly) {
            this._value = i + 1;
            this.valueChange.emit(this._value);
        }
    }

    @HostBinding('class.read-only')
    @Input()
    public isReadonly:boolean = false;

    public writeValue(value:number) {
        this._value = value;
    }
}

@Directive({
    selector: 'sui-rating',
    host: {'(valueChange)': 'onChange($event)'},
    providers: [customValueAccessorFactory(SuiRatingValueAccessor)]
})
export class SuiRatingValueAccessor extends CustomValueAccessor<number, SuiRating> {
    constructor(host:SuiRating) {
        super(host);
    }
}