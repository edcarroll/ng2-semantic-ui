import { TemplateRef } from "@angular/core";
import { ModalControls } from "./modal-controls";

// Shorthand for a modal template. Sets up ability to write: `<ng-template let-context let-modal="modal">...</ng-template>`
// We use an abstract class as ModalTemplate tends to be used within decorated properties, which means it needs to exist!
export abstract class ModalTemplate<T, U, V> extends TemplateRef<{ $implicit:T; modal:ModalControls<U, V> }> {}
