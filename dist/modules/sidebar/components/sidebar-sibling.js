import { Component, Input, HostBinding, HostListener, ElementRef, Renderer2 } from "@angular/core";
import { SidebarTransition } from "../services/sidebar.service";
var SuiSidebarSibling = /** @class */ (function () {
    function SuiSidebarSibling(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.isDimmedWhenVisible = false;
        this._siblingClasses = true;
    }
    Object.defineProperty(SuiSidebarSibling.prototype, "service", {
        get: function () {
            return this._service;
        },
        set: function (service) {
            var _this = this;
            this._service = service;
            setTimeout(function () { return _this.updateTransform(); });
            this._service.isVisibleChange.subscribe(function () { return _this.updateTransform(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebarSibling.prototype, "isVisible", {
        get: function () {
            if (!this.service) {
                return false;
            }
            return this.service.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebarSibling.prototype, "isDimmed", {
        get: function () {
            if (!this.service) {
                return false;
            }
            return this.service.isVisible && this.isDimmedWhenVisible;
        },
        enumerable: true,
        configurable: true
    });
    SuiSidebarSibling.prototype.updateTransform = function () {
        this._renderer.removeStyle(this._element.nativeElement, "transform");
        this._renderer.removeStyle(this._element.nativeElement, "-webkit-transform");
        if (this.service.isVisible &&
            this.service.transition !== SidebarTransition.Overlay &&
            this.service.transition !== SidebarTransition.ScaleDown) {
            var translate = "translate3d(" + this.service.width + "px, " + this.service.height + "px, 0)";
            this._renderer.setStyle(this._element.nativeElement, "transform", translate);
            this._renderer.setStyle(this._element.nativeElement, "-webkit-transform", translate);
        }
    };
    SuiSidebarSibling.prototype.onClick = function (event) {
        if (this.service.isVisible && !this.service.wasJustOpened) {
            this.service.setVisibleState(false);
        }
    };
    SuiSidebarSibling.decorators = [
        { type: Component, args: [{
                    selector: "sui-sidebar-sibling",
                    template: "<ng-content></ng-content>",
                    styles: ["\n:host {\n    display: block;\n}\n"]
                },] },
    ];
    /** @nocollapse */
    SuiSidebarSibling.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    SuiSidebarSibling.propDecorators = {
        "isDimmedWhenVisible": [{ type: Input },],
        "isVisible": [{ type: HostBinding, args: ["class.visible",] },],
        "isDimmed": [{ type: HostBinding, args: ["class.dimmed",] },],
        "_siblingClasses": [{ type: HostBinding, args: ["class.pusher",] },],
        "onClick": [{ type: HostListener, args: ["click", ["$event"],] },],
    };
    return SuiSidebarSibling;
}());
export { SuiSidebarSibling };
//# sourceMappingURL=sidebar-sibling.js.map