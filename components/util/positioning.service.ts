import {ElementRef, EventEmitter} from '@angular/core';
import Popper from "popper.js";

export type PositioningPlacement = "inherit" | "top-start" | "top" | "top-end" | "left-start" | "left" | "left-end" | "bottom-start" | "bottom" | "bottom-end" | "right-start" | "right" | "right-end";

// Creates essentially a 'string' enum.
export const PositioningPlacement = {
    Inherit: "inherit" as PositioningPlacement,
    TopLeft: "top-start" as PositioningPlacement,
    TopCenter: "top" as PositioningPlacement,
    TopRight: "top-end" as PositioningPlacement,
    LeftTop: "left-start" as PositioningPlacement,
    LeftCenter: "left" as PositioningPlacement,
    LeftBottom: "left-end" as PositioningPlacement,
    BottomLeft: "bottom-start" as PositioningPlacement,
    BottomCenter: "bottom" as PositioningPlacement,
    BottomRight: "bottom-end" as PositioningPlacement,
    RightTop: "right-start" as PositioningPlacement,
    RightCenter: "right" as PositioningPlacement,
    RightBottom: "right-end" as PositioningPlacement
}

export interface IPositionBoundingBox {
    width:number;
    height:number;
    top:number;
    left:number;
    bottom:number;
    right:number;
}

export class PositioningService {
    public readonly anchor:ElementRef;
    public readonly subject:ElementRef;

    private _popper:any;
    private _popperState:Popper.Data;

    public get placement():PositioningPlacement {
        return this._popper.options.placement;
    }

    public set placement(placement:PositioningPlacement) {
        this._popper.options.placement = placement;
        this.update();
    }

    public get state() {
        return this._popperState;
    }

    constructor(anchor:ElementRef, subject:ElementRef, placement:PositioningPlacement, arrowSelector?:string) {
        this.anchor = anchor;
        this.subject = subject;

        let modifiers:any = {
            applyStyle: {
                gpuAcceleration: false
            },
            preventOverflow: {
                boundariesElement: document.body
            }
        };

        if (arrowSelector) {
            modifiers.arrow = {
                element: arrowSelector
            };
        }

        this._popper = new Popper(
            anchor.nativeElement,
            subject.nativeElement,
            {
                placement,
                modifiers,
                onCreate: initial => this._popperState = initial,
                onUpdate: update => this._popperState = update
            });
    }

    public update() {
        this._popper.update();
    }
}