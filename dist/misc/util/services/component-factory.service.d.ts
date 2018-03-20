import { ApplicationRef, ComponentFactoryResolver, Injector, ComponentRef, Provider, Type, ViewContainerRef, TemplateRef } from "@angular/core";
export interface IImplicitContext<T> {
    $implicit?: T;
}
export declare class SuiComponentFactory {
    private _applicationRef;
    private _componentFactoryResolver;
    private _injector;
    constructor(_applicationRef: ApplicationRef, _componentFactoryResolver: ComponentFactoryResolver, _injector: Injector);
    createComponent<T>(type: Type<T>, providers?: Provider[]): ComponentRef<T>;
    createView<T, U extends IImplicitContext<T>>(viewContainer: ViewContainerRef, template: TemplateRef<U>, context: U): void;
    attachToView<T>(componentRef: ComponentRef<T>, viewContainer: ViewContainerRef): void;
    attachToApplication<T>(componentRef: ComponentRef<T>): void;
    detachFromApplication<T>(componentRef: ComponentRef<T>): void;
    moveToElement<T>(componentRef: ComponentRef<T>, element: Element): void;
    moveToDocumentBody<T>(componentRef: ComponentRef<T>): void;
    detachFromDocument<T>(componentRef: ComponentRef<T>): void;
}
