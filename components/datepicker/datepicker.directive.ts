
import {
    Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
    Renderer2
} from "@angular/core";
import { SuiPopupDirective } from "../popup/popup.directive";
import { SuiPopupConfig } from "../popup/popup.service";
import { SuiPopupController } from "../popup/popup-controller";
import { PopupConfig, PopupTrigger } from "../popup/popup-config";
import { PositioningPlacement } from "../util/services/positioning.service";
import { SuiComponentFactory } from "../util/services/component-factory.service";
import { SuiDatepicker } from "./datepicker";

@Directive({
    selector: "[suiDatepicker]"
})
export class SuiDatepickerDirective extends SuiPopupController<SuiDatepicker> {
    constructor(element:ElementRef, renderer:Renderer2, componentFactory:SuiComponentFactory) {
        super(element, componentFactory, new PopupConfig({
            trigger: PopupTrigger.OutsideClick,
            placement: PositioningPlacement.BottomLeft,
            component: SuiDatepicker
        }));

        // This ensures the popup is drawn correctly (i.e. no border).
        renderer.addClass(this.popup.elementRef.nativeElement, "ui");
        renderer.addClass(this.popup.elementRef.nativeElement, "calendar");

        this.popup.onOpen.subscribe(() => {
            if (this._contentComponentRef) {
                this._contentComponentRef.instance.calendarClasses = false;
                // this._contentComponentRef.instance.selectedDate = new Date();
            }
        });
    }
}
