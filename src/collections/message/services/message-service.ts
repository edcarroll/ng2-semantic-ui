import { Injectable, ComponentRef } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/index";
import { SuiMessageGlobalContainer, MessagePosition } from "../components/message-global-container";
import { MessageController, IMessageController } from "../classes/message-controller";
import { MessageConfig } from "../classes/message-config";
import { SuiActiveMessage } from "../classes/active-message";

@Injectable()
export class SuiMessageService implements IMessageController {
    private _controller:MessageController;
    private _containerRef:ComponentRef<SuiMessageGlobalContainer>;

    private get _container():SuiMessageGlobalContainer {
        return this._containerRef.instance;
    }

    public get position():MessagePosition {
        return this._container.position;
    }

    public set position(position:MessagePosition) {
        this._container.position = position;
    }

    public get width():number {
        return this._container.width;
    }

    public set width(width:number) {
        this._container.width = width;
    }

    public get maxShown():number {
        return this._controller.maxShown;
    }

    public set maxShown(max:number) {
        this._controller.maxShown = max;
    }

    public get isNewestOnTop():boolean {
        return this._controller.isNewestOnTop;
    }

    public set isNewestOnTop(value:boolean) {
        this._controller.isNewestOnTop = value;
    }

    constructor(private _componentFactory:SuiComponentFactory) {
        this._controller = new MessageController();

        this._containerRef = this._componentFactory.createComponent(SuiMessageGlobalContainer);
        this._container.controller = this._controller;

        this._componentFactory.attachToApplication(this._containerRef);
        this._componentFactory.moveToDocumentBody(this._containerRef);

        this.position = MessagePosition.TopRight;
        this.width = 480;
    }

    public show(config:MessageConfig):SuiActiveMessage {
        return this._controller.show(config);
    }

    public dismissAll():void {
        return this._controller.dismissAll();
    }
}
