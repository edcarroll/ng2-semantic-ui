import {Injectable, ApplicationRef, ComponentFactoryResolver, Injector, Type, ReflectiveInjector} from '@angular/core';
import {ModalInstance, TemplateModalInstance, ComponentModalInstance} from './modal-instance';
import {SuiModal} from './modal';
import {Modal} from './modal-controls';
import {OpenModal} from './open-modal';

@Injectable()
export class SuiModalService {
    constructor(private _applicationRef:ApplicationRef, private _componentFactoryResolver:ComponentFactoryResolver, private _injector:Injector) {}

    public open<T, U, V>(modal:ModalInstance<T, U, V>) {
        const factory = this._componentFactoryResolver.resolveComponentFactory<SuiModal<U, V>>(SuiModal);

        // Generate a component using the view container reference and the previously resolved factory.
        const componentRef = factory.create(this._injector);
        const modalComponent = componentRef.instance;

        if (modal instanceof TemplateModalInstance) {
            componentRef.instance.templateSibling.createEmbeddedView(modal.template, { $implicit: modal.context, modal: componentRef.instance.controls });
        }
        else if (modal instanceof ComponentModalInstance) {
            const contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(modal.component as Type<{}>);

            const modalContentInjector = ReflectiveInjector.resolveAndCreate(
                [
                    {
                        provide: Modal,
                        useValue: new Modal(modalComponent.controls, modal.context)
                    }
                ], this._injector);

            const internalComponentRef = contentCmptFactory.create(modalContentInjector);

            modalComponent.templateSibling.insert(internalComponentRef.hostView);

            const el = internalComponentRef.location.nativeElement as Element;
            while (el.hasChildNodes()) {
                el.parentElement.appendChild(el.removeChild(el.firstChild));
            }
            el.remove();
        }

        this._applicationRef.attachView(componentRef.hostView);

        document.querySelector("body").appendChild(componentRef.location.nativeElement);

        modal.approve = modalComponent.approve;
        modal.deny = modalComponent.deny;

        modalComponent.onDismiss.subscribe(() => componentRef.destroy());

        modalComponent.isClosable = modal.isClosable;
        modalComponent.closeResult = modal.closeResult;
        modalComponent.transition = modal.transition;
        modalComponent.transitionDuration = modal.transitionDuration;

        return new OpenModal(modal, modalComponent);
    }
}