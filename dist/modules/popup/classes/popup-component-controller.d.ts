import { ElementRef, Type, Renderer2 } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/index";
import { SuiPopupController } from "./popup-controller";
import { PopupConfig } from "./popup-config";
export declare class SuiPopupComponentController<T> extends SuiPopupController {
    private _component;
    private _contentComponentRef?;
    readonly componentInstance: T | undefined;
    constructor(renderer: Renderer2, element: ElementRef, componentFactory: SuiComponentFactory, _component: Type<T>, config: PopupConfig);
    open(): void;
    protected cleanup(): void;
}
