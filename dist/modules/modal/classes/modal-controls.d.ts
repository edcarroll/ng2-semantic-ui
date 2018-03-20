export declare type ModalResult<T> = (result: T) => void;
export declare class ModalControls<T, U> {
    constructor(approve: ModalResult<T>, deny: ModalResult<U>);
    approve(result: T): void;
    deny(result: U): void;
}
export declare class Modal<T, U = undefined, V = undefined> extends ModalControls<U, V> {
    context: T;
    constructor(controls: ModalControls<U, V>, context: T);
}
