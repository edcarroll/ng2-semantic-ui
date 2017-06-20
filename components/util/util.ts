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
}

interface IRecursiveObject { [name:string]:IRecursiveObject; }

export interface ITemplateRefContext<T> { $implicit:T; }

// This involves some fun type fuckery (It can be likened to RAA) - this is essentially a function to retrive the value at a given path.
// If anyone has a better way, please do let me know :)
export function deepValue<T, U>(object:T, path?:string):U {
    if (!path) {
        return object as any as U;
    }

    let recursed:IRecursiveObject | undefined;

    for (let i = 0, p = path.split("."), len = p.length; i < len; i++) {
        recursed = (object as any as IRecursiveObject)[p[i]];
    }

    return recursed as any as U;
}

export function readValue<T, U>(object:T, field?:string):U {
    return deepValue<T, U>(object, field);
}

export interface IAugmentedElement extends Element {
    closest(selector:string):IAugmentedElement;
}

export class HandledEvent {
    public eventHandled:boolean;
}

export function parseBooleanAttribute(attributeValue:boolean):boolean {
    let value = attributeValue;
    if (typeof attributeValue === "string") {
        value = true;
    }

    return value;
}

export interface IDynamicClasses {
    [name:string]:true;
}

export function padLeft(str:string, length:number, padding:string):string {
    let s = str;
    while (s.length < length) {
        s = padding + s;
    }
    return s;
}
