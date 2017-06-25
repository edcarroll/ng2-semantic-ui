// tslint:disable-next-line:ext-variable-name
export interface PopupAfterOpen {
    popupOnOpen():void;
}

// tslint:disable-next-line:ext-variable-name
export interface PopupAfterClose {
    popupOnClose():void;
}

export interface IPopupLifecycle {
    popupOnOpen?():void;
    popupOnClose?():void;
}
