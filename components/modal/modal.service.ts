import {Injectable, ApplicationRef, ComponentFactoryResolver, Injector} from '@angular/core';
import {ModalInstance} from './modal-instance';
import {SuiModal} from './modal';

@Injectable()
export class SuiModalService {
    constructor(private _applicationRef:ApplicationRef, private _componentFactoryResolver:ComponentFactoryResolver, private _injector:Injector) {}

    public open<T>(modal:ModalInstance<T>) {
        const factory = this._componentFactoryResolver.resolveComponentFactory(SuiModal);

        // Generate a component using the view container reference and the previously resolved factory.
        const componentRef = factory.create(this._injector);

        this._applicationRef.attachView(componentRef.hostView);

        document.querySelector("body").appendChild(componentRef.location.nativeElement);

        componentRef.instance.templateSibling.createEmbeddedView(modal.template, { $implicit: modal.context, modal: componentRef.instance });

        console.log(componentRef.instance.templateSibling);
    }
}