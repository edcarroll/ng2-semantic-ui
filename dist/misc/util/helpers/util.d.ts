export declare enum KeyCode {
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    Escape = 27,
    Enter = 13,
    Space = 32,
    Backspace = 8,
}
export interface ITemplateRefContext<T> {
    $implicit: T;
}
export interface IAugmentedElement extends Element {
    closest(selector: string): IAugmentedElement;
}
export declare class HandledEvent {
    eventHandled: boolean;
}
export interface IDynamicClasses {
    [name: string]: true;
}
export declare const Util: {
    Array: {
        range(n: number, offset?: number): number[];
        group<T>(items: T[], groupLength: number): T[][];
        groupBy<T>(items: T[], field: keyof T): {
            [name: string]: T[];
        };
        flatten<T>(items: T[][]): T[];
    };
    String: {
        padLeft(str: string, length: number, padding: string): string;
    };
    DOM: {
        parseBooleanAttribute(attributeValue: boolean): boolean;
    };
    Object: {
        readValue<T, U>(object: T, path?: string | undefined): U;
    };
    Math: {
        round(r: number, n: number): number;
        roundUp(r: number, n: number): number;
        roundDown(r: number, n: number): number;
        mod(r: number, n: number): number;
    };
};
