import { ViewContainerRef, ElementRef, EventEmitter } from "@angular/core";
import { PositioningService, IDynamicClasses } from "../../../misc/util/index";
import { TransitionController } from "../../transition/index";
import { IPopup } from "../classes/popup-controller";
import { TemplatePopupConfig } from "../classes/popup-template-controller";
export declare class SuiPopup implements IPopup {
    elementRef: ElementRef;
    config: TemplatePopupConfig<any>;
    transitionController: TransitionController;
    positioningService: PositioningService;
    private _isOpen;
    closingTimeout: number;
    onOpen: EventEmitter<void>;
    onClose: EventEmitter<void>;
    readonly isOpen: boolean;
    private _container;
    anchor: ElementRef;
    readonly direction: string | undefined;
    readonly alignment: string | undefined;
    readonly dynamicClasses: IDynamicClasses;
    templateSibling: ViewContainerRef;
    private _tabindex;
    constructor(elementRef: ElementRef);
    open(): void;
    toggle(): void;
    close(): void;
    onClick(event: MouseEvent): void;
}
