import { ComponentRef, ElementRef, Type } from "@angular/core";
import { SuiPopupController } from "./popup-controller";
import { SuiComponentFactory } from "../../util/services/component-factory.service";
import { PopupConfig } from "./popup-config";

export class SuiPopupComponentController<T> extends SuiPopupController {
    // Stores reference to generated content component.
    private _contentComponentRef?:ComponentRef<T>;

    public get componentInstance():T | undefined {
        if (this._contentComponentRef) {
            return this._contentComponentRef.instance;
        }
    }

    constructor(element:ElementRef,
                componentFactory:SuiComponentFactory,
                private _component:Type<T>,
                config:PopupConfig) {

        super(element, componentFactory, config);

        this.popup.onClose.subscribe(() => {
            if (this._contentComponentRef) {
                this._contentComponentRef.destroy();
                this._contentComponentRef = undefined;
            }
        });
    }

    public open():void {
        this._contentComponentRef = this._componentFactory.createComponent(this._component as Type<T>);
        this._componentFactory.attachToView(this._contentComponentRef, this.popup.templateSibling);

        super.open();
    }
}
