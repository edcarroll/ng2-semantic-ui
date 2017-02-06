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

export type RecursiveObject = { [name:string]:RecursiveObject };

export function deepValue<T extends RecursiveObject>(object:RecursiveObject, path:string):T {
    if (!object) {
        return;
    }

    if (!path) {
        return object as T;
    }

    for (let i = 0, p = path.split('.'), len = p.length; i < len; i++){
        object = object[p[i]];
    }

    return object as T;
}

export function readValue<T extends RecursiveObject>(object:RecursiveObject, field:string):T {
    return deepValue<T>(object, field);
}