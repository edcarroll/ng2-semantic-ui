import {ElementRef} from '@angular/core';
const Popper = require('popper.js');

export type PositioningPlacement = "inherit" | "top-start" | "top" | "top-end" | "left-start" | "left" | "left-end" | "bottom-start" | "bottom" | "bottom-end" | "right-start" | "right" | "right-end";

// Creates essentially a 'string' enum.
export const PositioningPlacement = {
    Inherit: "inherit" as PositioningPlacement,
    TopLeft: "top-start" as PositioningPlacement,
    TopCenter: "top" as PositioningPlacement,
    TopRight: "top-end" as PositioningPlacement,
    LeftTop: "left-start" as PositioningPlacement,
    Left: "left" as PositioningPlacement,
    LeftBottom: "left-end" as PositioningPlacement,
    BottomLeft: "bottom-start" as PositioningPlacement,
    BottomCenter: "bottom" as PositioningPlacement,
    BottomRight: "bottom-end" as PositioningPlacement,
    RightTop: "right-start" as PositioningPlacement,
    Right: "right" as PositioningPlacement,
    RightBottom: "right-end" as PositioningPlacement
}

export class PositioningService {
    public readonly anchor:ElementRef;
    public readonly subject:ElementRef;

    private _popper:any;

    public get placement():PositioningPlacement {
        return this._popper.options.placement;
    }

    public set placement(placement:PositioningPlacement) {
        this._popper.options.placement = placement;
        this.update();
    }

    constructor(anchor:ElementRef, subject:ElementRef, placement:PositioningPlacement) {
        this.anchor = anchor;
        this.subject = subject;

        this._popper = new Popper(
            anchor.nativeElement,
            subject.nativeElement,
            {
                placement,
                modifiers: {
                    applyStyle: {
                        gpuAcceleration: false
                    },
                    preventOverflow: {
                        boundariesElement: document.body
                    },
                    arrow: {
                        element: '.arrow'
                    }
                }
            });
    }

    public update() {
        this._popper.update();
    }
}