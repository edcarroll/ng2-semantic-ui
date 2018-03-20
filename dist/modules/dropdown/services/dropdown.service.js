import { EventEmitter } from "@angular/core";
// Creates essentially a 'string' enum.
export var DropdownAutoCloseType = {
    ItemClick: "itemClick",
    OutsideClick: "outsideClick",
    Disabled: "disabled"
};
var DropdownService = /** @class */ (function () {
    function DropdownService(autoCloseMode) {
        if (autoCloseMode === void 0) { autoCloseMode = DropdownAutoCloseType.ItemClick; }
        this.isOpen = false;
        this.isOpenChange = new EventEmitter();
        this.isDisabled = false;
        this.autoCloseMode = autoCloseMode;
        this.children = [];
    }
    Object.defineProperty(DropdownService.prototype, "isNested", {
        get: function () {
            return !!this.parent;
        },
        enumerable: true,
        configurable: true
    });
    DropdownService.prototype.setOpenState = function (isOpen, reflectInParent) {
        var _this = this;
        if (reflectInParent === void 0) { reflectInParent = false; }
        if (this.isOpen !== isOpen && !this.isDisabled) {
            // Only update the state if it has changed, and the dropdown isn't disabled.
            this.isOpen = !!isOpen;
            this.isAnimating = true;
            // We must delay the emitting to avoid the 'changed after checked' Angular errors.
            this.delay(function () { return _this.isOpenChange.emit(_this.isOpen); });
            if (!this.isOpen) {
                // Close the child dropdowns when this one closes.
                this.children.forEach(function (c) { return c.setOpenState(_this.isOpen); });
            }
            if (this.parent && reflectInParent) {
                // Open the parent dropdowns when this one opens.
                this.parent.setOpenState(this.isOpen, true);
            }
        }
        else if (this.isOpen !== isOpen && this.isDisabled) {
            // If the state has changed, but the dropdown is disabled, re-emit the original isOpen value.
            this.delay(function () { return _this.isOpenChange.emit(_this.isOpen); });
        }
    };
    DropdownService.prototype.setDisabledState = function (isDisabled) {
        if (this.isDisabled !== isDisabled) {
            if (!!isDisabled) {
                // Close the dropdown as it is now disabled
                this.setOpenState(false);
            }
            this.isDisabled = !!isDisabled;
        }
    };
    DropdownService.prototype.toggleOpenState = function () {
        this.setOpenState(!this.isOpen);
    };
    // Registers a dropdown service as a child of this service.
    // Registers a dropdown service as a child of this service.
    DropdownService.prototype.registerChild = 
    // Registers a dropdown service as a child of this service.
    function (child) {
        if (!this.isChildRegistered(child)) {
            this.children.push(child);
            child.parent = this;
        }
    };
    // Recursive method to check if the provided dropdown is already registered as a child, or is a descendant of a child.
    // Recursive method to check if the provided dropdown is already registered as a child, or is a descendant of a child.
    DropdownService.prototype.isChildRegistered = 
    // Recursive method to check if the provided dropdown is already registered as a child, or is a descendant of a child.
    function (child) {
        return this === child || !!this.children
            .find(function (c) {
            return !!c.children
                .find(function (cChild) { return cChild.isChildRegistered(child); });
        });
    };
    // Wipes any nested data, so all services can be cleanly reattached.
    // Wipes any nested data, so all services can be cleanly reattached.
    DropdownService.prototype.clearChildren = 
    // Wipes any nested data, so all services can be cleanly reattached.
    function () {
        this.children.forEach(function (c) {
            c.parent = undefined;
        });
        this.children = [];
    };
    // Method for delaying an event into the next tick, to avoid Angular "changed after checked" error.
    // Method for delaying an event into the next tick, to avoid Angular "changed after checked" error.
    DropdownService.prototype.delay = 
    // Method for delaying an event into the next tick, to avoid Angular "changed after checked" error.
    function (callback) {
        setTimeout(function () { return callback(); });
    };
    return DropdownService;
}());
export { DropdownService };
//# sourceMappingURL=dropdown.service.js.map