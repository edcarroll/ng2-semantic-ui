import { Directive, Input, ElementRef, TemplateRef } from "@angular/core";
import { ITemplateRefContext, Util, PositioningPlacement, SuiComponentFactory } from "../../../misc/util";
import { SuiPopup } from "../components/popup";
import { PopupConfig, PopupTrigger } from "../classes/popup-config";
import { SuiPopupConfig } from "../services/popup.service";
import { SuiPopupController } from "../classes/popup-controller";

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
