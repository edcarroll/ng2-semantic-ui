import { Component, ViewChild, ViewContainerRef, ElementRef, EventEmitter, HostListener, HostBinding } from "@angular/core";
import { PositioningService, IDynamicClasses } from "../../../misc/util/internal";
import { TransitionController, TransitionDirection, Transition } from "../../transition/internal";
import { IPopup } from "../classes/popup-controller";
import { TemplatePopupConfig } from "../classes/popup-template-controller";

@Component({
    selector: "sui-popup",
    template: `
<div class="ui popup"
     [ngClass]="dynamicClasses"
     [suiTransition]="transitionController"
     [attr.direction]="direction"
     #container>

    <ng-container *ngIf="!config.template && (!!config.header || !!config.text)">
        <div class="header" *ngIf="config.header">{{ config.header }}</div>
        <div class="content">{{ config.text }}</div>
    </ng-container>
    <div #templateSibling></div>

    <sui-popup-arrow *ngIf="!config.isBasic"
                     [placement]="config.placement"
                     [inverted]="config.isInverted"></sui-popup-arrow>
</div>
`,
    styles: [`
.ui.popup {
    /* Autofit popup to the contents. */
    right: auto;
    margin: 0;
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
    public config:TemplatePopupConfig<any>;

    public transitionController:TransitionController;
    public positioningService:PositioningService;
    private _anchor:ElementRef;

    // Keeps track of whether the popup is open internally.
    private _isOpen:boolean;
    // `setTimeout` timer pointer for cancelling popup close.
    public closingTimeout:number;

    // Fires when the popup opens (and the animation is completed).
    public onOpen:EventEmitter<void>;
    // Fires when the popup closes (and the animation is completed).
    public onClose:EventEmitter<void>;

    public get isOpen():boolean {
        return this._isOpen;
    }

    // `ElementRef` for the positioning subject.
    @ViewChild("container", { read: ViewContainerRef, static: true })
    private _container:ViewContainerRef;

    public set anchor(anchor:ElementRef) {
        this._anchor = anchor;
    }

    // Returns the direction (`top`, `left`, `right`, `bottom`) of the current placement.
    public get direction():string | undefined {
        // We need to set direction attribute before popper init to allow correct positioning
        return this.config.placement.split(" ").shift();
    }

    // Returns the alignment (`top`, `left`, `right`, `bottom`) of the current placement.
    public get alignment():string | undefined {
        return this.config.placement.split(" ").pop();
    }

    public get dynamicClasses():IDynamicClasses {
        const classes:IDynamicClasses = {};
        if (this.direction) {
            classes[this.direction] = true;
        }
        if (this.alignment) {
            classes[this.alignment] = true;
        }
        if (this.config.isInverted) {
            classes.inverted = true;
        }
        if (this.config.isBasic) {
            classes.basic = true;
        }
        if (this.config.isFlowing) {
            classes.flowing = true;
        }
        if (this.config.size) {
            classes[this.config.size] = true;
        }
        if (this.config.width) {
            classes[this.config.width] = true;
        }
        return classes;
    }

    // `ViewContainerRef` for the element the template gets injected as a sibling of.
    @ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    public templateSibling:ViewContainerRef;

    @HostBinding("attr.tabindex")
    public readonly tabindex:number;

    constructor(public elementRef:ElementRef) {
        this.transitionController = new TransitionController(false);

        this._isOpen = false;

        this.onOpen = new EventEmitter<void>();
        this.onClose = new EventEmitter<void>();

        this.tabindex = 0;
    }

    public open():void {
        // Only attempt to open if currently closed.
        if (!this.isOpen) {
            // Cancel the closing timer.
            clearTimeout(this.closingTimeout);

            // Create positioning service after a brief delay.
            setTimeout(() => {
                this.positioningService = new PositioningService(
                    this._anchor,
                    this._container.element,
                    this.config.placement,
                    ".dynamic.arrow"
                );
                this.positioningService.hasArrow = !this.config.isBasic;
            });

            // Cancel all other transitions, and initiate the opening transition.
            this.transitionController.stopAll();
            this.transitionController.animate(
                new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.In, () => {
                    // Focus any element with [autofocus] attribute.
                    const autoFocus = this.elementRef.nativeElement.querySelector("[autofocus]") as HTMLElement | null;
                    if (autoFocus) {
                        // Autofocus after the browser has had time to process other event handlers.
                        setTimeout(() => autoFocus.focus(), 10);
                        // Try to focus again when the modal has opened so that autofocus works in IE11.
                        setTimeout(() => autoFocus.focus(), this.config.transitionDuration);
                    }
                }));

            // Finally, set the popup to be open.
            this._isOpen = true;
            this.onOpen.emit();
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
            clearTimeout(this.closingTimeout);
            // Start the closing timer, that fires the `onClose` event after the transition duration number of milliseconds.
            this.closingTimeout = window.setTimeout(() => this.onClose.emit(), this.config.transitionDuration);

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
