import {Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef, HostListener, TemplateRef, Renderer} from '@angular/core';
import {SuiPopup} from './popup';
import {PositioningPlacement} from '../util/positioning.service';

export type PopupTrigger = "hover" | "click" | "focus" | "manual";

// Creates essentially a 'string' enum.
export const PopupTrigger = {
    Hover: "hover" as PopupTrigger,
    Click: "click" as PopupTrigger,
    Focus: "focus" as PopupTrigger,
    Manual: "manual" as PopupTrigger
}

@Directive({
    selector: '[suiPopup]',
    exportAs: 'suiPopup'
})
export class SuiPopupDirective {
    private _template:TemplateRef<any>;
    private _header:string;
    private _text:string;
    private _inverted:boolean;
    private _placement:PositioningPlacement;
    private _transition:string;
    private _transitionDuration:number;
    
    @Input()
    public set popupTemplate(template:TemplateRef<any>) {
        this._template = template;
        this.copyConfig();
    }

    @Input()
    public set popupHeader(header:string) {
        this._header = header;
        this.copyConfig();
    }

    @Input()
    public set popupText(text:string) {
        this._text = text;
        this.copyConfig();
    }

    @Input()
    public set popupInverted(inverted:boolean) {
        if (typeof inverted == "string") {
            inverted = true;
        }
        this._inverted = inverted;
        this.copyConfig();
    }

    @Input()
    public set popupTransition(transition:string) {
        this._transition = transition;
        this.copyConfig();
    }

    @Input()
    public set popupTransitionDuration(duration:number) {
        this._transitionDuration = duration;
        this.copyConfig();
    }

    @Input()
    public set popupPlacement(placement:PositioningPlacement) {
        const [direction, alignment] = placement.split(" ");

        let chosenPlacement = [direction];
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

        this._placement = chosenPlacement.join("-") as PositioningPlacement;
        this.copyConfig();
    }

    @Input()
    public popupTrigger:PopupTrigger;

    private _popupComponentRef:ComponentRef<SuiPopup>;

    private get _popup() {
        return this._popupComponentRef.instance;
    }

    constructor(private _element:ElementRef, private _viewContainerRef:ViewContainerRef, private _componentFactoryResolver:ComponentFactoryResolver) {
        this.popupTrigger = "hover";
    }

    private copyConfig() {
        if (this._popupComponentRef) {
            if (this.hasOwnProperty("_header")) {
                this._popup.header = this._header;
            }
            if (this.hasOwnProperty("_text")) {
                this._popup.text = this._text;
            }
            if (this.hasOwnProperty("_template")) {
                this._popup.template = this._template;
            }
            if (this.hasOwnProperty("_inverted")) {
                this._popup.inverted = this._inverted;
            }
            if (this.hasOwnProperty("_placement")) {
                this._popup.placement = this._placement;
            }
            if (this.hasOwnProperty("_transition")) {
                this._popup.transition = this._transition;
            }
            if (this.hasOwnProperty("_transitionDuration")) {
                this._popup.transitionDuration = this._transitionDuration;
            }
        }
    }

    public open() {
        if (!this._popupComponentRef) {
            const factory = this._componentFactoryResolver.resolveComponentFactory(SuiPopup);
            this._popupComponentRef = this._viewContainerRef.createComponent(factory);

            this._popup.onClose.subscribe(() => {
                this._popupComponentRef.destroy();
                this._popupComponentRef = null;
            });

            this.copyConfig();

            this._popup.anchor = this._element;
        }

        this._popup.open();
    }

    public close() {
        this._popup.close();
    }

    public toggle() {
        if (!this._popupComponentRef || (this._popupComponentRef && !this._popup.isOpen)) {
            return this.open();
        }
        return this.close();
    }

    @HostListener("mouseenter")
    private onMouseEnter() {
        if (this.popupTrigger == PopupTrigger.Hover) {
            this.open();
        }
    }

    @HostListener("mouseleave")
    private onMouseLeave() {
        if (this.popupTrigger == PopupTrigger.Hover) {
            this.close();
        }
    }

    @HostListener("click")
    private onClick() {
        if (this.popupTrigger == PopupTrigger.Click) {
            this.toggle();
        }
    }

    @HostListener("focusin")
    private onFocusIn() {
        if (this.popupTrigger == PopupTrigger.Focus) {
            this.open();
        }
    }

    @HostListener("focusout")
    private onFocusOut() {
        if (this.popupTrigger == PopupTrigger.Focus) {
            this.close();
        }
    }
}