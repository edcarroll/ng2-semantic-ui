// Possible directions for a transition.
// Possible directions for a transition.
export var TransitionDirection;
// Possible directions for a transition.
(function (TransitionDirection) {
    TransitionDirection[TransitionDirection["In"] = 0] = "In";
    TransitionDirection[TransitionDirection["Out"] = 1] = "Out";
    TransitionDirection[TransitionDirection["Either"] = 2] = "Either";
    TransitionDirection[TransitionDirection["Static"] = 3] = "Static";
})(TransitionDirection || (TransitionDirection = {}));
var Transition = /** @class */ (function () {
    function Transition(name, duration, direction, onComplete) {
        if (duration === void 0) { duration = 250; }
        if (direction === void 0) { direction = TransitionDirection.Either; }
        if (onComplete === void 0) { onComplete = function () { }; }
        this.type = name;
        // We set a minimum duration of 1ms, to give the appearance of an immediate transition
        // whilst allowing positioning calculations to happen without a visible flicker.
        this.duration = Math.max(duration, 1);
        this.direction = direction;
        this.classes = this.type.split(" ");
        this.onComplete = onComplete;
    }
    Object.defineProperty(Transition.prototype, "directionClass", {
        // Converts TransitionDirection to class name.
        get: 
        // Converts TransitionDirection to class name.
        function () {
            switch (this.direction) {
                case TransitionDirection.In: return "in";
                case TransitionDirection.Out: return "out";
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return Transition;
}());
export { Transition };
//# sourceMappingURL=transition.js.map