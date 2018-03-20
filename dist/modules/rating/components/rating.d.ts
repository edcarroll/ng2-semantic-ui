import { EventEmitter } from "@angular/core";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/index";
export declare class SuiRating implements ICustomValueAccessorHost<number> {
    private _ratingClasses;
    value: number;
    valueChange: EventEmitter<number>;
    private _maximum;
    maximum: number;
    isReadonly: boolean;
    readonly icons: undefined[];
    hoveredIndex: number;
    constructor();
    onClick(i: number): void;
    onMouseover(i: number): void;
    onMouseout(): void;
    writeValue(value: number): void;
}
export declare class SuiRatingValueAccessor extends CustomValueAccessor<number, SuiRating> {
    constructor(host: SuiRating);
}
