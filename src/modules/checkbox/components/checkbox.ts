import {
    Component, Directive, Input, Output, HostListener, HostBinding,
    EventEmitter, forwardRef, ViewChild, ElementRef
} from "@angular/core";

@Component({
    selector: "sui-checkbox",
    exportAs: "suiCheckbox",
    template: `
<input class="hidden"
       type="checkbox"
       [attr.name]="name"
       [attr.checked]="checkedAttribute"
       [attr.disabled]="isDisabledAttribute"
       [(ngModel)]="isChecked"
       #checkbox>
<label>
    <ng-content></ng-content>
</label>
`
})
export class SuiCheckbox implements ICustomValueAccessorHost<boolean> {
    @HostBinding("class.ui")
    @HostBinding("class.checkbox")
    private _checkboxClasses:boolean;

    @Input()
    public name:string;

    @HostBinding("class.checked")
    public isChecked:boolean;

    @Output()
    public checkChange:EventEmitter<boolean>;

    @Input()
    public isDisabled:boolean;

    @HostBinding("class.read-only")
    @Input()
    public isReadonly:boolean;

    public get checkedAttribute():string | undefined {
        return this.isChecked ? "" : undefined;
    }

    public get isDisabledAttribute():string | undefined {
        return this.isDisabled ? "disabled" : undefined;
    }

    @ViewChild("checkbox")
    private _checkboxElement:ElementRef;

    constructor() {
        this.isChecked = false;
        this.checkChange = new EventEmitter<boolean>();

        this.isDisabled = false;
        this.isReadonly = false;

        this._checkboxClasses = true;
    }

    @HostListener("click")
    public onClick():void {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
            this.focusCheckbox();
        }
    }

    public toggle():void {
        this.isChecked = !this.isChecked;
        this.checkChange.emit(this.isChecked);
    }

    public writeValue(value:boolean):void {
        this.isChecked = value;
    }

    private focusCheckbox():void {
        this._checkboxElement.nativeElement.focus();
    }
}

@Directive({
    selector: "sui-checkbox",
    host: { "(checkChange)": "onChange($event)" },
    providers: [customValueAccessorFactory(SuiCheckboxValueAccessor)]
})
export class SuiCheckboxValueAccessor extends CustomValueAccessor<boolean, SuiCheckbox> {
    constructor(host:SuiCheckbox) {
        super(host);
    }
}
