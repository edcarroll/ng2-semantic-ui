import { ElementRef } from "@angular/core";
import Popper, { Modifiers, PopperOptions, Placement, Data } from "popper.js";

type PopperModifiers = Modifiers & {
    computeStyle?:{
        gpuAcceleration:boolean;
    };
};
type PopperInstance = Popper & {
    options:PopperOptions & {
        modifiers:PopperModifiers;
    };
};

export type PositioningPlacement = "auto" |
                                   "top left" | "top" | "top right" |
                                   "bottom left" | "bottom" | "bottom right" |
                                   "left top" | "left" | "left bottom" |
                                   "right top" | "right" | "right bottom";

export const PositioningPlacement = {
    Auto: "auto" as PositioningPlacement,
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

function placementToPopper(placement:PositioningPlacement):Placement {
    if (!placement || placement === PositioningPlacement.Auto) {
        return "auto";
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
    return chosenPlacement.join("-") as Placement;
}

function popperToPlacement(popper:string):PositioningPlacement {
    if (!popper || popper === "auto") {
        return "auto";
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

    private _popper:PopperInstance;
    private _popperState:Data;
    private _placement:PositioningPlacement;
    private _hasArrow:boolean;
    private _arrowSelector:string | undefined;

    public get placement():PositioningPlacement {
        return this._placement;
    }

    public set placement(placement:PositioningPlacement) {
        this._placement = placement;
        if (this._popper) {
            this._popper.options.placement = placementToPopper(placement);
        }
    }

    public set hasArrow(hasArrow:boolean) {
        this._hasArrow = hasArrow;
    }

    public get actualPlacement():PositioningPlacement {
        if (!this._popperState) {
            return PositioningPlacement.Auto;
        }

        return popperToPlacement(this._popperState.placement);
    }

    public get state():Data {
        return this._popperState;
    }

    constructor(anchor:ElementRef, subject:ElementRef, placement:PositioningPlacement, arrowSelector?:string) {
        this.anchor = anchor;
        this.subject = subject;
        this._placement = placement;
        this._arrowSelector = arrowSelector;
        this.init();
    }

    public init():void {
        const modifiers:PopperModifiers = {
            computeStyle: {
                gpuAcceleration: false
            },
            preventOverflow: {
                escapeWithReference: true,
                boundariesElement: document.body
            },
            arrow: {
                element: this._arrowSelector
            },
            offset: {
                fn: (data:Popper.Data) => {
                    if (this._hasArrow) {
                        const offsets = this.calculateOffsets();
                        data.offsets.popper.left += offsets.left;
                        data.offsets.popper.top += offsets.top;
                    }
                    return data;
                }
            }
        };

        if (!this._arrowSelector) {
            delete modifiers.arrow;
        }

        this._popper = new Popper(
            this.anchor.nativeElement,
            this.subject.nativeElement,
            {
                placement: placementToPopper(this._placement),
                modifiers,
                onCreate: initial => this._popperState = initial,
                onUpdate: update => this._popperState = update
            }) as PopperInstance;
    }

    public update():void {
        this._popper.update();
    }

    public destroy():void {
        this._popper.destroy();
    }

    private calculateOffsets():Popper.Offset {
        let left = 0; let top = 0;

        // To support correct positioning for all popup sizes we should calculate offset using em
        const fontSize = parseFloat(window.getComputedStyle(this.subject.nativeElement).getPropertyValue("font-size"));
        // The Semantic UI popup arrow width and height are 0.71428571em and the margin from the popup edge is 1em
        const arrowCenter = (0.71428571 / 2 + 1) * fontSize;

        if (this.anchor.nativeElement.offsetWidth <= arrowCenter * 2) {
            const anchorCenterWidth = this.anchor.nativeElement.offsetWidth / 2;
            if (this._placement === PositioningPlacement.TopLeft || this._placement === PositioningPlacement.BottomLeft) {
                left = anchorCenterWidth - arrowCenter;
            }
            if (this._placement === PositioningPlacement.TopRight || this._placement === PositioningPlacement.BottomRight) {
                left = arrowCenter - anchorCenterWidth;
            }
        }

        if (this.anchor.nativeElement.offsetHeight <= arrowCenter * 2) {
            const anchorCenterHeight = this.anchor.nativeElement.offsetHeight / 2;
            if (this._placement === PositioningPlacement.LeftTop || this._placement === PositioningPlacement.RightTop) {
                top = anchorCenterHeight - arrowCenter;
            }
            if (this._placement === PositioningPlacement.LeftBottom || this._placement === PositioningPlacement.RightBottom) {
                top = arrowCenter - anchorCenterHeight;
            }
        }
        return { top, left, width: 0, height: 0 };
    }

}
