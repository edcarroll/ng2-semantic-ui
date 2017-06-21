
import {
    Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
    Renderer2, EventEmitter, Output, HostBinding, Input
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { SuiPopupController } from "../popup/popup-controller";
import { PopupConfig, PopupTrigger } from "../popup/popup-config";
import { PositioningPlacement } from "../util/services/positioning.service";
import { SuiComponentFactory } from "../util/services/component-factory.service";
import { SuiDatepicker } from "./datepicker";
import { customValueAccessorFactory, CustomValueAccessor, ICustomValueAccessorHost } from "../util/helpers/custom-value-accessor";
import { CalendarViewType } from "./views/calendar-view";
import { Util } from "../util/util";

@Directive({
    selector: "[suiDatepicker]"
})
export class SuiDatepickerDirective extends SuiPopupController<SuiDatepicker> implements ICustomValueAccessorHost<Date> {
    private _selectedDate?:Date;

    public get selectedDate():Date | undefined {
        return this._selectedDate;
    }

    public set selectedDate(date:Date | undefined) {
        this._selectedDate = date;
        this.onDateChange.emit(date);

        if (date) {
            if (this.selectedDateString !== this._currentValue) {
                this._renderer.setProperty(this._element.nativeElement, "value", this.selectedDateString);
                this._currentValue = this.selectedDateString;
            }
        }

        if (this._contentComponentRef) {
            this._contentComponentRef.instance.service.selectedDate = date;
        }
    }

    private _currentValue:string | undefined;

    public get selectedDateString():string | undefined {
        if (this.selectedDate) {
            const year = Util.String.padLeft(this.selectedDate.getFullYear().toString(), 4, "0");
            const month = Util.String.padLeft((this.selectedDate.getMonth() + 1).toString(), 2, "0");
            const day = Util.String.padLeft(this.selectedDate.getDate().toString(), 2, "0");

            return `${year}-${month}-${day}`;
        }
    }

    @HostBinding("attr.type")
    public get HTMLType():string {
        return "text";
    }

    @Output("dateChange")
    public onDateChange:EventEmitter<Date>;

    constructor(element:ElementRef, private _renderer:Renderer2, componentFactory:SuiComponentFactory) {
        super(element, componentFactory, new PopupConfig({
            trigger: PopupTrigger.OutsideClick,
            placement: PositioningPlacement.BottomLeft,
            component: SuiDatepicker,
            toggleOnClick: false
        }));

        // This ensures the popup is drawn correctly (i.e. no border).
        this._renderer.addClass(this.popup.elementRef.nativeElement, "ui");
        this._renderer.addClass(this.popup.elementRef.nativeElement, "calendar");

        this.onDateChange = new EventEmitter<Date>();

        this.popup.onOpen.subscribe(() => {
            if (this._contentComponentRef) {
                const instance = this._contentComponentRef.instance;

                instance.service.selectedDate = this.selectedDate;
                instance.service.currentView = CalendarViewType.Date;

                instance.service.onDateChange.subscribe((d:Date) => {
                    Util.Date.startOfDay(d, true);
                    Util.Date.rewriteTimezone(d);

                    this.selectedDate = d;
                    this.close();
                });
            }
        });
    }

    private updateDate(date:Date | undefined):void {
        this.selectedDate = date;
        if (this._contentComponentRef) {
            this._contentComponentRef.instance.service.selectedDate = date;
            this._contentComponentRef.instance.service.onManualUpdate.emit();
        }
    }

    public writeValue(value:Date | undefined):void {
        this.updateDate(value);
    }

    public typeValue(value:string | undefined):void {
        this._currentValue = value;

        if (!value) {
            this.updateDate(undefined);
            return;
        }

        try {
            const [, year, month, date] = (value
                    .match(/^(\d{4})-(\d{2})-(\d{2})$/) as string[])
                    .map(i => parseInt(i, 10));

            const parsed = Util.Date.startOfDay(new Date(), true);
            parsed.setFullYear(year);
            parsed.setMonth(month - 1);
            parsed.setDate(date);

            Util.Date.rewriteTimezone(parsed);

            if (parsed.getFullYear() !== year ||
                    parsed.getMonth() + 1 !== month ||
                    parsed.getDate() !== date) {

                throw new Error("Invalid date.");
            }

            this.updateDate(parsed);

            return;
        } catch (e) {
            this.updateDate(undefined);
            return;
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
