import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, ReflectiveInjector } from "@angular/core";
var SuiComponentFactory = /** @class */ (function () {
    function SuiComponentFactory(_applicationRef, _componentFactoryResolver, _injector) {
        this._applicationRef = _applicationRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._injector = _injector;
    }
    SuiComponentFactory.prototype.createComponent = function (type, providers) {
        if (providers === void 0) { providers = []; }
        // Resolve a factory for creating components of type `type`.
        var factory = this._componentFactoryResolver.resolveComponentFactory(type);
        // Resolve and create an injector with the specified providers.
        var injector = ReflectiveInjector.resolveAndCreate(providers, this._injector);
        // Create a component using the previously resolved factory & injector.
        var componentRef = factory.create(injector);
        return componentRef;
    };
    SuiComponentFactory.prototype.createView = function (viewContainer, template, context) {
        viewContainer.createEmbeddedView(template, context);
    };
    // Inserts the component into the specified view container.
    // Inserts the component into the specified view container.
    SuiComponentFactory.prototype.attachToView = 
    // Inserts the component into the specified view container.
    function (componentRef, viewContainer) {
        viewContainer.insert(componentRef.hostView, 0);
    };
    // Inserts the component in the root application node.
    // Inserts the component in the root application node.
    SuiComponentFactory.prototype.attachToApplication = 
    // Inserts the component in the root application node.
    function (componentRef) {
        this._applicationRef.attachView(componentRef.hostView);
    };
    // Detaches the component from the root application node.
    // Detaches the component from the root application node.
    SuiComponentFactory.prototype.detachFromApplication = 
    // Detaches the component from the root application node.
    function (componentRef) {
        this._applicationRef.detachView(componentRef.hostView);
    };
    // Moves the component to the specified DOM element.
    // Moves the component to the specified DOM element.
    SuiComponentFactory.prototype.moveToElement = 
    // Moves the component to the specified DOM element.
    function (componentRef, element) {
        element.appendChild(componentRef.location.nativeElement);
    };
    // Moves the component to the document body.
    // Moves the component to the document body.
    SuiComponentFactory.prototype.moveToDocumentBody = 
    // Moves the component to the document body.
    function (componentRef) {
        this.moveToElement(componentRef, (document.querySelector("body")));
    };
    SuiComponentFactory.prototype.detachFromDocument = function (componentRef) {
        var element = componentRef.location.nativeElement;
        // We can't use `element.remove()` due to lack of IE11 support.
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    };
    SuiComponentFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SuiComponentFactory.ctorParameters = function () { return [
        { type: ApplicationRef, },
        { type: ComponentFactoryResolver, },
        { type: Injector, },
    ]; };
    return SuiComponentFactory;
}());
export { SuiComponentFactory };
//# sourceMappingURL=component-factory.service.js.map