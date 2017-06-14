import { EventEmitter } from "@angular/core";

export type SidebarTransition = "overlay" | "push" | "scale down" | "uncover" | "slide along" | "slide out";

export const SidebarTransition = {
    Overlay: "overlay" as SidebarTransition,
    Push: "push" as SidebarTransition,
    ScaleDown: "scale down" as SidebarTransition,
    Uncover: "uncover" as SidebarTransition,
    SlideAlong: "slide along" as SidebarTransition,
    SlideOut: "slide out" as SidebarTransition
};

export type SidebarDirection = "left" | "right" | "top" | "bottom";

export const SidebarDirection = {
    Left: "left" as SidebarDirection,
    Right: "right" as SidebarDirection,
    Top: "top" as SidebarDirection,
    Bottom: "bottom" as SidebarDirection
};

export class SidebarService {
    public isVisible:boolean;
    public isAnimating:boolean;
    public wasJustOpened:boolean;

    public direction:SidebarDirection;

    private _width:number;
    private _height:number;

    public get width():number {
        if (this.direction === SidebarDirection.Left) {
            return this._width;
        }
        if (this.direction === SidebarDirection.Right) {
            return -this._width;
        }
        return 0;
    }

    public set width(width:number) {
        this._width = width;
        this.widthChange.emit();
    }

    public get height():number {
        if (this.direction === SidebarDirection.Top) {
            return this._height;
        }
        if (this.direction === SidebarDirection.Bottom) {
            return -this._height;
        }
        return 0;
    }

    public set height(height:number) {
        this._height = height;
        this.heightChange.emit();
    }

    public isVisibleChange:EventEmitter<boolean>;
    public widthChange:EventEmitter<void>;
    public heightChange:EventEmitter<void>;

    private _isAnimatingTimeout:number;

    public transition:SidebarTransition;

    constructor(isVisible:boolean = false) {
        this.isVisible = isVisible;
        this.isAnimating = false;
        this.wasJustOpened = false;

        this.isVisibleChange = new EventEmitter<boolean>();
        this.widthChange = new EventEmitter<void>();
        this.heightChange = new EventEmitter<void>();

        this.width = 260;
        this.height = 0;

        this.transition = SidebarTransition.Uncover;
    }

    public setVisibleState(isVisible:boolean):void {
        if (this.isVisible !== isVisible) {
            this.isVisible = isVisible;
            this.isAnimating = true;
            this.wasJustOpened = true;

            this.isVisibleChange.emit(isVisible);

            setTimeout(() => this.wasJustOpened = false);
            clearTimeout(this._isAnimatingTimeout);
            this._isAnimatingTimeout = window.setTimeout(() => this.isAnimating = false, 500);
        }
    }

    public toggleVisibleState():void {
        this.setVisibleState(!this.isVisible);
    }
}
