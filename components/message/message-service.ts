import { Injectable, ComponentRef } from "@angular/core";
import { SuiComponentFactory } from "../util/component-factory.service";
import { SuiMessageGlobalContainer } from "./message-global-container";
import { MessageController } from "./message-controller";

@Injectable()
export class SuiMessageService {
    private _controller:MessageController;
    private _containerRef:ComponentRef<SuiMessageGlobalContainer>;

    private get _container():SuiMessageGlobalContainer {
        return this._containerRef.instance;
    }

    constructor(private _componentFactory:SuiComponentFactory) {
        this._controller = new MessageController();

        this._containerRef = this._componentFactory.createComponent(SuiMessageGlobalContainer);
        this._container.controller = this._controller;

        this._componentFactory.attachToApplication(this._containerRef);
        this._componentFactory.moveToDocumentBody(this._containerRef);
    }
}
