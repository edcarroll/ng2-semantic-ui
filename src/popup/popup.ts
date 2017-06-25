import { Component, ViewChild, ViewContainerRef, ElementRef, Renderer2, EventEmitter, TemplateRef, HostListener } from "@angular/core";
import { SuiTransition, Transition, TransitionDirection } from "../transition/transition";
import { TransitionController } from "../transition/transition-controller";
import { PositioningService, PositioningPlacement } from "../util/positioning.service";
import { ITemplateRefContext } from "../util/util";
import { IPopup } from "./popup.directive";
import { PopupConfig } from "./popup-config";
import Popper from "popper.js";

@Component({
    selector: "sui-popup",
    template: `
<div class="ui popup"
     [class.inverted]="config.isInverted"
     [class.basic]="config.isBasic"
     [suiTransition]="transitionController"
     [attr.direction]="direction"
     #container>

    <ng-container *ngIf="!config.template">
        <div class="header" *ngIf="config.header">{{ config.header }}</div>
        <div class="content">{{ config.text }}</div>
    </ng-container>
    <div #templateSibling></div>

    <sui-popup-arrow *ngIf="!config.isBasic"
                     [placement]="positioningService.actualPlacement"
                     [inverted]="config.isInverted"></sui-popup-arrow>
</div>
`,
    styles: [`
.ui.popup {
    /* Autofit popup to the contents. */
    right: auto;
}

.ui.animating.popup {
    /* When the popup is animating, it may not initially be in the correct position.
       This fires a mouse event, causing the anchor's mouseleave to fire - making the popup flicker.
       Setting pointer-events to none while animating fixes this bug. */
    pointer-events: none;
}

.ui.popup::before {
    /* Hide the Semantic UI CSS arrow. */
    display: none;
}

/* Offset popup by 0.75em above and below when placed 'vertically'. */
.ui.popup[direction="top"],
.ui.popup[direction="bottom"] {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
}

/* Offset popup by 0.75em either side when placed 'horizontally'. */
.ui.popup[direction="left"],
.ui.popup[direction="right"] {
    margin-left: 0.75em;
    margin-right: 0.75em;
}
`]
})
export class SuiPopup implements IPopup {
    // Config settings for this popup.
    public config:PopupConfig;

    public transitionController:TransitionController;
    public positioningService:PositioningService;

    // Keeps track of whether the popup is open internally.
    private _isOpen:boolean;
    // `setTimeout` timer pointer for cancelling popup close.
    private _closingTimeout:number;

    // Fires when the popup closes (and the animation is completed).
    public onClose:EventEmitter<void>;

    public get isOpen():boolean {
        return this._isOpen;
    }

    // `ElementRef` for the positioning subject.
    @ViewChild("container", { read: ViewContainerRef })
    private _container:ViewContainerRef;

    public set anchor(anchor:ElementRef) {
        // Whenever the anchor is set (which is when the popup is created), recreate the positioning service with the appropriate options.
        this.positioningService = new PositioningService(anchor, this._container.element, this.config.placement, ".dynamic.arrow");
    }

    // Returns the direction (`top`, `left`, `right`, `bottom`) of the current placement.
    public get direction():string | undefined {
        if (this.positioningService) {
            return this.positioningService.actualPlacement.split(" ").shift();
        }
    }

    // `ViewContainerRef` for the element the template gets injected as a sibling of.
    @ViewChild("templateSibling", { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    constructor(public elementRef:ElementRef) {
        this.transitionController = new TransitionController(false);

        this._isOpen = false;
        this.onClose = new EventEmitter<void>();
    }

    public open():void {
        // Only attempt to open if currently closed.
        if (!this.isOpen) {
            // Cancel the closing timer.
            clearTimeout(this._closingTimeout);

            // Cancel all other transitions, and initiate the opening transition.
            this.transitionController.stopAll();
            this.transitionController.animate(
                new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.In));

            // Refresh the popup position after a brief delay to allow for browser processing time.
            setTimeout(() => this.positioningService.update());

            // Finally, set the popup to be open.
            this._isOpen = true;
        }
    }

    public toggle():void {
        if (!this.isOpen) {
            return this.open();
        }

        return this.close();
    }

    public close():void {
        // Only attempt to close if currently open.
        if (this.isOpen) {
            // Cancel all other transitions, and initiate the closing transition.
            this.transitionController.stopAll();
            this.transitionController.animate(
                new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.Out));

            // Cancel the closing timer.
            clearTimeout(this._closingTimeout);
            // Start the closing timer, that fires the `onClose` event after the transition duration number of milliseconds.
            this._closingTimeout = window.setTimeout(() => this.onClose.emit(), this.config.transitionDuration);

            // Finally, set the popup to be closed.
            this._isOpen = false;
        }
    }

    @HostListener("click", ["$event"])
    public onClick(event:MouseEvent):void {
        // Makes sense here, as the popup shouldn't be attached to any DOM element.
        event.stopPropagation();
    }
}
