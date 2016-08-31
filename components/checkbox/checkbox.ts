import {Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'sui-checkbox',
    exportAs: 'suiCheckbox',
    template: `
<input class="hidden" type="checkbox" [attr.name]="name" [attr.checked]="checkedAttribute" [attr.disabled]="isDisabledAttribute" [(ngModel)]="checked">
<label>
    <ng-content></ng-content>
</label>
`
})
export class SuiCheckbox {
    @HostBinding('class.ui')
    @HostBinding('class.checkbox') classes = true;

    @Input() public name:string;

    @HostBinding('class.checked')
    private checked:boolean = false;

    @Output() public checkChange:EventEmitter<boolean> = new EventEmitter<boolean>(false);

    @Input() public isDisabled:boolean = false;
    @HostBinding('class.read-only')
    @Input() public isReadonly:boolean = false;

    private get checkedAttribute():string {
        return this.checked ? "" : null;
    }

    private get isDisabledAttribute():string {
        return this.isDisabled ? "disabled" : null;
    }

    @HostListener('click')
    public onClick():void {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
        }
    }

    public toggle():void {
        this.checked = !this.checked;
        this.checkChange.emit(this.checked);
    }

    public writeValue(value:boolean) {
        setTimeout(() => {
            this.checked = value;
        });
    }
}

export const CUSTOM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiCheckboxValueAccessor),
    multi: true
};

@Directive({
    selector: 'sui-checkbox',
    host: {'(checkChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SuiCheckboxValueAccessor implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host: SuiCheckbox) { }

    writeValue(value: any): void {
        this.host.writeValue(!!value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

export const SUI_CHECKBOX_DIRECTIVES = [SuiCheckbox, SuiCheckboxValueAccessor];
