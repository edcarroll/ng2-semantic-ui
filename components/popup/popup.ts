import {Component, ViewChild, ViewContainerRef, ElementRef, Renderer, EventEmitter, TemplateRef, HostListener} from '@angular/core';
import {SuiTransition, Transition, TransitionDirection} from '../transition/transition';
import {TransitionController} from '../transition/transition-controller';
import {PositioningService, PositioningPlacement} from '../util/positioning.service';
import {TemplateRefContext} from "../util/util";
import Popper from "popper.js";

export interface IPopupConfiguration {
    template?:TemplateRef<TemplateRefContext<SuiPopup>>;
    header?:string;
    text?:string;
    inverted?:boolean;
    basic?:boolean;
    transition?:string;
    transitionDuration?:number;
}

@Component({
    selector: 'sui-popup',
    template: `
<div class="ui popup" [class.inverted]="config.inverted" [class.basic]="config.basic" [suiTransition]="transitionController" [attr.direction]="direction" #container>
    <ng-container *ngIf="!config.template">
        <div class="header" *ngIf="config.header">{{ config.header }}</div>
        <div class="content">{{ config.text }}</div>
    </ng-container>
    <div #templateSibling></div>
    <sui-popup-arrow [position]="position" [inverted]="config.inverted" [basic]="config.basic"></sui-popup-arrow>
</div>
`,
    styles: [`
.ui.popup {
    right: auto;
}

.ui.animating.popup {
    /* When the popup is animating, it may not initially be in the correct position.
       This fires a mouse event, causing the anchor's mouseleave to fire - making the popup flicker.
       Setting pointer-events to none while animating fixes this bug. */
    pointer-events: none;
}

.ui.popup::before {
    display: none;
}

.ui.popup[direction="top"],
.ui.popup[direction="bottom"] {
    margin-top: 1em;
    margin-bottom: 1em;
}

.ui.popup[direction="left"],
.ui.popup[direction="right"] {
    margin-left: 1em;
    margin-right: 1em;
}
`]
})
export class SuiPopup {
    public transitionController:TransitionController;

    private _templateInjected:boolean;
    
    public config:IPopupConfiguration;

    private _position:PositioningService;
    public placement:PositioningPlacement;
    public set anchor(anchor:ElementRef) {
        this._position = new PositioningService(anchor, this._container.element, this.placement, ".dynamic.arrow");
    }
    public get position():Popper.Data {
        if (this._position) {
            return this._position.state;
        }
        return null;
    }
    public get direction() {
        if (this.position) {
            return this.position.placement.split("-").shift();
        }
    }

    private _isOpen:boolean;
    private _closingTimeout:number;

    public onClose:EventEmitter<void>;

    public get isOpen() {
        return this._isOpen;
    }

    @ViewChild('container', { read: ViewContainerRef })
    private _container:ViewContainerRef;

    @ViewChild('templateSibling', { read: ViewContainerRef })
    private _templateSibling:ViewContainerRef;

    constructor(public elementRef:ElementRef) {
        this.transitionController = new TransitionController(false);

        this._templateInjected = false;

        this.config = {
            inverted: false,
            transition: "scale",
            transitionDuration: 200
        };

        this._isOpen = false;
        this.onClose = new EventEmitter<void>();
    }

    public open() {
        if (!this._isOpen) {
            clearTimeout(this._closingTimeout);

            if (this.config.template && !this._templateInjected) {
                this._templateSibling.createEmbeddedView(this.config.template, { $implicit: this });
                this._templateInjected = true;
            }
            
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.In));

            setTimeout(() => this._position.update());

            this._isOpen = true;
        }
    }

    public close() {
        if (this._isOpen) {
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.Out));

            clearTimeout(this._closingTimeout);
            this._closingTimeout = setTimeout(() => this.onClose.emit(), this.config.transitionDuration);

            this._isOpen = false;
        }
    }

    @HostListener("click", ["$event"])
    public onClick(event:MouseEvent) {
        // Makes sense here, as the popup shouldn't be attached to any DOM element.
        event.stopPropagation();
    }
}