import {Component, Input, Renderer2, ElementRef, HostBinding} from '@angular/core';
import Popper from "popper.js";

@Component({
    selector: 'sui-popup-arrow',
    template: `
<ng-container *ngIf="!basic">
    <div class="dynamic arrow" [attr.direction]="direction" *ngIf="alignment == 'center'"></div>
    <div class="static arrow" [attr.direction]="direction" [attr.alignment]="alignment" *ngIf="alignment != 'center'"></div>
</ng-container>
`,
    styles: [`
.arrow {
    position: absolute;
    width: 0.71428571em;
    height: 0.71428571em;
    background: #ffffff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 2;
}

:host.inverted .arrow {
    background: #1b1c1d;
}

.arrow[direction="top"] {
    bottom: -0.30714286em;
    box-shadow: 1px 1px 0 0 #bababc;
}

.arrow[direction="left"] {
    right: -0.30714286em;
    box-shadow: 1px -1px 1px 0 #bababc;
}

.arrow[direction="bottom"] {
    top: -0.30714286em;
    box-shadow: -1px -1px 0 0 #bababc;
}

.arrow[direction="right"] {
    left: -0.30714286em;
    box-shadow: -1px 1px 1px 0 #bababc;
}

.static.arrow[direction="bottom"][alignment="start"],
.static.arrow[direction="top"][alignment="start"] {
    left: 1em;
    right: auto;
}

.static.arrow[direction="left"][alignment="start"],
.static.arrow[direction="right"][alignment="start"] {
    top: 1em;
    bottom: auto;
}

.static.arrow[direction="bottom"][alignment="end"],
.static.arrow[direction="top"][alignment="end"] {
    left: auto;
    right: 1em;
}

.static.arrow[direction="left"][alignment="end"],
.static.arrow[direction="right"][alignment="end"] {
    top: auto;
    bottom: 1em;
}
`]
})
export class SuiPopupArrow {
    @Input()
    // This should be an IPosition but for some reason Angular CLI isn't able to find it and warns you about it.
    public position:Popper.Data;

    @HostBinding("class.inverted")
    @Input()
    public inverted:boolean;

    @Input()
    public basic:boolean;

    public get direction() {
        if (this.position) {
            return this.position.placement.split("-").shift();
        }
    }

    public get alignment() {
        if (this.position) {
            const alignment = this.position.placement.split("-").pop();
            if (alignment == this.direction) {
                return "center";
            }
            return alignment;
        }
    }
}