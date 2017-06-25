import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, Type, ReflectiveInjector } from "@angular/core";
import { ModalConfig, TemplateModalConfig, ComponentModalConfig } from "./modal-config";
import { SuiModal } from "./modal";
import { Modal } from "./modal-controls";
import { ActiveModal } from "./active-modal";

@Injectable()
export class SuiModalService {
    constructor(private _applicationRef:ApplicationRef,
                private _componentFactoryResolver:ComponentFactoryResolver,
                private _injector:Injector) {}

    public open<T, U, V>(modal:ModalConfig<T, U, V>):ActiveModal<T, U, V> {
        // Resolve factory for creating `SuiModal` components.
        const factory = this._componentFactoryResolver.resolveComponentFactory<SuiModal<U, V>>(SuiModal);

        // Generate a component using the injector and the previously resolved factory.
        const componentRef = factory.create(this._injector);
        // Shorthand for the created modal component instance.
        const modalComponent = componentRef.instance;

        if (modal instanceof TemplateModalConfig) {
            // Inject the template into the view.
            componentRef.instance.templateSibling.createEmbeddedView(modal.template, {
                // `let-context`
                $implicit: modal.context,
                // `let-modal="modal"`
                modal: componentRef.instance.controls
            });
        } else if (modal instanceof ComponentModalConfig) {
            // Resolve factory for creating a new instance of the provided component.
            const contentComponentFactory = this._componentFactoryResolver.resolveComponentFactory(modal.component as Type<{}>);

            // Provide an instance of `Modal` for the injector, to be used in the component constructor.
            const modalContentInjector = ReflectiveInjector.resolveAndCreate(
                [
                    {
                        provide: Modal,
                        useValue: new Modal(modalComponent.controls, modal.context)
                    }
                ],
                this._injector
            );

            // Generate a component using the custom injector and the previously resolved factory.
            const contentComponentRef = contentComponentFactory.create(modalContentInjector);

            // Insert the new component into the content of the modal.
            modalComponent.templateSibling.insert(contentComponentRef.hostView);

            // Shorthand for access to the content component's DOM element.
            const contentElement = contentComponentRef.location.nativeElement as Element;

            // Move all of the DOM elements inside the component to the main modal element.
            // This is done so that CSS classes apply correctly. It does stop any custom styles from working however,
            // so other ways may have to be investigated.
            while (contentElement.hasChildNodes() && contentElement.parentElement && contentElement.firstChild) {
                contentElement.parentElement.appendChild(contentElement.removeChild(contentElement.firstChild));
            }
            // Remove the generated component's 'empty shell' from the DOM.
            contentElement.remove();
        }

        // Attach the new modal component to the application.
        // The component will move itself to the document body for correctl styling.
        this._applicationRef.attachView(componentRef.hostView);

        // Initialise the generated modal with the provided config.
        modalComponent.loadConfig(modal);

        // Return an instance of an `ActiveModal`, so the user can control the new modal.
        return new ActiveModal(modal, componentRef);
    }
}
