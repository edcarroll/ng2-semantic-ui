import { Component, Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output, HostListener, ViewContainerRef } from "@angular/core";
import { Util, KeyCode, SuiComponentFactory } from "../../../misc/util/index";
import { TransitionController, Transition, TransitionDirection } from "../../transition/index";
import { ModalControls } from "../classes/modal-controls";
import { ModalConfig, ModalSize } from "../classes/modal-config";
var SuiModal = /** @class */ (function () {
    function SuiModal(_renderer, _element, _componentFactory) {
        var _this = this;
        this._renderer = _renderer;
        this._element = _element;
        this._componentFactory = _componentFactory;
        // Initialise with default configuration from `ModalConfig` (to avoid writing defaults twice).
        var config = new ModalConfig();
        this.loadConfig(config);
        // Event emitters for each of the possible modal outcomes.
        this.onApprove = new EventEmitter();
        this.onDeny = new EventEmitter();
        this.onDismiss = new EventEmitter();
        // Initialise controls with actions for the `approve` and `deny` cases.
        this.controls = new ModalControls(function (res) { return _this.dismiss(function () { return _this.onApprove.emit(res); }); }, function (res) { return _this.dismiss(function () { return _this.onDeny.emit(res); }); });
        // Internal variable initialisation.
        this.dimBackground = false;
        this._isClosing = false;
        this.transitionController = new TransitionController(false);
    }
    Object.defineProperty(SuiModal.prototype, "approve", {
        get: function () {
            return this.controls.approve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "deny", {
        get: function () {
            return this.controls.deny;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "isFullScreen", {
        get: 
        // Value to deny with when closing via `isClosable`.
        function () {
            return this._isFullScreen;
        },
        set: function (fullScreen) {
            this._isFullScreen = Util.DOM.parseBooleanAttribute(fullScreen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "mustScroll", {
        get: function () {
            return this._mustScroll;
        },
        set: function (mustScroll) {
            this._mustScroll = mustScroll;
            // 'Cache' value in _mustAlwaysScroll so that if `true`, _mustScroll isn't ever auto-updated.
            this._mustAlwaysScroll = mustScroll;
            this.updateScroll();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "isInverted", {
        get: function () {
            return this._isInverted;
        },
        set: function (inverted) {
            this._isInverted = Util.DOM.parseBooleanAttribute(inverted);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "dynamicClasses", {
        get: function () {
            var classes = {};
            if (this.size) {
                classes[this.size] = true;
            }
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    SuiModal.prototype.ngOnInit = function () {
        var _this = this;
        // Transition the modal to be visible.
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In));
        setTimeout(function () { return _this.dimBackground = true; });
    };
    SuiModal.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Move the modal to the document body to ensure correct scrolling.
        this._originalContainer = this._element.nativeElement.parentNode;
        document.querySelector("body").appendChild(this._element.nativeElement);
        // Remove the #templateSibling element from the DOM to fix bottom border styles.
        var templateElement = this.templateSibling.element.nativeElement;
        if (templateElement.parentNode) {
            templateElement.parentNode.removeChild(templateElement);
        }
        // Update margin offset to center modal correctly on-screen.
        var element = this._modalElement.nativeElement;
        setTimeout(function () {
            _this._renderer.setStyle(element, "margin-top", "-" + element.clientHeight / 2 + "px");
            _this.updateScroll();
        });
        // Focus any element with [autofocus] attribute.
        var autoFocus = element.querySelector("[autofocus]");
        if (autoFocus) {
            // Autofocus after the browser has had time to process other event handlers.
            setTimeout(function () { return autoFocus.focus(); }, 10);
            // Try to focus again when the modal has opened so that autofocus works in IE11.
            setTimeout(function () { return autoFocus.focus(); }, this.transitionDuration);
        }
    };
    // Updates the modal with the specified configuration.
    // Updates the modal with the specified configuration.
    SuiModal.prototype.loadConfig = 
    // Updates the modal with the specified configuration.
    function (config) {
        this.isClosable = config.isClosable;
        this.closeResult = config.closeResult;
        this.size = config.size;
        this.isFullScreen = config.isFullScreen;
        this.isBasic = config.isBasic;
        this.isInverted = config.isInverted;
        this.mustScroll = config.mustScroll;
        this.transition = config.transition;
        this.transitionDuration = config.transitionDuration;
    };
    // Dismisses the modal with a transition, firing the callback after the modal has finished transitioning.
    // Dismisses the modal with a transition, firing the callback after the modal has finished transitioning.
    SuiModal.prototype.dismiss = 
    // Dismisses the modal with a transition, firing the callback after the modal has finished transitioning.
    function (callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        // If we aren't currently closing,
        if (!this._isClosing) {
            this._isClosing = true;
            // Transition the modal to be invisible.
            this.dimBackground = false;
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, function () {
                // When done, move the modal back to its original location, emit a dismiss event, and fire the callback.
                if (_this._originalContainer) {
                    _this._originalContainer.appendChild(_this._element.nativeElement);
                }
                _this.onDismiss.emit();
                callback();
            }));
        }
    };
    // Closes the modal with a 'deny' outcome, using the specified default reason.
    // Closes the modal with a 'deny' outcome, using the specified default reason.
    SuiModal.prototype.close = 
    // Closes the modal with a 'deny' outcome, using the specified default reason.
    function () {
        if (this.isClosable) {
            // If we are allowed to close, fire the deny result with the default value.
            this.deny(this.closeResult);
        }
    };
    // Decides whether the modal needs to reposition to allow scrolling.
    // Decides whether the modal needs to reposition to allow scrolling.
    SuiModal.prototype.updateScroll = 
    // Decides whether the modal needs to reposition to allow scrolling.
    function () {
        // Semantic UI modal margin is 3.5rem, which is relative to the global font size, so for compatibility:
        var fontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue("font-size"));
        var margin = fontSize * 3.5;
        // _mustAlwaysScroll works by stopping _mustScroll from being automatically updated, so it stays `true`.
        if (!this._mustAlwaysScroll && this._modalElement) {
            var element = this._modalElement.nativeElement;
            // The modal must scroll if the window height is smaller than the modal height + both margins.
            this._mustScroll = window.innerHeight < element.clientHeight + margin * 2;
        }
    };
    SuiModal.prototype.onClick = function (e) {
        // Makes sense here, as the modal shouldn't be attached to any DOM element.
        e.stopPropagation();
    };
    // Document listener is fine here because nobody will enough modals open.
    SuiModal.prototype.onDocumentKeyUp = 
    // Document listener is fine here because nobody will enough modals open.
    function (e) {
        if (e.keyCode === KeyCode.Escape) {
            // Close automatically covers case of `!isClosable`, so check not needed.
            this.close();
        }
    };
    SuiModal.prototype.onDocumentResize = function () {
        this.updateScroll();
    };
    SuiModal.decorators = [
        { type: Component, args: [{
                    selector: "sui-modal",
                    template: "\n<!-- Page dimmer for modal background. -->\n<sui-dimmer class=\"page\"\n            [class.inverted]=\"isInverted\"\n            [(isDimmed)]=\"dimBackground\"\n            [isClickable]=\"false\"\n            [transitionDuration]=\"transitionDuration\"\n            [wrapContent]=\"false\"\n            (click)=\"close()\">\n\n    <!-- Modal component, with transition component attached -->\n    <div class=\"ui modal\"\n         [suiTransition]=\"transitionController\"\n         [class.active]=\"transitionController?.isVisible\"\n         [class.fullscreen]=\"isFullScreen\"\n         [class.basic]=\"isBasic\"\n         [class.scroll]=\"mustScroll\"\n         [class.inverted]=\"isInverted\"\n         [ngClass]=\"dynamicClasses\"\n         (click)=\"onClick($event)\"\n         #modal>\n\n        <!-- Configurable close icon -->\n        <i class=\"close icon\" *ngIf=\"isClosable\" (click)=\"close()\"></i>\n        <!-- <ng-content> so that <sui-modal> can be used as a normal component. -->\n        <ng-content></ng-content>\n        <!-- @ViewChild reference so we can insert elements beside this div. -->\n        <div #templateSibling></div>\n    </div>\n</sui-dimmer>\n",
                    styles: ["\n.ui.dimmer {\n    overflow-y: auto;\n}\n\n/* avoid .scrolling as Semantic UI adds unwanted styles. */\n.scroll {\n    position: absolute !important;\n    margin-top: 3.5rem !important;\n    margin-bottom: 3.5rem !important;\n    top: 0;\n}\n"]
                },] },
    ];
    /** @nocollapse */
    SuiModal.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
        { type: SuiComponentFactory, },
    ]; };
    SuiModal.propDecorators = {
        "isClosable": [{ type: Input },],
        "closeResult": [{ type: Input },],
        "onApprove": [{ type: Output, args: ["approved",] },],
        "onDeny": [{ type: Output, args: ["denied",] },],
        "onDismiss": [{ type: Output, args: ["dismissed",] },],
        "_modalElement": [{ type: ViewChild, args: ["modal",] },],
        "size": [{ type: Input },],
        "isFullScreen": [{ type: Input },],
        "isBasic": [{ type: Input },],
        "mustScroll": [{ type: Input },],
        "isInverted": [{ type: Input },],
        "transition": [{ type: Input },],
        "transitionDuration": [{ type: Input },],
        "templateSibling": [{ type: ViewChild, args: ["templateSibling", { read: ViewContainerRef },] },],
        "onDocumentKeyUp": [{ type: HostListener, args: ["document:keyup", ["$event"],] },],
        "onDocumentResize": [{ type: HostListener, args: ["window:resize",] },],
    };
    return SuiModal;
}());
export { SuiModal };
//# sourceMappingURL=modal.js.map