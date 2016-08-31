var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
export var SuiTab = (function () {
    function SuiTab() {
        var _this = this;
        this._isActive = false;
        this._isDisabled = false;
        this.isActiveChange = new EventEmitter(false);
        this.onActivate = new EventEmitter(false);
        this.stateChanged$ = new Observable(function (observer) { return _this._stateObserver = observer; });
    }
    Object.defineProperty(SuiTab.prototype, "suiTabHeader", {
        set: function (value) {
            if (!this.id) {
                this.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTab.prototype, "content", {
        get: function () { return this._content; },
        set: function (content) {
            this._content = content;
            content.isActive = this.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTab.prototype, "isActive", {
        get: function () { return this._isActive; },
        set: function (value) {
            var change = this._isActive != value;
            this._isActive = value;
            this._content.isActive = value;
            this.stateObserverNext(change);
            this.isActiveChange.emit(this._isActive);
            if (value && change) {
                this.onActivate.emit(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTab.prototype, "isDisabled", {
        get: function () {
            return this._isDisabled;
        },
        set: function (value) {
            var change = this._isDisabled != value;
            this._isDisabled = value;
            this.stateObserverNext(change);
        },
        enumerable: true,
        configurable: true
    });
    SuiTab.prototype.stateObserverNext = function (change) {
        if (change) {
            this._stateObserver.next(this);
        }
    };
    Object.defineProperty(SuiTab.prototype, "manuallyActivate", {
        set: function (value) {
            var _this = this;
            setTimeout(function () {
                _this.isActive = _this.isDisabled ? false : value;
                _this.isActiveChange.emit(_this._isActive);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTab.prototype, "manuallyDisable", {
        set: function (value) {
            var _this = this;
            setTimeout(function () {
                _this.isDisabled = value;
            });
        },
        enumerable: true,
        configurable: true
    });
    SuiTab.prototype.click = function () {
        if (!this.isDisabled) {
            this.isActive = true;
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SuiTab.prototype, "suiTabHeader", null);
    __decorate([
        HostBinding('class.active'), 
        __metadata('design:type', Object)
    ], SuiTab.prototype, "isActive", null);
    __decorate([
        HostBinding('class.disabled'), 
        __metadata('design:type', Object)
    ], SuiTab.prototype, "isDisabled", null);
    __decorate([
        Input('isActive'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SuiTab.prototype, "manuallyActivate", null);
    __decorate([
        Input('isDisabled'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SuiTab.prototype, "manuallyDisable", null);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiTab.prototype, "isActiveChange", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], SuiTab.prototype, "onActivate", void 0);
    __decorate([
        HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SuiTab.prototype, "click", null);
    SuiTab = __decorate([
        Directive({
            selector: '[suiTabHeader]'
        }), 
        __metadata('design:paramtypes', [])
    ], SuiTab);
    return SuiTab;
}());
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/tabs/tab.js.map