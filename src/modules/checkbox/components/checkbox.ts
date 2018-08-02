import {
    Component, Directive, Input, Output, HostListener, HostBinding,
    EventEmitter, ViewChild, ElementRef
} from "@angular/core";
import { ICustomValueAccessorHost, customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/internal";

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
    public readonly hasClasses:boolean;

    @Input()
    public name:string;

    @HostBinding("class.checked")
    public isChecked:boolean;

    @Output("checkChange")
    public onCheckChange:EventEmitter<boolean>;

    @Output("touched")
    public onTouched:EventEmitter<void>;

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
        this.onCheckChange = new EventEmitter<boolean>();
        this.onTouched = new EventEmitter<void>();

        this.isDisabled = false;
        this.isReadonly = false;

        this.hasClasses = true;
    }

    @HostListener("mousedown", ["$event"])
    public onMouseDown(e:MouseEvent):void {
        e.preventDefault();
    }

    @HostListener("click")
    public onClick():void {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
            this.focusCheckbox();
        }
    }

    @HostListener("focusout")
    public onFocusOut():void {
        this.onTouched.emit();
    }

    public toggle():void {
        this.isChecked = !this.isChecked;
        this.onCheckChange.emit(this.isChecked);
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
    host: {
        "(checkChange)": "onChange($event)",
        "(touched)": "onTouched()"
    },
    providers: [customValueAccessorFactory(SuiCheckboxValueAccessor)]
})
export class SuiCheckboxValueAccessor extends CustomValueAccessor<boolean, SuiCheckbox> {
    constructor(host:SuiCheckbox) {
        super(host);
    }
}
