
import { Directive, Host, Input, ElementRef, HostBinding, HostListener } from "@angular/core";
import { SuiDatepickerDirective } from "./datepicker.directive";
import { IDateParser, InternalDateParser, DateParser } from "../classes/date-parser";
import { PopupTrigger } from "../../popup/classes/popup-config";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import * as bowser from "bowser";

@Directive({
    selector: "input[suiDatepicker]"
})
export class SuiDatepickerInputDirective {
    private _useNativeOnMobile:boolean;

    @Input("pickerUseNativeOnMobile")
    public get useNativeOnMobile():boolean {
        return this._useNativeOnMobile;
    }

    public set useNativeOnMobile(fallback:boolean) {
        this._useNativeOnMobile = fallback;
        this.fallbackActive = this.useNativeOnMobile && bowser.mobile;
    }

    private _fallbackActive:boolean;

    public get fallbackActive():boolean {
        return this._fallbackActive;
    }

    public set fallbackActive(active:boolean) {
        this._fallbackActive = active;
        // If the fallback is active, then the trigger must be manual so the datepicker never opens.
        this.datepicker.popup.config.trigger = this.fallbackActive ? PopupTrigger.Manual : PopupTrigger.Focus;
        // Update the input value (this will insert the `T` as required).
        this.updateValue(this.selectedDateString);
    }

    public get parser():IDateParser {
        if (this.fallbackActive) {
            return new InternalDateParser(this.datepicker.mode, this.datepicker.localeValues);
        }
        return new DateParser(this.datepicker.localeValues.formats[this.datepicker.mode], this.datepicker.localeValues);
    }

    private _currentInputValue:string | undefined;

    public get selectedDateString():string | undefined {
        if (this.datepicker.selectedDate) {
            return this.parser.format(this.datepicker.selectedDate);
        }
    }

    @HostBinding("attr.type")
    public get HTMLType():string {
        if (this.fallbackActive) {
            return this.datepicker.config.fallback;
        }
        return "text";
    }

    @HostBinding("attr.max")
    public get HTMLMax():string | undefined {
        if (this.fallbackActive && this.datepicker.maxDate) {
            // Since HTML doesn't use a date object max is somewhat tricky.
            // Our Datepicker will always choose the 1st date on the provided precision,
            // meaning anything below the maxDate will work, hence endOf.
            const max = Util.Date.endOf(this.datepicker.config.precision, Util.Date.clone(this.datepicker.maxDate));
            return this.parser.format(max);
        }
    }

    @HostBinding("attr.min")
    public get HTMLMin():string | undefined {
        if (this.fallbackActive && this.datepicker.minDate) {
            // Since HTML doesn't use a date object min is somewhat tricky.
            // We use 1 minute before the next date at the configured precision since
            // our Datepicker picks the first available date at that precision.
            const min = Util.Date.clone(this.datepicker.minDate);
            const html = Util.Date.next(this.datepicker.config.precision, Util.Date.previous(DatePrecision.Minute, min));
            return this.parser.format(min);
        }
    }

    constructor(@Host() public datepicker:SuiDatepickerDirective,
                public element:ElementRef) {

        this.useNativeOnMobile = true;
        this.fallbackActive = false;

        // Whenever the datepicker value updates, update the input text alongside it.
        this.datepicker.onSelectedDateChange.subscribe(() =>
            this.updateValue(this.selectedDateString));
    }

    private updateValue(value:string | undefined):void {
        // Only update the current value if it is different to what it's being updated to.
        // This is so that the editing position isn't changed when manually typing the date.
        if (value && value !== this._currentInputValue) {
            this._currentInputValue = value;
            this.datepicker.renderer.setProperty(this.element.nativeElement, "value", value);
        }
    }

    @HostListener("input", ["$event.target.value"])
    public typeValue(value:string | undefined):void {
        this._currentInputValue = value;

        if (!value) {
            // Delete the selected date if no date was entered manually.
            return this.datepicker.writeValue(undefined);
        }

        const parsed = this.parser.parse(value, this.datepicker.selectedDate);
        if (!isNaN(parsed.getTime()) && value === this.parser.format(parsed)) {
            return this.datepicker.writeValue(parsed);
        }
        return this.datepicker.writeValue(undefined);
    }
}
