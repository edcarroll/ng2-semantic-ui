
import { Directive, Host, Input, ElementRef, HostBinding } from "@angular/core";
import { SuiDatepickerDirective } from "./datepicker.directive";
import { IDateParser, DateParser } from "../classes/date-parser";
import { SuiLocalizationService } from "../../util/services/localization.service";

@Directive({
    selector: "input[suiDatepicker]",
    host: { "(input)": "typeValue($event.target.value)" }
})
export class SuiDatepickerInputDirective {
    @Input()
    public mobileFallback:boolean;

    private _currentInputValue:string | undefined;

    public get selectedDateString():string | undefined {
        if (this.datepicker.selectedDate) {
            return this.parser.format(this.datepicker.selectedDate);
        }
    }

    public parser:IDateParser;

    @HostBinding("attr.type")
    public get HTMLType():string {
        return "text";
    }

    constructor(@Host() public datepicker:SuiDatepickerDirective,
                public element:ElementRef,
                localizationService:SuiLocalizationService) {

        this.mobileFallback = true;
        this.parser = new DateParser(localizationService.getValues());

        this.datepicker.onDateChange.subscribe(() => {
            if (this.selectedDateString && this.selectedDateString !== this._currentInputValue) {
                this.datepicker.renderer.setProperty(this.element.nativeElement, "value", this.selectedDateString);
                this._currentInputValue = this.selectedDateString;
            }
        });
    }

    public typeValue(value:string | undefined):void {
        this._currentInputValue = value;

        if (!value) {
            this.datepicker.writeValue(undefined);
            return;
        }

        try {
            this.datepicker.writeValue(this.parser.parse(value));
        } catch (e) {
            this.datepicker.writeValue(undefined);
        }
    }
}
