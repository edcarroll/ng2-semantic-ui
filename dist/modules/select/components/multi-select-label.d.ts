import { EventEmitter, ViewContainerRef, Renderer2, ElementRef, ChangeDetectorRef, TemplateRef } from "@angular/core";
import { SuiTransition } from "../../transition/index";
import { HandledEvent, SuiComponentFactory } from "../../../misc/util/index";
import { IOptionContext } from "../classes/select-base";
export declare class SuiMultiSelectLabel<T> extends SuiTransition {
    componentFactory: SuiComponentFactory;
    private _labelClasses;
    private _transitionController;
    value: T;
    query?: string;
    onDeselected: EventEmitter<T>;
    formatter: (obj: T) => string;
    private _template?;
    template: TemplateRef<IOptionContext<T>> | undefined;
    templateSibling: ViewContainerRef;
    constructor(renderer: Renderer2, element: ElementRef, changeDetector: ChangeDetectorRef, componentFactory: SuiComponentFactory);
    deselectOption(e: HandledEvent): void;
    onClick(e: HandledEvent): void;
}
