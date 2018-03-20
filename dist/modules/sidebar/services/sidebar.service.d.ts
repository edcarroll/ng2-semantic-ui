import { EventEmitter } from "@angular/core";
export declare type SidebarTransition = "overlay" | "push" | "scale down" | "uncover" | "slide along" | "slide out";
export declare const SidebarTransition: {
    Overlay: SidebarTransition;
    Push: SidebarTransition;
    ScaleDown: SidebarTransition;
    Uncover: SidebarTransition;
    SlideAlong: SidebarTransition;
    SlideOut: SidebarTransition;
};
export declare type SidebarDirection = "left" | "right" | "top" | "bottom";
export declare const SidebarDirection: {
    Left: "left" | "right" | "top" | "bottom";
    Right: "left" | "right" | "top" | "bottom";
    Top: "left" | "right" | "top" | "bottom";
    Bottom: "left" | "right" | "top" | "bottom";
};
export declare class SidebarService {
    isVisible: boolean;
    isAnimating: boolean;
    wasJustOpened: boolean;
    direction: SidebarDirection;
    private _width;
    private _height;
    width: number;
    height: number;
    isVisibleChange: EventEmitter<boolean>;
    widthChange: EventEmitter<void>;
    heightChange: EventEmitter<void>;
    private _isAnimatingTimeout;
    transition: SidebarTransition;
    constructor(isVisible?: boolean);
    setVisibleState(isVisible: boolean): void;
    toggleVisibleState(): void;
}
