import {
    Directive, Input, HostBinding, EventEmitter, Output, AfterContentInit, ContentChild,
    ElementRef, HostListener, QueryList, ContentChildren
} from "@angular/core";
import { HandledEvent, KeyCode, IFocusEvent } from "../../../misc/util/internal";
import { DropdownService, DropdownAutoCloseType } from "../services/dropdown.service";
import { SuiDropdownMenu } from "./dropdown-menu";

@Directive({
    selector: "[suiDropdown]"
})
export class SuiDropdown implements AfterContentInit {
    public service:DropdownService;

    @ContentChild(SuiDropdownMenu)
    private _menu:SuiDropdownMenu;

    @ContentChildren(SuiDropdown, { descendants: true })
    private _children:QueryList<SuiDropdown>;

    public get children():SuiDropdown[] {
        // @ContentChildren includes the current element by default.
        return this._children.filter(c => c !== this);
    }

    @Output()
    public get isOpenChange():EventEmitter<boolean> {
        return this.service.isOpenChange;
    }

    @HostBinding("class.active")
    public get isActive():boolean {
        // This is to ensure nested dropdowns don't get made bold.
        return this.service.isOpen && !this.service.isNested;
    }

    @Input()
    public get isOpen():boolean {
        return this.service.isOpen;
    }

    public set isOpen(value:boolean) {
        // If we are opening the dropdown, we want to always open its parents.
        this.service.setOpenState(value, !!value);
    }

    @HostBinding("class.disabled")
    @Input()
    public get isDisabled():boolean {
        return this.service.isDisabled;
    }

    public set isDisabled(value:boolean) {
        this.service.setDisabledState(value);
    }

    @Input("tabindex")
    private _tabIndex?:number;

    @HostBinding("attr.tabindex")
    public get tabIndex():number | undefined {
        if (this.isDisabled || this.service.isNested) {
            // If disabled, remove from tabindex.
            return undefined;
        }
        if (this._tabIndex != undefined) {
            // If custom tabindex, default to that.
            return this._tabIndex;
        }
        // Otherwise, return default of 0.
        return 0;
    }

    @Input()
    public get autoClose():DropdownAutoCloseType {
        return this.service.autoCloseMode;
    }

    public set autoClose(value:DropdownAutoCloseType) {
        this.service.autoCloseMode = value;
    }

    constructor(private _element:ElementRef) {
        this.service = new DropdownService();
        this.service.isOpenChange.subscribe(() => {
            if (this.service.isOpen) {
                this._element.nativeElement.focus();
            }
        });
    }

    public ngAfterContentInit():void {
        if (!this._menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this._menu.service = this.service;
        this._menu.parentElement = this._element;

        this.childrenUpdated();
        this._children.changes
            .subscribe(() => this.childrenUpdated());
    }

    private childrenUpdated():void {
        // Reregister child dropdowns each time the menu content changes.
        this.children
            .map(c => c.service)
            .forEach(s => this.service.registerChild(s));
    }

    @HostListener("click", ["$event"])
    public onClick(e:HandledEvent):void {
        if (!e.eventHandled) {
            e.eventHandled = true;

            this.service.toggleOpenState();
        }
    }

    @HostListener("focusout", ["$event"])
    public onFocusOut(e:IFocusEvent):void {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.externallyClose();
        }
    }

    @HostListener("keypress", ["$event"])
    public onKeypress(e:HandledEvent & KeyboardEvent):void {
        // Block the keyboard event from being fired on parent dropdowns.
        if (!e.eventHandled) {

            if (e.keyCode === KeyCode.Enter) {
                e.eventHandled = true;

                this.service.setOpenState(true);
            }
        }
    }

    private externallyClose():void {
        if (this.service.autoCloseMode === DropdownAutoCloseType.ItemClick ||
                this.service.autoCloseMode === DropdownAutoCloseType.OutsideClick) {
                // No need to reflect in parent since they are also bound to document.
            this.service.setOpenState(false);
        }
    }
}
