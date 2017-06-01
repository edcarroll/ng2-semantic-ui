export type ModalResult<T> = (result:T) => void;

export class ModalControls<T, U> {
    constructor(approve:ModalResult<T>, deny:ModalResult<U>, context:T = null) {
        this.approve = approve;
        this.deny = deny;
    }

    public approve(result:T):void {};
    public deny(result:U):void {};
}

export class Modal<T, U, V> extends ModalControls<U, V> {
    public context:T;

    constructor(controls:ModalControls<U, V>, context:T) {
        super(controls.approve, controls.deny);
        
        this.context = context;
    }
}