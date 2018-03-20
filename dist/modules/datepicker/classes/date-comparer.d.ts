import { DatePrecision } from "../../../misc/util/index";
export declare class DateComparer {
    private _precision;
    private _isSmallest;
    constructor(precision: DatePrecision, isSmallest: boolean);
    equal(a: Date, b: Date | undefined): boolean;
    lessThan(a: Date, b: Date | undefined): boolean;
    greaterThan(a: Date, b: Date | undefined): boolean;
    between(date: Date, left: Date | undefined, right: Date | undefined): boolean;
}
