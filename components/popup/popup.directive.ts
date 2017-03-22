import {Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef, HostListener, TemplateRef, Renderer} from '@angular/core';
import {SuiPopup, IPopupConfiguration} from './popup';
import {PositioningPlacement} from '../util/positioning.service';

export type PopupTrigger = "hover" | "click" | "outsideClick" | "focus" | "manual";

// Creates essentially a 'string' enum.
export const PopupTrigger = {
    Hover: "hover" as PopupTrigger,
    Click: "click" as PopupTrigger,
    OutsideClick: "outsideClick" as PopupTrigger,
    Focus: "focus" as PopupTrigger,
    Manual: "manual" as PopupTrigger
}

@Directive({
    selector: '[suiPopup]',
    exportAs: 'suiPopup'
})
export class SuiPopupDirective {
    private _config:IPopupConfiguration;
    private _placement:PositioningPlacement;
    
    @Input()
    public set popupTemplate(template:TemplateRef<any>) {
        this._config.template = template;
        this.copyConfig();
    }

    @Input()
    public set popupHeader(header:string) {
        this._config.header = header;
        this.copyConfig();
    }

    @Input()
    public set popupText(text:string) {
        this._config.text = text;
        this.copyConfig();
    }

    @Input()
    public set popupInverted(inverted:boolean) {
        if (typeof inverted == "string") {
            inverted = true;
        }
        this._config.inverted = inverted;
        this.copyConfig();
    }

     @Input()
    public set popupBasic(basic:boolean) {
        if (typeof basic == "string") {
            basic = true;
        }
        this._config.basic = basic;
        this.copyConfig();
    }

    @Input()
    public set popupTransition(transition:string) {
        this._config.transition = transition;
        this.copyConfig();
    }

    @Input()
    public set popupTransitionDuration(duration:number) {
        this._config.transitionDuration = duration;
        this.copyConfig();
    }

    @Input()
    public set popupPlacement(placement:PositioningPlacement) {
        if (!placement) {
            return;
        }
        
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
        this._config = {};

        this.popupTrigger = PopupTrigger.Hover;
        this.popupPlacement = PositioningPlacement.TopLeft;
    }

    private copyConfig() {
        if (this._popupComponentRef) {
            Object.assign(this._popup.config, this._config);

            if (this.hasOwnProperty("_placement")) {
                this._popup.placement = this._placement;
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
        if (this.popupTrigger == PopupTrigger.Click || this.popupTrigger == PopupTrigger.OutsideClick) {
            event.stopPropagation();

            this.toggle();
        }
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(e:MouseEvent) {
        if (this._popupComponentRef && this.popupTrigger == PopupTrigger.OutsideClick) {
            this.close();
        }
    }

    @HostListener("focus")
    private onFocus() {
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