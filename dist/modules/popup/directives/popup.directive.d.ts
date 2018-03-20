import { ElementRef, TemplateRef, Renderer2 } from "@angular/core";
import { PositioningPlacement, SuiComponentFactory } from "../../../misc/util/index";
import { PopupTrigger } from "../classes/popup-config";
import { SuiPopupConfig } from "../services/popup.service";
import { SuiPopupTemplateController, ITemplatePopupContext, ITemplatePopupConfig } from "../classes/popup-template-controller";
export declare class SuiPopupDirective<T> extends SuiPopupTemplateController<T> {
    popupHeader: string;
    popupText: string;
    popupInverted: boolean;
    popupBasic: boolean;
    popupTransition: string;
    popupTransitionDuration: number;
    popupPlacement: PositioningPlacement;
    popupDelay: number;
    popupTrigger: PopupTrigger;
    popupTemplate: TemplateRef<ITemplatePopupContext<T>> | undefined;
    popupTemplateContext: T | undefined;
    popupConfig: ITemplatePopupConfig<T> | undefined;
    constructor(renderer: Renderer2, element: ElementRef, componentFactory: SuiComponentFactory, popupDefaults: SuiPopupConfig);
}
