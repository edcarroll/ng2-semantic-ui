export interface PopupAfterOpen {
    popupOnOpen(): void;
}
export interface PopupAfterClose {
    popupOnClose(): void;
}
export interface IPopupLifecycle {
    popupOnOpen?(): void;
    popupOnClose?(): void;
}
