import { ComponentRef, ElementRef, HostListener, OnDestroy, Renderer2 } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/internal";
import { PopupConfig, PopupTrigger, IPopupConfig } from "./popup-config";
import { SuiPopup } from "../components/popup";
import { IPopupLifecycle } from "./popup-lifecycle";

export interface IPopup {
    open():void;
    close():void;
    toggle():void;
}

export abstract class SuiPopupController implements IPopup, OnDestroy {
    // Stores reference to generated popup component.
    private _componentRef:ComponentRef<SuiPopup>;

    // Returns generated popup instance.
    public get popup():SuiPopup {
        // Use non-null assertion as we only access this when a popup exists.
        return this._componentRef.instance;
    }

    // `setTimeout` timer pointer for delayed popup open.
    private _openingTimeout:number;

    // Function to remove the document click handler.
    private _documentListener:(() => void) | undefined;

    constructor(protected _renderer:Renderer2,
                protected _element:ElementRef,
                protected _componentFactory:SuiComponentFactory,
                config:PopupConfig) {

        // Generate a new SuiPopup component and attach it to the application view.
        this._componentRef = this._componentFactory.createComponent(SuiPopup);

        // Configure popup with provided config.
        this.popup.config = config;

        // When the popup is closed (onClose fires on animation complete),
        this.popup.onClose.subscribe(() => this.cleanup());
    }

    public configure(config?:IPopupConfig):void {
        if (config) {
            Object.assign(this.popup.config, config);
        }
    }

    public openDelayed():void {
        // Cancel the opening timer.
        clearTimeout(this._openingTimeout);

        // Start the popup opening after the specified delay interval.
        this._openingTimeout = window.setTimeout(() => this.open(), this.popup.config.delay);
    }

    public open():void {
        // Attach the generated component to the current application.
        this._componentFactory.attachToApplication(this._componentRef);

        if (this.popup.config.isInline) {
            this._componentFactory.moveToElement(this._componentRef, this._element.nativeElement.parentElement);
        } else {
            // Move the generated element to the body to avoid any positioning issues.
            this._componentFactory.moveToDocumentBody(this._componentRef);
        }

        // Attach a reference to the anchor element. We do it here because IE11 loves to complain.
        this.popup.anchor = this._element;

        // Add a listener to the document body to handle closing.
        this._documentListener = this._renderer
            .listen("document", "click", (e:MouseEvent) =>
                this.onDocumentClick(e));

        // Start popup open transition.
        this.popup.open();

        // Call lifecyle hook
        const lifecycle = (this as IPopupLifecycle).popupOnOpen;
        if (lifecycle) {
            lifecycle.call(this);
        }
    }

    public close():void {
        // Cancel the opening timer to stop the popup opening after close has been called.
        clearTimeout(this._openingTimeout);

        if (this._componentRef) {
            // Start popup close transition.
            this.popup.close();
        }

        // Call lifecyle hook
        const lifecycle = (this as IPopupLifecycle).popupOnClose;
        if (lifecycle) {
            lifecycle.call(this);
        }
    }

    public toggleDelayed():void {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this.popup.isOpen)) {
            return this.openDelayed();
        }

        // O'wise, close it.
        return this.close();
    }

    public toggle():void {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this.popup.isOpen)) {
            return this.open();
        }

        // O'wise, close it.
        return this.close();
    }

    @HostListener("mouseenter")
    public onMouseEnter():void {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.openDelayed();
        }
    }

    @HostListener("mouseleave")
    public onMouseLeave():void {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.close();
        }
    }

    @HostListener("click")
    public onClick():void {
        if (this.popup.config.trigger === PopupTrigger.Click ||
            this.popup.config.trigger === PopupTrigger.OutsideClick) {

            // Repeated clicks require a toggle, rather than just opening the popup each time.
            this.toggleDelayed();
        } else if (this.popup.config.trigger === PopupTrigger.Focus &&
                   (!this._componentRef || (this._componentRef && !this.popup.isOpen))) {
            // Repeated clicks with a focus trigger requires an open (as focus isn't ever lost on repeated click).
            this.openDelayed();
        }
    }

    private onDocumentClick(e:MouseEvent):void {
        // If the popup trigger is outside click,
        if (this._componentRef && this.popup.config.trigger === PopupTrigger.OutsideClick) {
            const target = e.target as Element;
            // Close the popup if the click is outside of the popup element.
            if (!(this._element.nativeElement as Element).contains(target)) {
                this.close();
            }
        }
    }

    @HostListener("focusin")
    public onFocusIn():void {
        if (this.popup.config.trigger === PopupTrigger.Focus) {
            this.openDelayed();
        }
    }

    @HostListener("focusout", ["$event"])
    public onFocusOut(e:any):void {
        if (!this._element.nativeElement.contains(e.relatedTarget) &&
            !this.popup.elementRef.nativeElement.contains(e.relatedTarget) &&
            this.popup.config.trigger === PopupTrigger.Focus) {

            this.close();
        }
    }

    protected cleanup():void {
        clearTimeout(this._openingTimeout);

        if (this._componentRef.instance && this._componentRef.instance.positioningService) {
            this._componentRef.instance.positioningService.destroy();
        }

        this._componentFactory.detachFromApplication(this._componentRef);

        if (this._documentListener) {
            this._documentListener();
        }
    }

    public ngOnDestroy():void {
        this.cleanup();
    }
}
