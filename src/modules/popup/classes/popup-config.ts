import { TemplateRef } from "@angular/core";
import { ITemplateRefContext, PositioningPlacement } from "../../../misc/util/internal";
import { IPopup } from "./popup-controller";

export type PopupTrigger = "hover" | "click" | "outsideClick" | "focus" | "manual";
export type PopupSize = "mini" | "tiny" | "small" | "large" | "huge";
export type PopupWidth = "wide" | "very wide"  | "flowing";

export const PopupTrigger = {
    Hover: "hover" as PopupTrigger,
    Click: "click" as PopupTrigger,
    OutsideClick: "outsideClick" as PopupTrigger,
    Focus: "focus" as PopupTrigger,
    Manual: "manual" as PopupTrigger
};

export interface IPopupConfig {
    header?:string;
    text?:string;
    placement?:PositioningPlacement;
    trigger?:PopupTrigger;
    isInverted?:boolean;
    delay?:number;
    isBasic?:boolean;
    transition?:string;
    transitionDuration?:number;
    isFlowing?:boolean;
    isInline?:boolean;
}

export class PopupConfig implements IPopupConfig {
    public header?:string;
    public text?:string;
    public placement:PositioningPlacement;
    public trigger:PopupTrigger;
    public isInverted:boolean;
    public delay:number;
    public isBasic:boolean;
    public transition:string;
    public size:PopupSize;
    public width:PopupWidth;
    public transitionDuration:number;
    public isFlowing:boolean;
    public isInline:boolean;

    constructor(defaults:IPopupConfig = {}) {
        this.placement = PositioningPlacement.TopLeft;
        this.trigger = PopupTrigger.Hover;
        this.isInverted = false;
        this.delay = 0;
        this.isBasic = false;
        this.transition = "scale";
        this.transitionDuration = 200;
        this.isFlowing = false;
        this.isInline = false;
        Object.assign(this, defaults);
    }
}
