import {ModalInstance} from './modal-instance';
import {SuiModal} from './modal';

// Helper class to support method chaining when calling `SuiModalService.open(...)`.
export class OpenModal<T, U, V> {
    instance:ModalInstance<T, U, V>;
    component:SuiModal<U, V>;

    constructor(instance:ModalInstance<T, U, V>, component:SuiModal<U, V>) {
        this.instance = instance;
        this.component = component;
    }

    public onApprove(callback:(result:U) => void) {
        this.instance.onApprove = callback;
        this.component.onApprove.subscribe((res:U) => this.instance.onApprove(res));
        return this;
    }

    public onDeny(callback:(result:V) => void) {
        this.instance.onDeny = callback;
        this.component.onDeny.subscribe((res:V) => this.instance.onDeny(res));
        return this;
    }
}