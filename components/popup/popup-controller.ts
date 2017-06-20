import {
    ComponentRef, ElementRef, ViewContainerRef, ComponentFactoryResolver,
    HostListener, EventEmitter, Type, OnDestroy
} from "@angular/core";
import { PopupConfig, PopupTrigger } from "./popup-config";
import { SuiPopup } from "./popup";
import { SuiPopupConfig } from "./popup.service";
import { SuiComponentFactory } from "../util/services/component-factory.service";

export interface IPopup {
    open():void;
    close():void;
    toggle():void;
}

export abstract class SuiPopupController<T = undefined> implements IPopup, OnDestroy {
    // Stores reference to generated popup component.
    private _componentRef:ComponentRef<SuiPopup>;

    // Stores reference to generated content component.
    protected _contentComponentRef?:ComponentRef<T>;

    // Returns generated popup instance.
    public get popup():SuiPopup {
        // Use non-null assertion as we only access this when a popup exists.
        return this._componentRef.instance;
    }

    // `setTimeout` timer pointer for delayed popup open.
    private _openingTimeout:number;

    constructor(private _element:ElementRef,
                private _componentFactory:SuiComponentFactory,
                config:PopupConfig) {

        // Generate a new SuiPopup component and attach it to the application view.
        this._componentRef = this._componentFactory.createComponent(SuiPopup);
        this._componentFactory.attachToApplication(this._componentRef);
        this._componentFactory.detachFromDocument(this._componentRef);

        // Configure popup with provided config, and attach a reference to the anchor element.
        this.popup.config = config;
        this.popup.anchor = this._element;

        // When the popup is closed (onClose fires on animation complete),
        this.popup.onClose.subscribe(() => {
            if (this._contentComponentRef) {
                this._contentComponentRef.destroy();
                this._contentComponentRef = undefined;
            }
            this._componentFactory.detachFromDocument(this._componentRef);
        });
    }

    public open():void {
        // Cancel the opening timer.
        clearTimeout(this._openingTimeout);

        // Start the popup opening after the specified delay interval.
        this._openingTimeout = window.setTimeout(
            () => {
                // If there is a template, inject it into the view.
                this.popup.templateSibling.clear();
                if (this.popup.config.template) {
                    this._componentFactory.createView(this.popup.templateSibling, this.popup.config.template, {
                        $implicit: this.popup
                    });
                } else if (this.popup.config.component) {
                    this._contentComponentRef = this._componentFactory.createComponent(this.popup.config.component as Type<T>);
                    this._componentFactory.attachToView(this._contentComponentRef, this.popup.templateSibling);
                }

                // Move the generated element to the body to avoid any positioning issues.
                this._componentFactory.moveToDocumentBody(this._componentRef);

                // Start popup open transition.
                this.popup.open();

            },
            this.popup.config.delay);
    }

    public close():void {
        // Cancel the opening timer to stop the popup opening after close has been called.
        clearTimeout(this._openingTimeout);

        if (this._componentRef) {
            // Start popup close transition.
            this.popup.close();
        }
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
    private onMouseEnter():void {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.open();
        }
    }

    @HostListener("mouseleave")
    private onMouseLeave():void {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.close();
        }
    }

    @HostListener("click")
    private onClick():void {
        if (this.popup.config.trigger === PopupTrigger.Click ||
            this.popup.config.trigger === PopupTrigger.OutsideClick) {

            // Repeated clicks require a toggle, rather than just opening the popup each time.
            this.toggle();
        }
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(e:MouseEvent):void {
        // If the popup trigger is outside click,
        if (this._componentRef && this.popup.config.trigger === PopupTrigger.OutsideClick) {
            const target = e.target as Element;
            // Close the popup if the click is outside of the popup element.
            if (!(this._element.nativeElement as Element).contains(target)) {
                this.close();
            }
        }
    }

    @HostListener("focus")
    private onFocus():void {
        if (this.popup.config.trigger === PopupTrigger.Focus) {
            this.open();
        }
    }

    @HostListener("focusout")
    private onFocusOut():void {
        if (this.popup.config.trigger === PopupTrigger.Focus) {
            this.close();
        }
    }

    public ngOnDestroy():void {
        this._componentRef.destroy();
    }
}
