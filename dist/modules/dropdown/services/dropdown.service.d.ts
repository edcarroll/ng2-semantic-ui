import { EventEmitter } from "@angular/core";
export declare type DropdownAutoCloseType = "itemClick" | "outsideClick" | "disabled";
export declare const DropdownAutoCloseType: {
    ItemClick: DropdownAutoCloseType;
    OutsideClick: DropdownAutoCloseType;
    Disabled: DropdownAutoCloseType;
};
export declare class DropdownService {
    isOpen: boolean;
    isAnimating: boolean;
    isOpenChange: EventEmitter<boolean>;
    isDisabled: boolean;
    autoCloseMode: DropdownAutoCloseType;
    parent?: DropdownService;
    children: DropdownService[];
    readonly isNested: boolean;
    constructor(autoCloseMode?: DropdownAutoCloseType);
    setOpenState(isOpen: boolean, reflectInParent?: boolean): void;
    setDisabledState(isDisabled: boolean): void;
    toggleOpenState(): void;
    registerChild(child: DropdownService): void;
    isChildRegistered(child: DropdownService): boolean;
    clearChildren(): void;
    private delay(callback);
}
