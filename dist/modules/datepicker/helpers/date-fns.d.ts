import { IDatepickerLocaleValues } from "../../../behaviors/localization/index";
export declare class DateFnsParser {
    private _weekStartsOn;
    private _locale;
    private readonly _config;
    constructor(locale: IDatepickerLocaleValues);
    format(d: Date, f: string): string;
    parse(dS: string, f: string, bD: Date): Date;
}
