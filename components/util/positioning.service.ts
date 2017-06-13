import { ElementRef, EventEmitter } from "@angular/core";
import Popper from "popper.js";

export type PositioningPlacement = "inherit" |
                                   "top left" | "top" | "top right" |
                                   "bottom left" | "bottom" | "bottom right" |
                                   "left top" | "left" | "left bottom" |
                                   "right top" | "right" | "right bottom";

type PopperPlacement = "inherit" |
                       "top-start" | "top" | "top-end" |
                       "left-start" | "left" | "left-end" |
                       "bottom-start" | "bottom" | "bottom-end" |
                       "right-start" | "right" | "right-end";

// tslint:disable-next-line:ext-variable-name
export const PositioningPlacement = {
    Inherit: "inherit" as PositioningPlacement,
    TopLeft: "top left" as PositioningPlacement,
    Top: "top" as PositioningPlacement,
    TopRight: "top right" as PositioningPlacement,
    LeftTop: "left top" as PositioningPlacement,
    Left: "left" as PositioningPlacement,
    LeftBottom: "left bottom" as PositioningPlacement,
    BottomLeft: "bottom left" as PositioningPlacement,
    Bottom: "bottom" as PositioningPlacement,
    BottomRight: "bottom right" as PositioningPlacement,
    RightTop: "right top" as PositioningPlacement,
    Right: "right" as PositioningPlacement,
    RightBottom: "right bottom" as PositioningPlacement
};

export interface IPositionBoundingBox {
    width:number;
    height:number;
    top:number;
    left:number;
    bottom:number;
    right:number;
}

function placementToPopper(placement:PositioningPlacement):PopperPlacement {
    if (!placement || placement === PositioningPlacement.Inherit) {
        return "inherit";
    }

    // All placements of the format: `direction alignment`, e.g. `top left`.
    const [direction, alignment] = placement.split(" ");

    // Direction alone covers case of just `top`, `left`, `bottom`, `right`.
    const chosenPlacement = [direction];

    // Add `start` / `end` to placement, depending on alignment direction.
    switch (alignment) {
        case "top":
        case "left":
            chosenPlacement.push("start");
            break;
        case "bottom":
        case "right":
            chosenPlacement.push("end");
            break;
    }

    // Join with hyphen to create Popper compatible placement.
    return chosenPlacement.join("-") as PopperPlacement;
}

function popperToPlacement(popper:string):PositioningPlacement {
    if (!popper || popper === "inherit") {
        return "inherit";
    }

    const [direction, alignment] = popper.split("-");

    const chosenPlacement = [direction];

    switch (direction) {
        case "top":
        case "bottom":
            switch (alignment) {
                case "start":
                    chosenPlacement.push("left");
                    break;
                case "end":
                    chosenPlacement.push("right");
                    break;
            }
            break;
        case "left":
        case "right":
            switch (alignment) {
                case "start":
                    chosenPlacement.push("top");
                    break;
                case "end":
                    chosenPlacement.push("bottom");
                    break;
            }
            break;
    }

    return chosenPlacement.join(" ") as PositioningPlacement;
}

export class PositioningService {
    public readonly anchor:ElementRef;
    public readonly subject:ElementRef;

    private _popper:any;
    private _popperState:Popper.Data;
    private _placement:PositioningPlacement;

    public get placement():PositioningPlacement {
        return this._placement;
    }

    public set placement(placement:PositioningPlacement) {
        this._placement = placement;
        this._popper.options.placement = placementToPopper(placement);
        this.update();
    }

    public get actualPlacement():PositioningPlacement {
        if (!this._popperState) {
            return PositioningPlacement.Inherit;
        }

        return popperToPlacement(this._popperState.placement);
    }

    public get state():Popper.Data {
        return this._popperState;
    }

    constructor(anchor:ElementRef, subject:ElementRef, placement:PositioningPlacement, arrowSelector?:string) {
        this.anchor = anchor;
        this.subject = subject;
        this._placement = placement;

        const modifiers = {
            applyStyle: {
                gpuAcceleration: false
            },
            preventOverflow: {
                boundariesElement: document.body
            },
            arrow: {
                element: arrowSelector
            }
        };

        if (!arrowSelector) {
            delete modifiers.arrow;
        }

        this._popper = new Popper(
            anchor.nativeElement,
            subject.nativeElement,
            {
                placement: placementToPopper(placement),
                modifiers,
                onCreate: initial => this._popperState = initial,
                onUpdate: update => this._popperState = update
            });
    }

    public update():void {
        this._popper.update();
    }
}
