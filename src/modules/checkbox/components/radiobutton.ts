import {
    Component, Directive, Input, Output, HostListener, HostBinding,
    EventEmitter, ViewChild, ElementRef
} from "@angular/core";
import { ICustomValueAccessorHost, customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util";

@Component({
    selector: "sui-radio-button[ngModel]",
    exportAs: "suiRadioButton",
    template: `
<input class="hidden"
       type="checkbox"
       [attr.name]="name"
       [attr.checked]="checkedAttribute"
       [attr.disabled]="isDisabledAttribute"
       [ngModel]="isChecked"
       (ngModel)="currentValue = value"
       #radio>
<label>
    <ng-content></ng-content>
</label>
`
})
export class SuiRadioButton<T> implements ICustomValueAccessorHost<T> {
    @HostBinding("class.ui")
    @HostBinding("class.radio")
    @HostBinding("class.checkbox")
    private _radioClasses:boolean = true;

    @Input()
    public name:string;

    @Input()
    public value:T;

    @HostBinding("class.checked")
    public isChecked:boolean;

    public currentValue:T;

    @Output()
    public currentValueChange:EventEmitter<T>;

    @Input()
    public isDisabled:boolean;

    @HostBinding("class.read-only")
    @Input()
    public isReadonly:boolean;

    @ViewChild("radio")
    private _radioElement:ElementRef;

    public get checkedAttribute():string | undefined {
        return this.isChecked ? "" : undefined;
    }

    public get isDisabledAttribute():string | undefined {
        return this.isDisabled ? "disabled" : undefined;
    }

    constructor() {
        this.isChecked = false;
        this.currentValueChange = new EventEmitter<T>();

        this.isDisabled = false;
        this.isReadonly = false;

        this._radioClasses = true;
    }

    @HostListener("click")
    public onClick():void {
        if (!this.isDisabled && !this.isReadonly) {
            this.currentValue = this.value;
            this.currentValueChange.emit(this.currentValue);
            this.update();
            this.focusRadio();
        }
    }

    public update():void {
        this.isChecked = this.currentValue === this.value;
    }

    public writeValue(value:T):void {
        this.currentValue = value;
        this.update();
    }

    private focusRadio():void {
        this._radioElement.nativeElement.focus();
    }
}

@Directive({
    selector: "sui-radio-button",
    host: { "(currentValueChange)": "onChange($event)" },
    providers: [customValueAccessorFactory(SuiRadioButtonValueAccessor)]
})
export class SuiRadioButtonValueAccessor<T> extends CustomValueAccessor<T, SuiRadioButton<T>> {
    constructor(host:SuiRadioButton<T>) {
        super(host);
    }
}
