import { ElementRef } from "@angular/core";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
import { SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor } from "./datepicker.directive";
import { DateParser } from "../classes/date-parser";
import "../helpers/is-webview";
export declare class SuiDatepickerInputDirective {
    datepicker: SuiDatepickerDirective;
    valueAccessor: SuiDatepickerDirectiveValueAccessor;
    element: ElementRef;
    private _useNativeOnMobile;
    useNativeOnMobile: boolean;
    private _fallbackActive;
    fallbackActive: boolean;
    readonly parser: DateParser;
    private _currentInputValue;
    private _lastUpdateTyped;
    readonly selectedDateString: string | undefined;
    readonly type: string;
    readonly max: string | undefined;
    readonly min: string | undefined;
    constructor(datepicker: SuiDatepickerDirective, valueAccessor: SuiDatepickerDirectiveValueAccessor, element: ElementRef, localizationService: SuiLocalizationService);
    private updateValue(value);
    typeValue(value: string | undefined): void;
    onFocusOut(): void;
}
