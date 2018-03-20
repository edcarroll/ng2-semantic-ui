import { ElementRef, EventEmitter, Renderer2 } from "@angular/core";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/index";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
import { SuiSelectBase } from "../classes/select-base";
import { SuiSelectOption } from "./select-option";
export declare class SuiMultiSelect<T, U> extends SuiSelectBase<T, U> implements ICustomValueAccessorHost<U[]> {
    selectedOptions: T[];
    private _writtenOptions?;
    selectedOptionsChange: EventEmitter<U[]>;
    readonly filteredOptions: T[];
    readonly availableOptions: T[];
    private _hasLabels;
    hasLabels: boolean;
    private _placeholder;
    placeholder: string;
    maxSelected: number;
    readonly maxSelectedReached: boolean;
    readonly maxSelectedMessage: string;
    readonly selectedMessage: string;
    private _multiSelectClasses;
    constructor(element: ElementRef, renderer: Renderer2, localizationService: SuiLocalizationService);
    protected optionsUpdateHook(): void;
    protected initialiseRenderedOption(option: SuiSelectOption<T>): void;
    selectOption(option: T): void;
    writeValue(values: U[]): void;
    deselectOption(option: T): void;
    onQueryInputKeydown(event: KeyboardEvent): void;
}
export declare class SuiMultiSelectValueAccessor<T, U> extends CustomValueAccessor<U[], SuiMultiSelect<T, U>> {
    constructor(host: SuiMultiSelect<T, U>);
}
