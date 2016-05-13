import {
    Component, Directive, Provider, Input, Output, HostListener, HostBinding, EventEmitter, forwardRef
} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/common';

@Component({
    selector: 'sui-radio-button[ngModel]',
    directives: [],
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
export class RadioButton {
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

    @Output() public currentValueChange:EventEmitter<any> = new EventEmitter(false);

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

const CUSTOM_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => RadioButtonValueAccessor), multi: true});

@Directive({
    selector: 'sui-radio-button',
    host: {'(currentValueChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class RadioButtonValueAccessor implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host: RadioButton) { }

    writeValue(value: any): void {
        this.host.writeValue(value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}