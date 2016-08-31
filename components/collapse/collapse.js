var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input, HostBinding, Renderer } from '@angular/core';
export var SuiCollapse = (function () {
    function SuiCollapse(_el, _renderer) {
        // @HostBinding('style.display')
        this.display = "none";
        // shown
        this.isExpanded = true;
        // hidden
        this.isCollapsed = false;
        // animation state
        this.isCollapsing = false;
        this._el = _el;
        this._renderer = _renderer;
    }
    Object.defineProperty(SuiCollapse.prototype, "suiCollapse", {
        get: function () {
            return this.isExpanded;
        },
        set: function (value) {
            this.isExpanded = value;
            this.isCollapsed = !this.isExpanded;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    SuiCollapse.prototype.toggle = function () {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    SuiCollapse.prototype.hide = function () {
        this.isCollapsing = true;
        this.isExpanded = false;
        this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.setElementStyle(this._el.nativeElement, 'height', '0');
        this.isCollapsing = false;
        this.isCollapsed = true;
    };
    SuiCollapse.prototype.show = function () {
        this.isCollapsing = true;
        this.isCollapsed = false;
        this.display = '';
        this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
        this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
        this.isCollapsing = false;
        this.isExpanded = true;
    };
    __decorate([
        HostBinding('class.expanded'), 
        __metadata('design:type', Boolean)
    ], SuiCollapse.prototype, "isExpanded", void 0);
    __decorate([
        HostBinding('class.collapsed'), 
        __metadata('design:type', Boolean)
    ], SuiCollapse.prototype, "isCollapsed", void 0);
    __decorate([
        HostBinding('class.collapsing'), 
        __metadata('design:type', Boolean)
    ], SuiCollapse.prototype, "isCollapsing", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SuiCollapse.prototype, "suiCollapse", null);
    SuiCollapse = __decorate([
        Directive({
            selector: '[suiCollapse]',
            exportAs: 'suiCollapse'
        }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], SuiCollapse);
    return SuiCollapse;
}());
export var SUI_COLLAPSE_DIRECTIVES = [SuiCollapse];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/collapse/collapse.js.map