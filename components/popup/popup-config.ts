import {TemplateRef} from '@angular/core';
import {TemplateRefContext} from '../util/util';
import {PositioningPlacement} from '../util/positioning.service';
import {IPopup} from './popup.directive';

export type PopupTrigger = "hover" | "click" | "outsideClick" | "focus" | "manual";

export const PopupTrigger = {
    Hover: "hover" as PopupTrigger,
    Click: "click" as PopupTrigger,
    OutsideClick: "outsideClick" as PopupTrigger,
    Focus: "focus" as PopupTrigger,
    Manual: "manual" as PopupTrigger
}

export interface IPopupOptions {
    header?:string;
    text?:string;
    template?:TemplateRef<TemplateRefContext<IPopup>>;
    placement?:PositioningPlacement;
    trigger?:PopupTrigger;
    inverted?:boolean;
    delay?:number;
    basic?:boolean;
    transition?:string;
    transitionDuration?:number;
}

export class PopupConfig implements IPopupOptions {
    public header:string;
    public text:string;
    public template:TemplateRef<TemplateRefContext<IPopup>>;
    public placement:PositioningPlacement;
    public trigger:PopupTrigger;
    public inverted:boolean;
    public delay:number;
    public basic:boolean;
    public transition:string;
    public transitionDuration:number;

    constructor(defaults:IPopupOptions = {}) {
        this.placement = PositioningPlacement.TopLeft;
        this.trigger = PopupTrigger.Hover;
        this.inverted = false;
        this.delay = 0;
        this.basic = false;
        this.transition = "scale";
        this.transitionDuration = 200;

        Object.assign(this, defaults);
    }
}