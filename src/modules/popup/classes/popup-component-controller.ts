import { ComponentRef, ElementRef, Type, Renderer2, OnDestroy } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/index";
import { SuiPopupController } from "./popup-controller";
import { PopupConfig } from "./popup-config";

export class SuiPopupComponentController<T> extends SuiPopupController implements OnDestroy {
    // Stores reference to generated content component.
    private _contentComponentRef?:ComponentRef<T>;

    public get componentInstance():T | undefined {
        if (this._contentComponentRef) {
            return this._contentComponentRef.instance;
        }
    }

    constructor(renderer:Renderer2,
                element:ElementRef,
                componentFactory:SuiComponentFactory,
                private _component:Type<T>,
                config:PopupConfig) {

        super(renderer, element, componentFactory, config);

        this.popup.onClose.subscribe(() => {
            if (this._contentComponentRef) {
                this._contentComponentRef.destroy();
                this._contentComponentRef = undefined;
            }
        });
    }

    public open():void {
        if (!this._contentComponentRef) {
            this._contentComponentRef = this._componentFactory.createComponent(this._component as Type<T>);
            this._componentFactory.attachToView(this._contentComponentRef, this.popup.templateSibling);
        }

        super.open();
    }

    public ngOnDestroy():void {
        if (this._contentComponentRef) {
            this._contentComponentRef.destroy();
        }

        super.ngOnDestroy();
    }
}
