import {
    Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef,
    ComponentRef, HostListener, TemplateRef, Renderer
} from "@angular/core";
import { SuiPopup } from "./popup";
import { PositioningPlacement } from "../util/positioning.service";
import { TemplateRefContext, parseBooleanAttribute } from "../util/util";
import { PopupConfig, IPopupConfig, PopupTrigger } from "./popup-config";
import { SuiPopupConfig } from "./popup.service";

export interface IPopup {
    open():void;
    close():void;
    toggle():void;
}

@Directive({
    selector: "[suiPopup]",
    exportAs: "suiPopup"
})
export class SuiPopupDirective implements IPopup {
    public config:PopupConfig;

    @Input()
    public set popupTemplate(template:TemplateRef<TemplateRefContext<SuiPopup>>) {
        this.config.template = template;
    }

    @Input()
    public set popupHeader(header:string) {
        this.config.header = header;
    }

    @Input()
    public set popupText(text:string) {
        this.config.text = text;
    }

    @Input()
    public set popupInverted(inverted:boolean) {
        this.config.isInverted = parseBooleanAttribute(inverted);
    }

    @Input()
    public set popupBasic(basic:boolean) {
        this.config.isBasic = parseBooleanAttribute(basic);
    }

    @Input()
    public set popupTransition(transition:string) {
        this.config.transition = transition;
    }

    @Input()
    public set popupTransitionDuration(duration:number) {
        this.config.transitionDuration = duration;
    }

    @Input()
    public set popupPlacement(placement:PositioningPlacement) {
        this.config.placement = placement;
    }

    @Input()
    public set popupDelay(delay:number) {
        this.config.delay = delay;
    }

    @Input()
    public get popupTrigger():PopupTrigger {
        return this.config.trigger;
    }

    public set popupTrigger(trigger:PopupTrigger) {
        this.config.trigger = trigger;
    }

    @Input()
    public set popupConfig(config:PopupConfig) {
        this.config.batch(config);
    }

    // Stores reference to generated popup component.
    private _componentRef:ComponentRef<SuiPopup>;

    // Returns generated popup instance.
    private get _popup():SuiPopup {
        return this._componentRef.instance;
    }

    // `setTimeout` timer pointer for delayed popup open.
    private _openingTimeout:number;

    constructor(private _element:ElementRef,
                private _viewContainerRef:ViewContainerRef,
                private _componentFactoryResolver:ComponentFactoryResolver,
                popupDefaults:SuiPopupConfig) {

        this.config = new PopupConfig(popupDefaults);
    }

    public open():void {
        // Cancel the opening timer.
        clearTimeout(this._openingTimeout);

        // Start the popup opening after the specified delay interval.
        this._openingTimeout = window.setTimeout(
            () => {
                if (!this._componentRef) {
                    // Resolve component factory for the `SuiPopup` component.
                    const factory = this._componentFactoryResolver.resolveComponentFactory(SuiPopup);

                    // Generate a component using the view container reference and the previously resolved factory.
                    this._componentRef = this._viewContainerRef.createComponent(factory);

                    // If there is a template, inject it into the view.
                    if (this.config.template) {
                        this._popup.templateSibling.createEmbeddedView(this.config.template, { $implicit: this._popup });
                    }

                    // Configure popup with provided config, and attach a reference to the anchor element.
                    this._popup.config = this.config;
                    this._popup.anchor = this._element;

                    // Move the generated element to the body to avoid any positioning issues.
                    document.querySelector("body").appendChild(this._componentRef.location.nativeElement);

                    // When the popup is closed (onClose fires on animation complete),
                    this._popup.onClose.subscribe(() => {
                        // Destroy the component reference (which removes the popup from the DOM).
                        this._componentRef.destroy();
                        // Unset the reference pointer to enable a new popup to be created on next open.
                        this._componentRef = null;
                    });
                }

                // Start popup open transition.
                this._popup.open();

            },
            this.config.delay);
    }

    public close():void {
        // Cancel the opening timer to stop the popup opening after close has been called.
        clearTimeout(this._openingTimeout);

        if (this._componentRef) {
            // Start popup close transition.
            this._popup.close();
        }
    }

    public toggle():void {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this._popup.isOpen)) {
            return this.open();
        }

        // O'wise, close it.
        return this.close();
    }

    @HostListener("mouseenter")
    private onMouseEnter():void {
        if (this.popupTrigger === PopupTrigger.Hover) {
            this.open();
        }
    }

    @HostListener("mouseleave")
    private onMouseLeave():void {
        if (this.popupTrigger === PopupTrigger.Hover) {
            this.close();
        }
    }

    @HostListener("click")
    private onClick():void {
        if (this.popupTrigger === PopupTrigger.Click || this.popupTrigger === PopupTrigger.OutsideClick) {
            // Repeated clicks require a toggle, rather than just opening the popup each time.
            this.toggle();
        }
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(e:MouseEvent):void {
        // If the popup trigger is outside click,
        if (this._componentRef && this.popupTrigger === PopupTrigger.OutsideClick) {
            const target = e.target as Element;
            // Close the popup if the click is outside of the popup element.
            if (!(this._element.nativeElement as Element).contains(target)) {
                this.close();
            }
        }
    }

    @HostListener("focus")
    private onFocus():void {
        if (this.popupTrigger === PopupTrigger.Focus) {
            this.open();
        }
    }

    @HostListener("focusout")
    private onFocusOut():void {
        if (this.popupTrigger === PopupTrigger.Focus) {
            this.close();
        }
    }
}
