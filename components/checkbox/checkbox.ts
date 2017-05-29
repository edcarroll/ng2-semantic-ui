import {Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, forwardRef} from '@angular/core';
import {CustomValueAccessorHost, customValueAccessorFactory, CustomValueAccessor} from '../util/custom-value-accessor';

@Component({
    selector: 'sui-checkbox',
    exportAs: 'suiCheckbox',
    template: `
<input class="hidden"
       type="checkbox"
       [attr.name]="name"
       [attr.checked]="checkedAttribute"
       [attr.disabled]="isDisabledAttribute"
       [(ngModel)]="isChecked">
<label>
    <ng-content></ng-content>
</label>
`
})
export class SuiCheckbox implements CustomValueAccessorHost<boolean> {
    @HostBinding('class.ui')
    @HostBinding('class.checkbox')
    private _checkboxClasses:boolean;

    @Input()
    public name:string;

    @HostBinding('class.checked')
    public isChecked:boolean;

    @Output()
    public checkChange:EventEmitter<boolean>;

    @Input()
    public isDisabled:boolean;

    @HostBinding('class.read-only')
    @Input()
    public isReadonly:boolean;

    public get checkedAttribute() {
        return this.isChecked ? "" : null;
    }

    public get isDisabledAttribute() {
        return this.isDisabled ? "disabled" : null;
    }

    constructor() {
        this.isChecked = false;
        this.checkChange = new EventEmitter<boolean>();

        this.isDisabled = false;
        this.isReadonly = false;

        this._checkboxClasses = true;
    }

    @HostListener('click')
    public onClick() {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
        }
    }

    public toggle() {
        this.isChecked = !this.isChecked;
        this.checkChange.emit(this.isChecked);
    }

    public writeValue(value:boolean) {
        this.isChecked = value;
    }
}

@Directive({
    selector: 'sui-checkbox',
    host: { '(checkChange)': 'onChange($event)' },
    providers: [customValueAccessorFactory(SuiCheckboxValueAccessor)]
})
export class SuiCheckboxValueAccessor extends CustomValueAccessor<boolean, SuiCheckbox> {
    constructor(host:SuiCheckbox) {
        super(host);
    }
}
