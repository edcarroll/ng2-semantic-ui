import {ModalConfig} from './modal-config';
import {SuiModal} from './modal';

// Helper class to support method chaining when calling `SuiModalService.open(...)`.
export class ActiveModal<T, U, V> {
    private _config:ModalConfig<T, U, V>;
    public component:SuiModal<U, V>;

    constructor(instance:ModalConfig<T, U, V>, component:SuiModal<U, V>) {
        this._config = instance;
        this.component = component;
    }

    public onApprove(callback:(result:U) => void) {
        this.component.onApprove.subscribe((res:U) => callback(res));
        return this;
    }

    public onDeny(callback:(result:V) => void) {
        this.component.onDeny.subscribe((res:V) => callback(res));
        return this;
    }

    public approve(result:U) {
        this.component.approve(result);
    }

    public deny(result:V) {
        this.component.deny(result);
    }
}