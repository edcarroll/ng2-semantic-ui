import {TemplateRef} from '@angular/core';
import {ModalControls} from './modal-controls';

// Shorthand for a modal template. Sets up ability to write: `<ng-template let-context let-modal="modal">...</ng-template>`
export type ModalTemplate<T, U, V> = TemplateRef<{ $implicit: T, modal: ModalControls<U, V> }>;