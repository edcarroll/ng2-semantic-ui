import { Directive, EventEmitter, Renderer2, ElementRef, HostListener, HostBinding } from "@angular/core";
var SuiSelectSearch = /** @class */ (function () {
    function SuiSelectSearch(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.onQueryUpdated = new EventEmitter();
        this.onQueryKeyDown = new EventEmitter();
        this._searchClass = true;
        this._autoComplete = "off";
    }
    Object.defineProperty(SuiSelectSearch.prototype, "query", {
        set: function (query) {
            this._renderer.setProperty(this._element.nativeElement, "value", query);
        },
        enumerable: true,
        configurable: true
    });
    SuiSelectSearch.prototype.updateQuery = function (query) {
        this.onQueryUpdated.emit(query);
    };
    SuiSelectSearch.prototype.onKeyDown = function (e) {
        this.onQueryKeyDown.emit(e);
    };
    SuiSelectSearch.prototype.focus = function () {
        var _this = this;
        // Slightly delay to support in menu search.
        this._element.nativeElement.focus();
        setTimeout(function () { return _this._element.nativeElement.focus(); });
    };
    SuiSelectSearch.decorators = [
        { type: Directive, args: [{
                    selector: "input[suiSelectSearch]"
                },] },
    ];
    /** @nocollapse */
    SuiSelectSearch.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    SuiSelectSearch.propDecorators = {
        "_searchClass": [{ type: HostBinding, args: ["class.search",] },],
        "_autoComplete": [{ type: HostBinding, args: ["attr.autocomplete",] },],
        "updateQuery": [{ type: HostListener, args: ["input", ["$event.target.value"],] },],
        "onKeyDown": [{ type: HostListener, args: ["keydown", ["$event"],] },],
    };
    return SuiSelectSearch;
}());
export { SuiSelectSearch };
//# sourceMappingURL=select-search.js.map