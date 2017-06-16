import { ModalConfig } from "./modal-config";
import { SuiModal } from "./modal";
import { ComponentRef } from "@angular/core";

export abstract class SuiActiveModal<T, U, V> {
    public abstract onApprove(callback:(result:U) => void):SuiActiveModal<T, U, V>;
    public abstract onDeny(callback:(result:V) => void):SuiActiveModal<T, U, V>;

    public abstract approve(result:U):void;
    public abstract deny(result:V):void;

    public abstract destroy():void;
}

// Helper class to support method chaining when calling `SuiModalService.open(...)`.
export class ActiveModal<T, U, V> implements SuiActiveModal<T, U, V> {
    public config:ModalConfig<T, U, V>;
    public componentRef:ComponentRef<SuiModal<U, V>>;

    // Shorthand for direct access to the `SuiModal` instance.
    public get component():SuiModal<U, V> {
        return this.componentRef.instance;
    }

    constructor(instance:ModalConfig<T, U, V>, componentRef:ComponentRef<SuiModal<U, V>>) {
        this.config = instance;
        this.componentRef = componentRef;

        // Automatically destroy the modal component when it has been dismissed.
        this.component.onDismiss.subscribe(() => this.componentRef.destroy());
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
        this.componentRef.destroy();
    }
}
