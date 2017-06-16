import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, Type, ReflectiveInjector } from "@angular/core";
import { ModalConfig, TemplateModalConfig, ComponentModalConfig } from "./modal-config";
import { SuiModal } from "./modal";
import { Modal } from "./modal-controls";
import { ActiveModal, SuiActiveModal } from "./active-modal";
import { SuiComponentFactory } from "../util/component-factory.service";

@Injectable()
export class SuiModalService {
    constructor(private _componentFactory:SuiComponentFactory) {}

    public open<T, U, V>(modal:ModalConfig<T, U, V>):SuiActiveModal<T, U, V> {
        // Generate the modal component to be shown.
        const componentRef = this._componentFactory.createComponent<SuiModal<U, V>>(SuiModal);

        // Shorthand for the created modal component instance.
        const modalComponent = componentRef.instance;

        if (modal instanceof TemplateModalConfig) {
            // Inject the template into the view.
            this._componentFactory.createView(modalComponent.templateSibling, modal.template, {
                // `let-context`
                $implicit: modal.context,
                // `let-modal="modal"`
                modal: componentRef.instance.controls
            });
        } else if (modal instanceof ComponentModalConfig) {
            // Generate the component to be used as the modal content,
            // injecting an instance of `Modal` to be used in the component constructor.
            const contentComponentRef = this._componentFactory.createComponent(
                modal.component,
                [
                    {
                        provide: Modal,
                        useValue: new Modal(modalComponent.controls, modal.context)
                    }
                ]
            );

            // Insert the new component into the content of the modal.
            this._componentFactory.attachToView(contentComponentRef, modalComponent.templateSibling);

            // Shorthand for access to the content component's DOM element.
            const contentElement = contentComponentRef.location.nativeElement as Element;

            // Move all of the DOM elements inside the component to the main modal element.
            // This is done so that CSS classes apply correctly. It does stop any custom styles from working however,
            // so other ways may have to be investigated.
            while (contentElement.hasChildNodes()) {
                contentElement.parentElement.appendChild(contentElement.removeChild(contentElement.firstChild));
            }
            // Remove the generated component's 'empty shell' from the DOM.
            contentElement.remove();
        }

        // Remove the template div from the DOM. This is to fix some styling issues.
        const templateElement = modalComponent.templateSibling.element.nativeElement as Element;
        templateElement.remove();

        this._componentFactory.attachToApplication(componentRef);
        this._componentFactory.moveToDocumentBody(componentRef);

        // Initialise the generated modal with the provided config.
        modalComponent.loadConfig(modal);

        // Return an instance of an `ActiveModal`, so the user can control the new modal.
        return new ActiveModal(modal, componentRef);
    }
}
