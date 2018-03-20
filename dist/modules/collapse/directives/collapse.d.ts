import { ElementRef, Renderer2 } from "@angular/core";
export declare class SuiCollapse {
    private _element;
    private _renderer;
    private _isExpanded;
    private readonly _isCollapsed;
    private _isCollapsing;
    private _pristine;
    suiCollapse: boolean;
    collapseDuration: number;
    private readonly _animationDuration;
    constructor(_element: ElementRef, _renderer: Renderer2);
    hide(): void;
    show(): void;
    private animate(startHeight, endHeight, removeOnComplete?, callback?);
}
