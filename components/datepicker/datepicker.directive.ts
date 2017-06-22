
import {
    Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
    Renderer2, EventEmitter, Output, HostBinding, Input
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { SuiPopupComponentController } from "../popup/classes/popup-component-controller";
import { PopupConfig, PopupTrigger } from "../popup/classes/popup-config";
import { PositioningPlacement } from "../util/services/positioning.service";
import { SuiComponentFactory } from "../util/services/component-factory.service";
import { SuiDatepicker } from "./datepicker";
import { customValueAccessorFactory, CustomValueAccessor, ICustomValueAccessorHost } from "../util/helpers/custom-value-accessor";
import { CalendarViewType } from "./views/calendar-view";
import { Util } from "../util/util";
import { DateParser } from "./date-parser";
import { SuiLocalizationService } from "../util/services/localization.service";
import { PopupAfterOpen } from "../popup/classes/popup-lifecycle";

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

        if (this.componentInstance) {
            this.componentInstance.service.selectedDate = date;
        }

        if (this.selectedDateString && this.selectedDateString !== this._currentValue) {
            this.renderer.setProperty(this._element.nativeElement, "value", this.selectedDateString);
            this._currentValue = this.selectedDateString;
        }
    }

    private _currentValue:string | undefined;

    public get selectedDateString():string | undefined {
        if (this.selectedDate) {
            return this.parser.format(this.selectedDate);
        }
    }

    public parser:DateParser;

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
            trigger: PopupTrigger.OutsideClick,
            placement: PositioningPlacement.BottomLeft,
            toggleOnClick: false
        }));

        // This ensures the popup is drawn correctly (i.e. no border).
        this.renderer.addClass(this.popup.elementRef.nativeElement, "ui");
        this.renderer.addClass(this.popup.elementRef.nativeElement, "calendar");

        this.parser = new DateParser(localizationService.getValues());
        this.onDateChange = new EventEmitter<Date>();
    }

    public popupOnOpen():void {
        if (this.componentInstance) {
            this.componentInstance.service.selectedDate = this.selectedDate;
            this.componentInstance.service.currentView = CalendarViewType.Date;

            this.componentInstance.service.onDateChange.subscribe((d:Date) => {
                Util.Date.startOfDay(d, true);
                Util.Date.rewriteTimezone(d);

                this.selectedDate = d;
                this.close();
            });
        }
    }

    public writeValue(value:Date | undefined):void {
        this.selectedDate = value;
    }

    public typeValue(value:string | undefined):void {
        this._currentValue = value;

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
    providers: [customValueAccessorFactory(SuiDatepickerValueAccessor)]
})
export class SuiDatepickerValueAccessor extends CustomValueAccessor<Date, SuiDatepickerDirective> {
    constructor(public host:SuiDatepickerDirective) {
        super(host);
    }

    public manualChange(value:string | undefined):void {
        this.host.typeValue(value);
    }
}
