import {
    Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef,
    ComponentRef, HostListener, TemplateRef, Renderer
} from "@angular/core";
import { SuiPopup } from "./popup";
import { PositioningPlacement } from "../util/positioning.service";
import { ITemplateRefContext, parseBooleanAttribute } from "../util/util";
import { PopupConfig, IPopupConfig, PopupTrigger } from "./popup-config";
import { SuiPopupConfig } from "./popup.service";
import { SuiPopupBaseDirective } from "./popup-base.directive";
import { SuiComponentFactory } from "../util/component-factory.service";

@Directive({
    selector: "[suiPopup]",
    exportAs: "suiPopup"
})
export class SuiPopupDirective extends SuiPopupBaseDirective {
    @Input()
    public set popupTemplate(template:TemplateRef<ITemplateRefContext<SuiPopup>>) {
        this._popupConfig.template = template;
    }

    @Input()
    public set popupHeader(header:string) {
        this._popupConfig.header = header;
    }

    @Input()
    public set popupText(text:string) {
        this._popupConfig.text = text;
    }

    @Input()
    public set popupInverted(inverted:boolean) {
        this._popupConfig.isInverted = parseBooleanAttribute(inverted);
    }

    @Input()
    public set popupBasic(basic:boolean) {
        this._popupConfig.isBasic = parseBooleanAttribute(basic);
    }

    @Input()
    public set popupTransition(transition:string) {
        this._popupConfig.transition = transition;
    }

    @Input()
    public set popupTransitionDuration(duration:number) {
        this._popupConfig.transitionDuration = duration;
    }

    @Input()
    public set popupPlacement(placement:PositioningPlacement) {
        this._popupConfig.placement = placement;
    }

    @Input()
    public set popupDelay(delay:number) {
        this._popupConfig.delay = delay;
    }

    @Input()
    public get popupTrigger():PopupTrigger {
        return this._popupConfig.trigger;
    }

    public set popupTrigger(trigger:PopupTrigger) {
        this._popupConfig.trigger = trigger;
    }

    @Input()
    public set popupConfig(config:PopupConfig) {
        this._popupConfig.batch(config);
    }

    constructor(element:ElementRef,
                componentFactory:SuiComponentFactory,
                popupDefaults:SuiPopupConfig) {

        super(element, componentFactory, new PopupConfig(popupDefaults));
    }
}
