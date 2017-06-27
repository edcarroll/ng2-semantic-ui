
import {
    Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
    Renderer2, EventEmitter, Output, HostBinding, Input, HostListener, OnChanges, SimpleChanges
} from "@angular/core";
import {
    customValueAccessorFactory, CustomValueAccessor, ICustomValueAccessorHost,
    customValidatorFactory, CustomValidator, ICustomValidatorHost
} from "../../util/helpers/custom-value-accessor";
import { Validator, ValidationErrors, AbstractControl } from "@angular/forms";
import { SuiPopupComponentController } from "../../popup/classes/popup-component-controller";
import { PopupConfig, PopupTrigger } from "../../popup/classes/popup-config";
import { PositioningPlacement } from "../../util/services/positioning.service";
import { SuiComponentFactory } from "../../util/services/component-factory.service";
import { SuiDatepicker, DatepickerMode } from "../components/datepicker";
import { CalendarViewType } from "../views/calendar-view";
import { Util, KeyCode } from "../../util/util";
import { PopupAfterOpen } from "../../popup/classes/popup-lifecycle";
import { CalendarService } from "../services/calendar.service";
import { CalendarConfig, YearConfig, MonthConfig, DatetimeConfig, TimeConfig, DateConfig } from "../classes/calendar-config";

@Directive({
    selector: "[suiDatepicker]",
    providers: [customValidatorFactory(SuiDatepickerDirective)]
})
export class SuiDatepickerDirective
       extends SuiPopupComponentController<SuiDatepicker>
       implements ICustomValueAccessorHost<Date>, ICustomValidatorHost, OnChanges, PopupAfterOpen {

    private _selectedDate?:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    public set selectedDate(date:Date | undefined) {
        this._selectedDate = date;
        this.onSelectedDateChange.emit(date);
    }

    private _mode:DatepickerMode;
    public config:CalendarConfig;

    @Input("pickerMode")
    public get mode():DatepickerMode {
        return this._mode;
    }

    public set mode(mode:DatepickerMode) {
        this._mode = mode || DatepickerMode.Datetime;
        switch (this._mode) {
            case DatepickerMode.Year:
                this.config = new YearConfig();
                break;
            case DatepickerMode.Month:
                this.config = new MonthConfig();
                break;
            case DatepickerMode.Date:
            default:
                this.config = new DateConfig();
                break;
            case DatepickerMode.Datetime:
                this.config = new DatetimeConfig();
                break;
            case DatepickerMode.Time:
                this.config = new TimeConfig();
                break;
        }
    }

    @Input("pickerMaxDate")
    public maxDate?:Date;

    @Input("pickerMinDate")
    public minDate?:Date;

    @Input("pickerFirstDayOfWeek")
    public firstDayOfWeek?:number;

    @Input("pickerPlacement")
    public set placement(placement:PositioningPlacement) {
        this.popup.config.placement = placement;
    }

    @Input("pickerTransition")
    public set transition(transition:string) {
        this.popup.config.transition = transition;
    }

    @Input("pickerTransitionDuration")
    public set transitionDuration(duration:number) {
        this.popup.config.transitionDuration = duration;
    }

    @Output("pickerSelectedDateChange")
    public onSelectedDateChange:EventEmitter<Date>;

    @Output("pickerValidatorChange")
    public onValidatorChange:EventEmitter<void>;

    constructor(element:ElementRef,
                public renderer:Renderer2,
                componentFactory:SuiComponentFactory) {

        super(element, componentFactory, SuiDatepicker, new PopupConfig({
            trigger: PopupTrigger.Focus,
            placement: PositioningPlacement.BottomLeft,
            transition: "scale",
            transitionDuration: 200
        }));

        // This ensures the popup is drawn correctly (i.e. no border).
        this.renderer.addClass(this.popup.elementRef.nativeElement, "ui");
        this.renderer.addClass(this.popup.elementRef.nativeElement, "calendar");

        this.mode = DatepickerMode.Datetime;

        this.onSelectedDateChange = new EventEmitter<Date>();
        this.onValidatorChange = new EventEmitter<void>();
    }

    public popupOnOpen():void {
        if (this.componentInstance) {
            this.componentInstance.service.config = this.config;
            this.componentInstance.service.selectedDate = this.selectedDate;
            this.componentInstance.service.maxDate = this.maxDate;
            this.componentInstance.service.minDate = this.minDate;

            if (this.firstDayOfWeek != undefined) {
                this.componentInstance.service.firstDayOfWeek = this.firstDayOfWeek;
            }

            this.componentInstance.service.reset();

            this.componentInstance.service.onDateChange.subscribe((d:Date) => {
                this.selectedDate = d;
                this.close();
            });
        }
    }

    public ngOnChanges({ maxDate, minDate, mode }:SimpleChanges):void {
        if (maxDate || minDate || mode) {
            this.onValidatorChange.emit();
        }
    }

    public validate(c:AbstractControl):ValidationErrors | null {
        const value = c.value;

        if (value != undefined) {
            // We post process the min & max date because sometimes this puts the date outside of the allowed range.
            if (this.minDate && value < this.minDate) {
                return { suiMinDate: { required: this.minDate, actual: value } };
            }

            if (this.maxDate && value > this.maxDate) {
                return { suiMaxDate: { required: this.maxDate, actual: value } };
            }
        }

        // Angular expects null
        // tslint:disable-next-line:no-null-keyword
        return null;
    }

    public writeValue(value:Date | undefined):void {
        this.selectedDate = value;

        if (this.componentInstance) {
            this.componentInstance.service.selectedDate = value;
        }
    }

    @HostListener("keydown", ["$event"])
    public onKeyDown(e:KeyboardEvent):void {
        if (e.keyCode === KeyCode.Escape) {
            this.close();
        }
    }
}

@Directive({
    selector: "[suiDatepicker]",
    host: { "(pickerSelectedDateChange)": "onChange($event)" },
    providers: [customValueAccessorFactory(SuiDatepickerDirectiveValueAccessor)]
})
export class SuiDatepickerDirectiveValueAccessor extends CustomValueAccessor<Date, SuiDatepickerDirective> {
    constructor(public host:SuiDatepickerDirective) { super(host); }
}

@Directive({
    selector: "[suiDatepicker]",
    host: { "(pickerValidatorChange)": "onValidatorChange()" },
    providers: [customValidatorFactory(SuiDatepickerDirectiveValidator)]
})
export class SuiDatepickerDirectiveValidator extends CustomValidator<SuiDatepickerDirective> {
    constructor(public host:SuiDatepickerDirective) { super(host); }
}
