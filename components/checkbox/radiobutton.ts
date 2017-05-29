import {Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, forwardRef} from '@angular/core';
import {CustomValueAccessorHost, customValueAccessorFactory, CustomValueAccessor} from '../util/custom-value-accessor';

@Component({
    selector: 'sui-radio-button[ngModel]',
    exportAs: 'suiRadioButton',
    template: `
<input class="hidden"
       type="checkbox"
       [attr.name]="name"
       [attr.checked]="checkedAttribute"
       [attr.disabled]="isDisabledAttribute"
       [ngModel]="isChecked"
       (ngModel)="currentValue = value">
<label>
    <ng-content></ng-content>
</label>
`
})
export class SuiRadioButton<T> implements CustomValueAccessorHost<T> {
    @HostBinding('class.ui')
    @HostBinding('class.radio')
    @HostBinding('class.checkbox')
    private _radioClasses = true;

    @Input()
    public name:string;

    @Input()
    public value:T;

    @HostBinding('class.checked')
    public isChecked:boolean;

    public currentValue:T;

    @Output()
    public currentValueChange:EventEmitter<T>;

    @Input()
    public isDisabled:boolean;

    @HostBinding('class.read-only')
    @Input()
    public isReadonly:boolean;

    public get checkedAttribute():string {
        return this.isChecked ? "" : null;
    }

    public get isDisabledAttribute():string {
        return this.isDisabled ? "disabled" : null;
    }

    constructor() {
        this.isChecked = false;
        this.currentValueChange = new EventEmitter<T>();

        this.isDisabled = false;
        this.isReadonly = false;

        this._radioClasses = true;
    }

    @HostListener('click')
    public onClick() {
        if (!this.isDisabled && !this.isReadonly) {
            this.currentValue = this.value;
            this.currentValueChange.emit(this.currentValue);
            this.update();
        }
    }

    public update() {
        this.isChecked = this.currentValue == this.value;
    }

    public writeValue(value:T) {
        this.currentValue = value;
        this.update();
    }
}

@Directive({
    selector: 'sui-radio-button',
    host: { '(currentValueChange)': 'onChange($event)' },
    providers: [customValueAccessorFactory(SuiRadioButtonValueAccessor)]
})
export class SuiRadioButtonValueAccessor<T> extends CustomValueAccessor<T, SuiRadioButton<T>> {
    constructor(host:SuiRadioButton<T>) {
        super(host);
    }
}