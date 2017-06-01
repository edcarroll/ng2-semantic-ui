import {TemplateRef} from '@angular/core';
import {ModalControls} from './modal-controls';

export type ModalTemplate<T, U, V> = TemplateRef<{ $implicit: T, modal: ModalControls<U, V> }>;