import {Component, Directive, Input, Output, EventEmitter, HostBinding, HostListener, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'sui-rating',
    exportAs: 'suiRating',
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
    private get icons() {
        return Array(this._max);
    }

    @Output() public valueChange:EventEmitter<number> = new EventEmitter<number>(false);

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

export const CUSTOM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiRatingValueAccessor),
    multi: true
};

@Directive({
    selector: 'sui-rating',
    host: {'(valueChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SuiRatingValueAccessor implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host: SuiRating) { }

    writeValue(value: any): void {
        this.host.writeValue(value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

export const SUI_RATING_DIRECTIVES = [SuiRating, SuiRatingValueAccessor];
