import {ModalConfig} from "./modal-config";
import {SuiModal} from "./modal";
import {ComponentRef} from "@angular/core";

// Helper class to support method chaining when calling `SuiModalService.open(...)`.
export class ActiveModal<T, U, V> {
    private _config:ModalConfig<T, U, V>;
    private _componentRef:ComponentRef<SuiModal<U, V>>;

    // Shorthand for direct access to the `SuiModal` instance.
    public get component() {
        return this._componentRef.instance;
    }

    constructor(instance:ModalConfig<T, U, V>, componentRef:ComponentRef<SuiModal<U, V>>) {
        this._config = instance;
        this._componentRef = componentRef;

        // Automatically destroy the modal component when it has been dismissed.
        this.component.onDismiss.subscribe(() => this._componentRef.destroy());
    }

    // Registers a callback for when `onApprove` is fired.
    public onApprove(callback:(result:U) => void) {
        this.component.onApprove.subscribe((res:U) => callback(res));
        return this;
    }

    // Registers a callback for when `onDeny` is fired.
    public onDeny(callback:(result:V) => void) {
        this.component.onDeny.subscribe((res:V) => callback(res));
        return this;
    }

    // Fires the approve event of the modal manually.
    public approve(result:U) {
        this.component.approve(result);
    }

    // Fires the deny event of the modal manually.
    public deny(result:V) {
        this.component.deny(result);
    }

    // Removes the modal component instantly, without transitions or firing any events.
    public destroy() {
        this._componentRef.destroy();
    }
}
