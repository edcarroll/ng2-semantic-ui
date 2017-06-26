
import { Directive, Host, Input, ElementRef, HostBinding, HostListener } from "@angular/core";
import { SuiDatepickerDirective } from "./datepicker.directive";
import { IDateParser, DateParser } from "../classes/date-parser";
import { PopupTrigger } from "../../popup/classes/popup-config";

@Directive({
    selector: "input[suiDatepicker]"
})
export class SuiDatepickerInputDirective {
    private _mobileFallback:boolean;

    public get mobileFallback():boolean {
        return this._mobileFallback;
    }

    public set mobileFallback(fallback:boolean) {
        this._mobileFallback = fallback;

    }

    private _fallbackActive:boolean;

    public get fallbackActive():boolean {
        return this._fallbackActive;
    }

    public set fallbackActive(active:boolean) {
        this._fallbackActive = active;
        this.datepicker.popup.config.trigger = this.fallbackActive ? PopupTrigger.Manual : PopupTrigger.Focus;
        this.updateValue(this.selectedDateString);
    }

    private _currentInputValue:string | undefined;

    public get selectedDateString():string | undefined {
        if (this.datepicker.selectedDate) {
            const formatted = this.datepicker.config.parser.format(this.datepicker.selectedDate);
            if (this.fallbackActive) {
                return formatted.replace(" ", "T");
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

    constructor(@Host() public datepicker:SuiDatepickerDirective, public element:ElementRef) {
        this.mobileFallback = true;
        this.fallbackActive = true;

        this.datepicker.onDateChange.subscribe(() =>
            this.updateValue(this.selectedDateString));
    }

    private updateValue(value:string | undefined):void {
        if (value && value !== this._currentInputValue) {
            this._currentInputValue = value;
            this.datepicker.renderer.setProperty(this.element.nativeElement, "value", this.selectedDateString);
        }
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
