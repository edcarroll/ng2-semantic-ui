// Possible directions for a transition.
export enum TransitionDirection {
    In,
    Out,
    Either,
    Static
}

export class Transition {
    public readonly type:string;

    public readonly duration:number;

    public direction:TransitionDirection;

    // Converts TransitionDirection to class name.
    public get directionClass():string {
        switch (this.direction) {
            case TransitionDirection.In: return "in";
            case TransitionDirection.Out: return "out";
        }

        return "";
    }

    // Stores the individual classes for the transition, e.g. "fade out" -> ["fade", "out"].
    public readonly classes:string[];

    public onComplete:() => void;

    constructor(name:string,
                duration:number = 250,
                direction:TransitionDirection = TransitionDirection.Either,
                onComplete:(() => void) = () => {}) {

        this.type = name;

        // We set a minimum duration of 1ms, to give the appearance of an immediate transition
        // whilst allowing positioning calculations to happen without a visible flicker.
        this.duration = Math.max(duration, 1);

        this.direction = direction;
        this.classes = this.type.split(" ");
        this.onComplete = onComplete;
    }
}
