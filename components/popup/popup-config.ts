import {TemplateRef} from "@angular/core";
import {TemplateRefContext} from "../util/util";
import {PositioningPlacement} from "../util/positioning.service";
import {IPopup} from "./popup.directive";

export type PopupTrigger = "hover" | "click" | "outsideClick" | "focus" | "manual";

export const PopupTrigger = {
    Hover: "hover" as PopupTrigger,
    Click: "click" as PopupTrigger,
    OutsideClick: "outsideClick" as PopupTrigger,
    Focus: "focus" as PopupTrigger,
    Manual: "manual" as PopupTrigger
}

export interface IPopupConfig {
    header?:string;
    text?:string;
    template?:TemplateRef<TemplateRefContext<IPopup>>;
    placement?:PositioningPlacement;
    trigger?:PopupTrigger;
    isInverted?:boolean;
    delay?:number;
    isBasic?:boolean;
    transition?:string;
    transitionDuration?:number;
}

export class PopupConfig implements IPopupConfig {
    public header:string;
    public text:string;
    public template:TemplateRef<TemplateRefContext<IPopup>>;
    public placement:PositioningPlacement;
    public trigger:PopupTrigger;
    public isInverted:boolean;
    public delay:number;
    public isBasic:boolean;
    public transition:string;
    public transitionDuration:number;

    constructor(defaults:IPopupConfig = {}) {
        this.placement = PositioningPlacement.TopLeft;
        this.trigger = PopupTrigger.Hover;
        this.isInverted = false;
        this.delay = 0;
        this.isBasic = false;
        this.transition = "scale";
        this.transitionDuration = 200;

        Object.assign(this, defaults);
    }

    public batch(config:IPopupConfig = {}) {
        Object.assign(this, config);
    }
}
