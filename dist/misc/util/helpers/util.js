// Keyboard keycodes.
// Keyboard keycodes.
export var KeyCode;
// Keyboard keycodes.
(function (KeyCode) {
    KeyCode[KeyCode["Left"] = 37] = "Left";
    KeyCode[KeyCode["Up"] = 38] = "Up";
    KeyCode[KeyCode["Right"] = 39] = "Right";
    KeyCode[KeyCode["Down"] = 40] = "Down";
    KeyCode[KeyCode["Escape"] = 27] = "Escape";
    KeyCode[KeyCode["Enter"] = 13] = "Enter";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
})(KeyCode || (KeyCode = {}));
var HandledEvent = /** @class */ (function () {
    function HandledEvent() {
    }
    return HandledEvent;
}());
export { HandledEvent };
export var Util = {
    Array: {
        range: function (n, offset) {
            if (offset === void 0) { offset = 0; }
            return Array(n).fill(0).map(function (z, i) { return i + offset; });
        },
        group: function (items, groupLength) {
            var mutable = items.slice(0);
            var groups = [];
            while (mutable.length > 0) {
                groups.push(mutable.splice(0, groupLength));
            }
            return groups;
        },
        groupBy: function (items, field) {
            return items.reduce(function (groups, i) {
                var fieldValue = i[field].toString();
                groups[fieldValue] = groups[fieldValue] || [];
                groups[fieldValue].push(i);
                return groups;
            }, Object());
        },
        flatten: function (items) {
            return items.reduce(function (is, i) { return is.concat(i); }, []);
        }
    },
    String: {
        padLeft: function (str, length, padding) {
            var s = str;
            while (s.length < length) {
                s = padding + s;
            }
            return s;
        }
    },
    DOM: {
        parseBooleanAttribute: function (attributeValue) {
            var value = attributeValue;
            if (typeof attributeValue === "string") {
                value = true;
            }
            return value;
        }
    },
    Object: {
        readValue: function (object, path) {
            if (!path) {
                return object;
            }
            var recursed;
            for (var i = 0, p = path.split("."), len = p.length; i < len; i++) {
                recursed = object[p[i]];
            }
            return recursed;
        }
    },
    Math: {
        round: function (r, n) {
            return Math.round(r / n) * n;
        },
        roundUp: function (r, n) {
            return Math.ceil(r / n) * n;
        },
        roundDown: function (r, n) {
            return Math.floor(r / n) * n;
        },
        mod: function (r, n) {
            var rem = r % n;
            if (rem < 0) {
                return rem + n;
            }
            return rem;
        }
    }
};
//# sourceMappingURL=util.js.map