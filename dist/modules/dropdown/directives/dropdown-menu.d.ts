import { Renderer2, ElementRef, AfterContentInit, QueryList, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { SuiTransition } from "../../transition/index";
import { HandledEvent, KeyCode } from "../../../misc/util/index";
import { DropdownService } from "../services/dropdown.service";
import "element-closest";
export declare class SuiDropdownMenuItem {
    private _renderer;
    element: ElementRef;
    readonly isDisabled: boolean;
    private _isSelected;
    isSelected: boolean;
    selectedClass: string;
    childDropdownMenu: SuiDropdownMenu;
    readonly hasChildDropdown: boolean;
    constructor(_renderer: Renderer2, element: ElementRef);
    performClick(): void;
}
export declare class SuiDropdownMenu extends SuiTransition implements AfterContentInit, OnDestroy {
    element: ElementRef;
    private _service;
    private _transitionController;
    menuTransition: string;
    menuTransitionDuration: number;
    service: DropdownService;
    private _itemsQueryInternal;
    private _itemsQueryOverride;
    items: QueryList<SuiDropdownMenuItem>;
    private readonly _itemsQuery;
    private readonly _items;
    selectedItems: SuiDropdownMenuItem[];
    menuAutoSelectFirst: boolean;
    menuSelectedItemClass: string;
    private _documentKeyDownListener;
    constructor(renderer: Renderer2, element: ElementRef, changeDetector: ChangeDetectorRef);
    onClick(e: HandledEvent & MouseEvent): void;
    onDocumentKeyDown(e: KeyboardEvent): void;
    resetSelection(): void;
    updateSelection(selectedItem: SuiDropdownMenuItem, keyCode: KeyCode): SuiDropdownMenuItem;
    scrollToItem(item: SuiDropdownMenuItem): void;
    ngAfterContentInit(): void;
    private onItemsChanged();
    ngOnDestroy(): void;
}
