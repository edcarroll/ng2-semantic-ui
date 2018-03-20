import { ElementRef } from "@angular/core";
import { Data } from "popper.js";
export declare type PositioningPlacement = "auto" | "top left" | "top" | "top right" | "bottom left" | "bottom" | "bottom right" | "left top" | "left" | "left bottom" | "right top" | "right" | "right bottom";
export declare const PositioningPlacement: {
    Auto: PositioningPlacement;
    TopLeft: PositioningPlacement;
    Top: PositioningPlacement;
    TopRight: PositioningPlacement;
    LeftTop: PositioningPlacement;
    Left: PositioningPlacement;
    LeftBottom: PositioningPlacement;
    BottomLeft: PositioningPlacement;
    Bottom: PositioningPlacement;
    BottomRight: PositioningPlacement;
    RightTop: PositioningPlacement;
    Right: PositioningPlacement;
    RightBottom: PositioningPlacement;
};
export interface IPositionBoundingBox {
    width: number;
    height: number;
    top: number;
    left: number;
    bottom: number;
    right: number;
}
export declare class PositioningService {
    readonly anchor: ElementRef;
    readonly subject: ElementRef;
    private _popper;
    private _popperState;
    private _placement;
    placement: PositioningPlacement;
    readonly actualPlacement: PositioningPlacement;
    readonly state: Data;
    constructor(anchor: ElementRef, subject: ElementRef, placement: PositioningPlacement, arrowSelector?: string);
    update(): void;
    destroy(): void;
}
