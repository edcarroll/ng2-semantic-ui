
import { Directive, Host, Input, ElementRef, HostBinding, HostListener } from "@angular/core";
import { SuiDatepickerDirective } from "./datepicker.directive";
import { IDateParser, DateParser } from "../classes/date-parser";
import { PopupTrigger } from "../../popup/classes/popup-config";
import { Util } from "../../util/util";
import { DatePrecision } from "../../util/helpers/date";
import * as MobileDetect from "mobile-detect";

const mobileDetect = new MobileDetect(window.navigator.userAgent);

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
        this.fallbackActive = this.useNativeOnMobile ? !!mobileDetect.mobile() : false;
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

    private _currentInputValue:string | undefined;

    public get selectedDateString():string | undefined {
        if (this.datepicker.selectedDate) {
            const formatted = this.datepicker.config.parser.format(this.datepicker.selectedDate);
            // If the fallback is currently active...
            if (this.fallbackActive) {
                // ...replace the space between the date and time with `T` to support datetime-local.
                return this.fallbackValue(formatted);
            }
            return formatted;
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
            return this.fallbackValue(this.datepicker.config.parser.format(max));
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
            return this.fallbackValue(this.datepicker.config.parser.format(html));
        }
    }

    constructor(@Host() public datepicker:SuiDatepickerDirective, public element:ElementRef) {
        this.useNativeOnMobile = true;
        this.fallbackActive = false;

        // Whenever the datepicker value updates, update the input text alongside it.
        this.datepicker.onSelectedDateChange.subscribe(() =>
            this.updateValue(this.selectedDateString));
    }

    private fallbackValue(value:string):string {
        return value.replace(" ", "T");
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

        try {
            // Parse the typed date, replacing `T` (for datetime-local support).
            // Use the currently selected date as the base date.
            const parsed = this.datepicker.config.parser.parse(
                value.replace("T", " "),
                this.datepicker.selectedDate);

            // Run the parsed date through the configured post processors.
            this.datepicker.config.postProcess(parsed);

            // Finally write the value to the datepicker.
            this.datepicker.writeValue(parsed);
        } catch (e) {
            // If there are any errors encountered, delete the selected date.
            this.datepicker.writeValue(undefined);
        }
    }
}
