import { TemplateRef, Renderer2, ElementRef } from "@angular/core";
import { SuiPopupController, IPopup } from "./popup-controller";
import { SuiComponentFactory, IImplicitContext } from "../../../misc/util";
import { PopupConfig, IPopupConfig } from "./popup-config";
export interface ITemplatePopupContext<T> extends IImplicitContext<IPopup> {
    context?: T;
}
export interface ITemplatePopupConfig<T> extends IPopupConfig {
    template?: TemplateRef<ITemplatePopupContext<T>>;
    context?: T;
}
export declare class TemplatePopupConfig<T> extends PopupConfig {
    template?: TemplateRef<ITemplatePopupContext<T>>;
    context?: T;
}
export declare class SuiPopupTemplateController<T> extends SuiPopupController {
    template?: TemplateRef<ITemplatePopupContext<T>>;
    context?: T;
    constructor(renderer: Renderer2, element: ElementRef, componentFactory: SuiComponentFactory, config: PopupConfig);
    configure(config?: ITemplatePopupConfig<T>): void;
    open(): void;
}
