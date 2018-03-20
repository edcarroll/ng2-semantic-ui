export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
