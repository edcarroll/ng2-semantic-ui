export type Partial<T> = {
    [P in keyof T]?:Partial<T[P]>;
};