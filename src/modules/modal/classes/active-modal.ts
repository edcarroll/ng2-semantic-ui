import { ComponentRef } from "@angular/core";
import { ModalConfig } from "./modal-config";
import { SuiModal } from "../components/modal";

// Helper class to support method chaining when calling `SuiModalService.open(...)`.
export class ActiveModal<T, U, V> {
    private _config:ModalConfig<T, U, V>;
    private _componentRef:ComponentRef<SuiModal<U, V>>;

    // Shorthand for direct access to the `SuiModal` instance.
    public get component():SuiModal<U, V> {
        return this._componentRef.instance;
    }

    constructor(instance:ModalConfig<T, U, V>, componentRef:ComponentRef<SuiModal<U, V>>) {
        this._config = instance;
        this._componentRef = componentRef;

        // Automatically destroy the modal component when it has been dismissed.
        this.component.onDismiss.subscribe(() => this._componentRef.destroy());
    }

    // Registers a callback for when `onApprove` is fired.
    public onApprove(callback:(result:U) => void):ActiveModal<T, U, V> {
        this.component.onApprove.subscribe((res:U) => callback(res));
        return this;
    }

    // Registers a callback for when `onDeny` is fired.
    public onDeny(callback:(result:V) => void):ActiveModal<T, U, V> {
        this.component.onDeny.subscribe((res:V) => callback(res));
        return this;
    }

    // Fires the approve event of the modal manually.
    public approve(result:U):void {
        this.component.approve(result);
    }

    // Fires the deny event of the modal manually.
    public deny(result:V):void {
        this.component.deny(result);
    }

    // Removes the modal component instantly, without transitions or firing any events.
    public destroy():void {
        this._componentRef.destroy();
    }
}
