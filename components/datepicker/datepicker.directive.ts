
import {
    Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
    Renderer2
} from "@angular/core";
import { SuiPopupDirective } from "../popup/popup.directive";
import { SuiPopupConfig } from "../popup/popup.service";
import { SuiPopupBaseDirective } from "../popup/popup-base.directive";
import { PopupConfig, PopupTrigger } from "../popup/popup-config";
import { PositioningPlacement } from "../util/positioning.service";
import { SuiComponentFactory } from "../util/component-factory.service";
import { SuiDatepicker } from "./datepicker";

@Directive({
    selector: "[suiDatepicker]"
})
export class SuiDatepickerDirective extends SuiPopupBaseDirective {
    private _datepickerRef:ComponentRef<SuiDatepicker>;

    constructor(element:ElementRef, renderer:Renderer2, componentFactory:SuiComponentFactory) {
        const datepickerRef = componentFactory.createComponent(SuiDatepicker);

        super(element, componentFactory, new PopupConfig({
            trigger: PopupTrigger.OutsideClick,
            placement: PositioningPlacement.BottomLeft,
            component: datepickerRef
        }));

        renderer.addClass(this._popup.elementRef.nativeElement, "ui");
        renderer.addClass(this._popup.elementRef.nativeElement, "calendar");

        this._datepickerRef = datepickerRef;
    }
}

