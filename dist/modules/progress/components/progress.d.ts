export declare class SuiProgress {
    private _popupClasses;
    private _value;
    private _maximum;
    private _precision;
    private _overrideSuccess;
    autoSuccess: boolean;
    showProgress: boolean;
    value: number;
    maximum: number;
    precision: number;
    private readonly _reachedMaximum;
    readonly percentage: string;
    classValue: string;
    constructor();
}
