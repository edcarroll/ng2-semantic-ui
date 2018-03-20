export declare enum TransitionDirection {
    In = 0,
    Out = 1,
    Either = 2,
    Static = 3,
}
export declare class Transition {
    readonly type: string;
    readonly duration: number;
    direction: TransitionDirection;
    readonly directionClass: string;
    readonly classes: string[];
    onComplete: () => void;
    constructor(name: string, duration?: number, direction?: TransitionDirection, onComplete?: (() => void));
}
