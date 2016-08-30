import {Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'sui-radio-button[ngModel]',
    exportAs: 'suiRadioButton',
    template: `
<input class="hidden"
       type="checkbox"
       [attr.name]="name"
       [attr.checked]="checkedAttribute"
       [attr.disabled]="isDisabledAttribute"
       [ngModel]="checked"
       (ngModel)="currentValue = value">
<label>
    <ng-content></ng-content>
</label>
`
})
export class SuiRadioButton {
    @HostBinding('class.ui')
    @HostBinding('class.radio')
    @HostBinding('class.checkbox') classes = true;

    @Input() public name:string;
    @Input() public value:any = "";

    @Input() public isDisabled:boolean = false;
    @HostBinding('class.read-only')
    @Input() public isReadonly:boolean = false;

    @HostBinding('class.checked')
    private checked:boolean = false;

    private currentValue:any;

    @Output() public currentValueChange:EventEmitter<any> = new EventEmitter<boolean>(false);

    private get checkedAttribute():string {
        return this.checked ? "" : null;
    }

    private get isDisabledAttribute():string {
        return this.isDisabled ? "disabled" : null;
    }

    @HostListener('click')
    public onClick():void {
        if (!this.isDisabled && !this.isReadonly) {
            this.currentValue = this.value;
            this.currentValueChange.emit(this.currentValue);
            this.update();
        }
    }

    public update():void {
        //This is a horrible hack - need to rewrite!
        setTimeout(() => {
            this.checked = this.currentValue == this.value;
        });
    }

    public writeValue(value:any) {
        this.currentValue = value;
        this.update();
    }
}

export const CUSTOM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiRadioButtonValueAccessor),
    multi: true
};

@Directive({
    selector: 'sui-radio-button',
    host: {'(currentValueChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SuiRadioButtonValueAccessor implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host: SuiRadioButton) { }

    writeValue(value: any): void {
        this.host.writeValue(value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

export const SUI_RADIOBUTTON_DIRECTIVES = [SuiRadioButton, SuiRadioButtonValueAccessor];
