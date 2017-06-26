
import { Directive, Host, Input, ElementRef, HostBinding, HostListener } from "@angular/core";
import { SuiDatepickerDirective } from "./datepicker.directive";
import { IDateParser, DateParser } from "../classes/date-parser";

@Directive({
    selector: "input[suiDatepicker]"
})
export class SuiDatepickerInputDirective {
    @Input()
    public mobileFallback:boolean;

    private _currentInputValue:string | undefined;

    public get selectedDateString():string | undefined {
        if (this.datepicker.selectedDate) {
            return this.datepicker.config.parser.format(this.datepicker.selectedDate);
        }
    }

    @HostBinding("attr.type")
    public get HTMLType():string {
        return "text";
    }

    constructor(@Host() public datepicker:SuiDatepickerDirective, public element:ElementRef) {
        this.mobileFallback = true;

        this.datepicker.onDateChange.subscribe(() => {
            if (this.selectedDateString && this.selectedDateString !== this._currentInputValue) {
                this.datepicker.renderer.setProperty(this.element.nativeElement, "value", this.selectedDateString);
                this._currentInputValue = this.selectedDateString;
            }
        });
    }

    @HostListener("input", ["$event.target.value"])
    public typeValue(value:string | undefined):void {
        this._currentInputValue = value;

        if (!value) {
            this.datepicker.writeValue(undefined);
            return;
        }

        try {
            const parsed = this.datepicker.config.parser.parse(value);
            this.datepicker.config.postProcess(parsed);
            this.datepicker.writeValue(parsed);
        } catch (e) {
            this.datepicker.writeValue(undefined);
        }
    }
}
