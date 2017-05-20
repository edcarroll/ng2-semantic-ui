// Keyboard keycodes.
export enum KeyCode {
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,

    Escape = 27,
    Enter = 13,

    Space = 32,
    Backspace = 8
};

type RecursiveObject = { [name:string]:RecursiveObject };

// This involves some fun type fuckery (It can be likened to RAA) - this is essentially a function to retrive the value at a given path.
// If anyone has a better way, please do let me know :)
export function deepValue<T, U>(object:T, path:string):U {
    if (!object) {
        return;
    }

    if (!path) {
        return object as any as U;
    }

    let recursed:RecursiveObject;

    for (let i = 0, p = path.split('.'), len = p.length; i < len; i++){
        recursed = (object as any as RecursiveObject)[p[i]];
    }

    return recursed as any as U;
}

export function readValue<T, U>(object:T, field:string):U {
    return deepValue<T, U>(object, field);
}

export interface AugmentedElement extends Element {
    closest(selector:string):AugmentedElement;
}