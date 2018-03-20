import { EventEmitter, AfterContentInit, ElementRef } from "@angular/core";
import { HandledEvent } from "../../../misc/util/index";
import { DropdownService, DropdownAutoCloseType } from "../services/dropdown.service";
export declare class SuiDropdown implements AfterContentInit {
    private _element;
    service: DropdownService;
    private _menu;
    private _children;
    readonly children: SuiDropdown[];
    readonly isOpenChange: EventEmitter<boolean>;
    readonly isActive: boolean;
    isOpen: boolean;
    isDisabled: boolean;
    private _tabIndex?;
    readonly tabIndex: number | undefined;
    autoClose: DropdownAutoCloseType;
    constructor(_element: ElementRef);
    ngAfterContentInit(): void;
    private childrenUpdated();
    onClick(e: HandledEvent): void;
    private onFocusOut(e);
    onKeypress(e: HandledEvent & KeyboardEvent): void;
    private externallyClose();
}
