import { TemplateRef } from "@angular/core";
import { ModalControls } from "./modal-controls";
export declare abstract class ModalTemplate<T, U, V> extends TemplateRef<{
    $implicit: T;
    modal: ModalControls<U, V>;
}> {
}
