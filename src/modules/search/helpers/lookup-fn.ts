// Define useful types to avoid any.
export type LookupFnResult<T> = Promise<T>;
export type LookupFn<T, U = T> = (query:string | undefined, initial?:U | U[]) => LookupFnResult<T> | LookupFnResult<T[]>;
export type FilterFn<T> = (options:T[], query:string) => T[] | false;
