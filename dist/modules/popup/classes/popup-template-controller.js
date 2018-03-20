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
import { TemplateRef } from "@angular/core";
import { SuiPopupController } from "./popup-controller";
import { PopupConfig } from "./popup-config";
var templateRef = TemplateRef;
var TemplatePopupConfig = /** @class */ (function (_super) {
    __extends(TemplatePopupConfig, _super);
    function TemplatePopupConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TemplatePopupConfig;
}(PopupConfig));
export { TemplatePopupConfig };
var SuiPopupTemplateController = /** @class */ (function (_super) {
    __extends(SuiPopupTemplateController, _super);
    function SuiPopupTemplateController(renderer, element, componentFactory, config) {
        return _super.call(this, renderer, element, componentFactory, config) || this;
    }
    SuiPopupTemplateController.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config);
        if (config) {
            this.template = config.template;
            this.context = config.context;
        }
    };
    SuiPopupTemplateController.prototype.open = function () {
        // If there is a template, inject it into the view.
        if (this.template) {
            this.popup.templateSibling.clear();
            this._componentFactory.createView(this.popup.templateSibling, this.template, {
                $implicit: this.popup,
                context: this.context
            });
        }
        _super.prototype.open.call(this);
    };
    return SuiPopupTemplateController;
}(SuiPopupController));
export { SuiPopupTemplateController };
//# sourceMappingURL=popup-template-controller.js.map