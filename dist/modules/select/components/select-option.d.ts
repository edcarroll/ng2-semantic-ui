import { EventEmitter, ViewContainerRef, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { SuiDropdownMenuItem } from "../../dropdown/index";
import { HandledEvent } from "../../../misc/util/index";
export declare class SuiSelectOption<T> extends SuiDropdownMenuItem {
    changeDetector: ChangeDetectorRef;
    private _optionClasses;
    value: T;
    onSelected: EventEmitter<T>;
    isActive: boolean;
    renderedText?: string;
    formatter: (obj: T) => string;
    usesTemplate: boolean;
    templateSibling: ViewContainerRef;
    constructor(renderer: Renderer2, element: ElementRef, changeDetector: ChangeDetectorRef);
    onClick(e: HandledEvent): void;
}
