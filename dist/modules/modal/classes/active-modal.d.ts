import { ComponentRef } from "@angular/core";
import { ModalConfig } from "./modal-config";
import { SuiModal } from "../components/modal";
export declare class ActiveModal<T, U, V> {
    private _config;
    private _componentRef;
    readonly component: SuiModal<U, V>;
    constructor(instance: ModalConfig<T, U, V>, componentRef: ComponentRef<SuiModal<U, V>>);
    onApprove(callback: (result: U) => void): ActiveModal<T, U, V>;
    onDeny(callback: (result: V) => void): ActiveModal<T, U, V>;
    approve(result: U): void;
    deny(result: V): void;
    destroy(): void;
}
