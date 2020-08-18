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

export interface IAugmentedElement extends Element {
    closest(selector:string):IAugmentedElement;
}

export class HandledEvent {
    public eventHandled:boolean;
}

export interface IDynamicClasses {
    [name:string]:true;
}

export const Util = {
    Array: {
        range(n:number, offset:number = 0):number[] {
            return Array(n).fill(0).map((z, i) => i + offset);
        },
        group<T>(items:T[], groupLength:number):T[][] {
            const mutable = items.slice(0);

            const groups:T[][] = [];
            while (mutable.length > 0) {
                groups.push(mutable.splice(0, groupLength));
            }
            return groups;
        },
        groupBy<T>(items:T[], field:keyof T):{ [name:string]:T[] } {
            return items.reduce<{ [name:string]:T[] }>(
                (groups, i) => {
                    const fieldValue = Object.prototype.toString.call(i[field]);
                    groups[fieldValue] = groups[fieldValue] || [];
                    groups[fieldValue].push(i);
                    return groups;
                },
                Object());
        },
        flatten<T>(items:T[][]):T[] {
            return items.reduce((is, i) => is.concat(i), []);
        }
    },

    String: {
        padLeft(str:string, length:number, padding:string):string {
            let s = str;
            while (s.length < length) {
                s = padding + s;
            }
            return s;
        }
    },

    DOM: {
        parseBooleanAttribute(attributeValue:boolean):boolean {
            let value = attributeValue;
            if (typeof attributeValue === "string") {
                value = true;
            }

            return value;
        }
    },

    Object: {
        readValue<T, U>(object:T, path?:string):U {
            if (!path) {
                return object as any as U;
            }

            let recursed = object as any as IRecursiveObject;

            for (let i = 0, p = path.split("."), len = p.length; i < len; i++) {
                recursed = (recursed as any as IRecursiveObject)[p[i]];
            }

            return recursed as any as U;
        }
    },

    Math: {
        round(r:number, n:number):number {
            return Math.round(r / n) * n;
        },
        roundUp(r:number, n:number):number {
            return Math.ceil(r / n) * n;
        },
        roundDown(r:number, n:number):number {
            return Math.floor(r / n) * n;
        },
        mod(r:number, n:number):number {
            const rem = r % n;
            if (rem < 0) {
                return rem + n;
            }
            return rem;
        }
    }
};
