import { Directive, ElementRef, Input, HostBinding, Renderer2 } from "@angular/core";
var SuiCollapse = /** @class */ (function () {
    function SuiCollapse(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._pristine = true;
        // Collapse animation duration is 350ms by default.
        this.collapseDuration = 350;
        this._isExpanded = false;
        this._isCollapsing = false;
    }
    Object.defineProperty(SuiCollapse.prototype, "_isCollapsed", {
        get: 
        // Set when the collapse is closed, and not animating.
        function () {
            return !this._isExpanded && !this._isCollapsing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCollapse.prototype, "suiCollapse", {
        get: function () {
            return this._isExpanded;
        },
        // Sets the state of the collapse, `true` is collapsed.
        set: 
        // Sets the state of the collapse, `true` is collapsed.
        function (value) {
            if (value) {
                this.hide();
            }
            else {
                this.show();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCollapse.prototype, "_animationDuration", {
        get: function () {
            return this._pristine ? 0 : this.collapseDuration;
        },
        enumerable: true,
        configurable: true
    });
    SuiCollapse.prototype.hide = function () {
        var _this = this;
        this._isCollapsing = true;
        this._isExpanded = false;
        // Forcibly hide the overflow so that content is not visible past the boundaries of its container.
        this._renderer.setStyle(this._element.nativeElement, "overflow", "hidden");
        // Animate the host element from its scroll height to 0.
        this.animate(this._element.nativeElement.scrollHeight, 0, false, function () {
            _this._isCollapsing = false;
        });
    };
    SuiCollapse.prototype.show = function () {
        var _this = this;
        this._isCollapsing = true;
        // Animate the host element from its offset height to its scroll height.
        this.animate(this._element.nativeElement.offsetHeight, this._element.nativeElement.scrollHeight, true, function () {
            // Remove the overflow override to enable user styling once again.
            // Remove the overflow override to enable user styling once again.
            _this._renderer.removeStyle(_this._element.nativeElement, "overflow");
            _this._isCollapsing = false;
            _this._isExpanded = true;
        });
    };
    SuiCollapse.prototype.animate = function (startHeight, endHeight, removeOnComplete, callback) {
        if (removeOnComplete === void 0) { removeOnComplete = false; }
        if (callback === void 0) { callback = function () { }; }
        var heightFrames = [
            {
                offset: 0,
                height: startHeight + "px"
            },
            {
                offset: 1,
                height: endHeight + "px"
            }
        ];
        if (removeOnComplete) {
            heightFrames.push({
                offset: 1,
                height: "auto"
            });
        }
        // Animate the collapse using the web animations API.
        // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
        this._element.nativeElement.animate(heightFrames, {
            delay: 0,
            // Disable animation on 1st collapse / expansion.
            duration: this._animationDuration,
            iterations: 1,
            easing: "ease",
            fill: "both"
        });
        if (this._pristine) {
            // Remove pristine flag when first hit.
            this._pristine = false;
        }
        setTimeout(function () { return callback(); }, this.collapseDuration);
    };
    SuiCollapse.decorators = [
        { type: Directive, args: [{
                    selector: "[suiCollapse]"
                },] },
    ];
    /** @nocollapse */
    SuiCollapse.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    SuiCollapse.propDecorators = {
        "_isExpanded": [{ type: HostBinding, args: ["class.expanded",] },],
        "_isCollapsed": [{ type: HostBinding, args: ["class.collapsed",] },],
        "_isCollapsing": [{ type: HostBinding, args: ["class.collapsing",] },],
        "suiCollapse": [{ type: Input },],
        "collapseDuration": [{ type: Input },],
    };
    return SuiCollapse;
}());
export { SuiCollapse };
//# sourceMappingURL=collapse.js.map