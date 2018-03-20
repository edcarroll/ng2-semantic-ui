var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Used to pass ability to control a modal to a component.
var 
// Used to pass ability to control a modal to a component.
ModalControls = /** @class */ (function () {
    function ModalControls(approve, deny) {
        this.approve = approve;
        this.deny = deny;
    }
    // Use method here rather than arrow variables to make intellisense show they're methods.
    // Use method here rather than arrow variables to make intellisense show they're methods.
    ModalControls.prototype.approve = 
    // Use method here rather than arrow variables to make intellisense show they're methods.
    function (result) { };
    ModalControls.prototype.deny = function (result) { };
    return ModalControls;
}());
// Used to pass ability to control a modal to a component.
export { ModalControls };
// Injected into custom modal components, to allow control of the modal, and access to a context object.
var 
// Injected into custom modal components, to allow control of the modal, and access to a context object.
Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(controls, context) {
        var _this = 
        // Instances of `ModalControls` are only created in the `SuiModal` constructor,
        // so we take an initialised instance rather than remaking one each time.
        _super.call(this, controls.approve, controls.deny) || this;
        _this.context = context;
        return _this;
    }
    return Modal;
}(ModalControls));
// Injected into custom modal components, to allow control of the modal, and access to a context object.
export { Modal };
//# sourceMappingURL=modal-controls.js.map