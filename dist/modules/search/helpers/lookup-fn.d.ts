export declare type LookupFnResult<T> = Promise<T>;
export declare type LookupFn<T, U = T> = (query: string | undefined, initial?: U | U[]) => LookupFnResult<T> | LookupFnResult<T[]>;
export declare type FilterFn<T> = (options: T[], query: string) => T[] | false;
