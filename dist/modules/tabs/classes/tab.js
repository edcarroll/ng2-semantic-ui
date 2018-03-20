var Tab = /** @class */ (function () {
    function Tab(header, content) {
        var _this = this;
        this.id = header.id;
        this.header = header;
        this.content = content;
        // So that the header and content isActive properties are always in sync.
        this.header.isActiveChange
            .subscribe(function () { return _this.content.isActive = _this.isActive; });
    }
    Object.defineProperty(Tab.prototype, "isActive", {
        // Saves accessing .header.isActive every time.
        get: 
        // Saves accessing .header.isActive every time.
        function () {
            return this.header.isActive;
        },
        set: function (active) {
            // Use `setActiveState` so as not to fire 'external changes' event.
            this.header.setActiveState(active);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "isDisabled", {
        // Saves accessing .header.isDisabled every time.
        get: 
        // Saves accessing .header.isDisabled every time.
        function () {
            return this.header.isDisabled;
        },
        enumerable: true,
        configurable: true
    });
    return Tab;
}());
export { Tab };
//# sourceMappingURL=tab.js.map