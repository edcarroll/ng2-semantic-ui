import {
    Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef,
    ComponentRef, HostListener, TemplateRef, Renderer
} from "@angular/core";
import { SuiPopup } from "./popup";
import { PositioningPlacement } from "../util/services/positioning.service";
import { ITemplateRefContext, Util } from "../util/util";
import { PopupConfig, IPopupConfig, PopupTrigger } from "./popup-config";
import { SuiPopupConfig } from "./popup.service";
import { SuiPopupController } from "./popup-controller";
import { SuiComponentFactory } from "../util/services/component-factory.service";

@Directive({
    selector: "[suiPopup]",
    exportAs: "suiPopup"
})
export class SuiPopupDirective extends SuiPopupController {
    @Input()
    public set popupTemplate(template:TemplateRef<ITemplateRefContext<SuiPopup>>) {
        this.popup.config.template = template;
    }

    @Input()
    public set popupHeader(header:string) {
        this.popup.config.header = header;
    }

    @Input()
    public set popupText(text:string) {
        this.popup.config.text = text;
    }

    @Input()
    public set popupInverted(inverted:boolean) {
        this.popup.config.isInverted = Util.DOM.parseBooleanAttribute(inverted);
    }

    @Input()
    public set popupBasic(basic:boolean) {
        this.popup.config.isBasic = Util.DOM.parseBooleanAttribute(basic);
    }

    @Input()
    public set popupTransition(transition:string) {
        this.popup.config.transition = transition;
    }

    @Input()
    public set popupTransitionDuration(duration:number) {
        this.popup.config.transitionDuration = duration;
    }

    @Input()
    public set popupPlacement(placement:PositioningPlacement) {
        this.popup.config.placement = placement;
    }

    @Input()
    public set popupDelay(delay:number) {
        this.popup.config.delay = delay;
    }

    @Input()
    public get popupTrigger():PopupTrigger {
        return this.popup.config.trigger;
    }

    public set popupTrigger(trigger:PopupTrigger) {
        this.popup.config.trigger = trigger;
    }

    @Input()
    public set popupConfig(config:PopupConfig) {
        this.popup.config.batch(config);
    }

    constructor(element:ElementRef,
                componentFactory:SuiComponentFactory,
                popupDefaults:SuiPopupConfig) {

        super(element, componentFactory, new PopupConfig(popupDefaults));
    }
}
