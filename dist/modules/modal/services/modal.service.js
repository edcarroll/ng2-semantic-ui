import { Injectable } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/index";
import { TemplateModalConfig, ComponentModalConfig } from "../classes/modal-config";
import { SuiModal } from "../components/modal";
import { Modal } from "../classes/modal-controls";
import { ActiveModal } from "../classes/active-modal";
var SuiModalService = /** @class */ (function () {
    function SuiModalService(_componentFactory) {
        this._componentFactory = _componentFactory;
    }
    SuiModalService.prototype.open = function (modal) {
        // Generate the modal component to be shown.
        var componentRef = this._componentFactory.createComponent(SuiModal);
        // Shorthand for the created modal component instance.
        var modalComponent = componentRef.instance;
        if (modal instanceof TemplateModalConfig) {
            // Inject the template into the view.
            this._componentFactory.createView(modalComponent.templateSibling, modal.template, {
                // `let-context`
                $implicit: modal.context,
                // `let-modal="modal"`
                modal: componentRef.instance.controls
            });
        }
        else if (modal instanceof ComponentModalConfig) {
            // Generate the component to be used as the modal content,
            // injecting an instance of `Modal` to be used in the component constructor.
            var contentComponentRef = this._componentFactory.createComponent(modal.component, [
                {
                    provide: Modal,
                    useValue: new Modal(modalComponent.controls, modal.context)
                }
            ]);
            // Insert the new component into the content of the modal.
            this._componentFactory.attachToView(contentComponentRef, modalComponent.templateSibling);
            // Shorthand for access to the content component's DOM element.
            var contentElement = contentComponentRef.location.nativeElement;
            // Move all of the DOM elements inside the component to the main modal element.
            // This is done so that CSS classes apply correctly. It does stop any custom styles from working however,
            // so other ways may have to be investigated.
            while (contentElement.hasChildNodes() && contentElement.parentElement && contentElement.firstChild) {
                contentElement.parentElement.appendChild(contentElement.removeChild(contentElement.firstChild));
            }
            // Remove the generated component's 'empty shell' from the DOM.
            this._componentFactory.detachFromDocument(contentComponentRef);
        }
        // Attach the new modal component to the application.
        // The component will move itself to the document body for correctl styling.
        this._componentFactory.attachToApplication(componentRef);
        // Initialise the generated modal with the provided config.
        modalComponent.loadConfig(modal);
        // Return an instance of an `ActiveModal`, so the user can control the new modal.
        return new ActiveModal(modal, componentRef);
    };
    SuiModalService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SuiModalService.ctorParameters = function () { return [
        { type: SuiComponentFactory, },
    ]; };
    return SuiModalService;
}());
export { SuiModalService };
//# sourceMappingURL=modal.service.js.map