
import {
    Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
    Renderer2, EventEmitter, Output, HostBinding, Input, HostListener
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { SuiPopupComponentController } from "../popup/classes/popup-component-controller";
import { PopupConfig, PopupTrigger } from "../popup/classes/popup-config";
import { PositioningPlacement } from "../util/services/positioning.service";
import { SuiComponentFactory } from "../util/services/component-factory.service";
import { SuiDatepicker, DatepickerMode } from "./datepicker";
import { customValueAccessorFactory, CustomValueAccessor, ICustomValueAccessorHost } from "../util/helpers/custom-value-accessor";
import { CalendarViewType } from "./views/calendar-view";
import { Util } from "../util/util";
import { DateParser, IDateParser } from "./classes/date-parser";
import { SuiLocalizationService } from "../util/services/localization.service";
import { PopupAfterOpen } from "../popup/classes/popup-lifecycle";
import { CalendarService } from "./services/calendar.service";

@Directive({
    selector: "[suiDatepicker]"
})
export class SuiDatepickerDirective
       extends SuiPopupComponentController<SuiDatepicker>
       implements ICustomValueAccessorHost<Date>, PopupAfterOpen {

    private _selectedDate?:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    public set selectedDate(date:Date | undefined) {
        this._selectedDate = date;
        this.onDateChange.emit(date);

        if (this.selectedDateString && this.selectedDateString !== this._currentInputValue) {
            this.renderer.setProperty(this._element.nativeElement, "value", this.selectedDateString);
            this._currentInputValue = this.selectedDateString;
        }
    }

    @Input("pickerMode")
    public mode?:DatepickerMode;

    @Input("pickerMaxDate")
    public maxDate?:Date;

    @Input("pickerMinDate")
    public minDate?:Date;

    @Input("pickerFirstDayOfWeek")
    public firstDayOfWeek?:number;

    private _currentInputValue:string | undefined;

    public get selectedDateString():string | undefined {
        if (this.selectedDate) {
            return this.parser.format(this.selectedDate);
        }
    }

    public parser:IDateParser;

    @HostBinding("attr.type")
    public get HTMLType():string {
        return "text";
    }

    @Output("dateChange")
    public onDateChange:EventEmitter<Date>;

    constructor(element:ElementRef,
                public renderer:Renderer2,
                componentFactory:SuiComponentFactory,
                public localizationService:SuiLocalizationService) {

        super(element, componentFactory, SuiDatepicker, new PopupConfig({
            trigger: PopupTrigger.Focus,
            placement: PositioningPlacement.BottomLeft
        }));

        // This ensures the popup is drawn correctly (i.e. no border).
        this.renderer.addClass(this.popup.elementRef.nativeElement, "ui");
        this.renderer.addClass(this.popup.elementRef.nativeElement, "calendar");

        this.parser = new DateParser(localizationService.getValues());
        this.onDateChange = new EventEmitter<Date>();
    }

    public popupOnOpen():void {
        if (this.componentInstance) {
            this.componentInstance.mode = DatepickerMode.Time;

            this.componentInstance.mode = this.mode;
            this.componentInstance.selectedDate = this.selectedDate;
            this.componentInstance.maxDate = this.maxDate;
            this.componentInstance.minDate = this.minDate;
            this.componentInstance.firstDayOfWeek = this.firstDayOfWeek;

            this.componentInstance.service.reset();

            this.componentInstance.onDateChange.subscribe((d:Date) => {
                this.selectedDate = d;
                this.close();
            });
        }
    }

    public writeValue(value:Date | undefined):void {
        this.selectedDate = value;

        if (this.componentInstance) {
            this.componentInstance.selectedDate = value;
        }
    }

    public typeValue(value:string | undefined):void {
        this._currentInputValue = value;

        if (!value) {
            this.writeValue(undefined);
            return;
        }

        try {
            this.writeValue(this.parser.parse(value));
        } catch (e) {
            this.writeValue(undefined);
        }
    }
}

@Directive({
    selector: "[suiDatepicker]",
    host: {
        "(input)": "manualChange($event.target.value)",
        "(dateChange)": "onChange($event)"
    },
    providers: [customValueAccessorFactory(SuiDatepickerDirectiveValueAccessor)]
})
export class SuiDatepickerDirectiveValueAccessor extends CustomValueAccessor<Date, SuiDatepickerDirective> {
    constructor(public host:SuiDatepickerDirective) {
        super(host);
    }

    public manualChange(value:string | undefined):void {
        this.host.typeValue(value);
    }
}
