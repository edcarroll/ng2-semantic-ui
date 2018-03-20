import { ElementRef, OnDestroy, Renderer2 } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/index";
import { PopupConfig, IPopupConfig } from "./popup-config";
import { SuiPopup } from "../components/popup";
export interface IPopup {
    open(): void;
    close(): void;
    toggle(): void;
}
export declare abstract class SuiPopupController implements IPopup, OnDestroy {
    protected _element: ElementRef;
    protected _componentFactory: SuiComponentFactory;
    private _componentRef;
    readonly popup: SuiPopup;
    private _openingTimeout;
    private _documentListener;
    constructor(renderer: Renderer2, _element: ElementRef, _componentFactory: SuiComponentFactory, config: PopupConfig);
    configure(config?: IPopupConfig): void;
    openDelayed(): void;
    open(): void;
    close(): void;
    toggleDelayed(): void;
    toggle(): void;
    private onMouseEnter();
    private onMouseLeave();
    private onClick();
    onDocumentClick(e: MouseEvent): void;
    private onFocusIn();
    private onFocusOut(e);
    protected cleanup(): void;
    ngOnDestroy(): void;
}
