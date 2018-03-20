export declare enum DatePrecision {
    Decade = 0,
    Year = 1,
    Month = 2,
    Date = 3,
    Hour = 4,
    Minute = 5,
}
export declare const DateUtil: {
    startOf(precision: DatePrecision, date: Date, resetAll?: boolean): Date;
    endOf(precision: DatePrecision, date: Date): Date;
    equal(precision: DatePrecision, a: Date, b: Date): boolean;
    next(precision: DatePrecision, date: Date): Date;
    add(precision: DatePrecision, date: Date, i: number): Date;
    previous(precision: DatePrecision, date: Date): Date;
    clone(date: Date): Date;
};
