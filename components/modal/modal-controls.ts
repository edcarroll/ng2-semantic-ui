// Shorthand to avoid writing arrow types everywhere.
export type ModalResult<T> = (result:T) => void;

// Used to pass ability to control a modal to a component.
export class ModalControls<T, U> {
    constructor(approve:ModalResult<T>, deny:ModalResult<U>) {
        this.approve = approve;
        this.deny = deny;
    }

    // Use method here rather than arrow variables to make intellisense show they're methods.
    public approve(result:T):void {}
    public deny(result:U):void {}
}

// Injected into custom modal components, to allow control of the modal, and access to a context object.
export class Modal<T, U = undefined, V = undefined> extends ModalControls<U, V> {
    public context:T;

    constructor(controls:ModalControls<U, V>, context:T) {
        // Instances of `ModalControls` are only created in the `SuiModal` constructor,
        // so we take an initialised instance rather than remaking one each time.
        super(controls.approve, controls.deny);

        this.context = context;
    }
}
