// element-closest | CC0-1.0 | github.com/jonathantneal/closest

/** @this {Foo} */
if (typeof Element !== "undefined") {
    if (typeof Element.prototype.matches !== "function") {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            (Element as any).prototype["mozMatchesSelector"] ||
            Element.prototype.webkitMatchesSelector ||
            function matches(selector:any):boolean {
                const element = this;
                const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
                let index = 0;

                while (elements[index] && elements[index] !== element) {
                    ++index;
                }

                return Boolean(elements[index]);
            };
    }

    if (typeof Element.prototype["closest"] !== "function") {
        Element.prototype["closest"] = function closest(selector:any):any {
            let element = this;

            while (element && element.nodeType === 1) {
                if (element.matches(selector)) {
                    return element;
                }

                element = element.parentNode;
            }

            return undefined;
        };
    }
}
