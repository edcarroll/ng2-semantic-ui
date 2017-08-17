import {
    Directive, Input, HostBinding, EventEmitter, Output, AfterContentInit, ContentChild,
    ElementRef, HostListener, QueryList, ContentChildren
} from "@angular/core";
import { HandledEvent, KeyCode, IFocusEvent } from "../../../misc/util/index";
import { DropdownService } from "../services/dropdown.service";
import { SuiDropdownMenu } from "./dropdown-menu";
import { DropdownOpenTrigger, DropdownCloseTrigger } from '../classes/dropdown-config';

@Directive({
    selector: "[suiDropdown]"
})
export class SuiDropdown implements AfterContentInit {
    public service:DropdownService;

    @ContentChild(SuiDropdownMenu)
    private _menu:SuiDropdownMenu;

    @ContentChildren(SuiDropdown, { descendants: true })
    private _children:QueryList<SuiDropdown>;

    public get children():SuiDropdown[] | undefined {
        // @ContentChildren includes the current element by default.
        return this._children
            ? this._children.filter(c => c !== this)
            : undefined;
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

    private _openingTimeout:any;
    private _closingTimeout: any;

    @Input()
    public get hoverOpenDelay():number {
        return this.service.hoverOpenDelay;
    }
    public set hoverOpenDelay(value:number) {
        this.service.hoverOpenDelay = value;
    }

    @Input()
    public get hoverCloseDelay():number {
        return this.service.hoverCloseDelay;
    }
    public set hoverCloseDelay(value:number) {
        this.service.hoverCloseDelay = value;
    }

    @Input()
    public get openTrigger():DropdownOpenTrigger {
        return this.service.openTrigger;
    }
    public set openTrigger(value:DropdownOpenTrigger) {
        this.service.openTrigger = value;
        this.updateChildSettings();
    }

    @Input()
    public get closeTriggers():DropdownCloseTrigger | DropdownCloseTrigger[] {
        return this.service.closeTriggers;
    }
    public set closeTriggers(value:DropdownCloseTrigger | DropdownCloseTrigger[]) {
        if (!(value instanceof Array)) {
            value = [value];
        }
        this.service.closeTriggers = value;
        this.updateChildSettings();
    }

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

        this.updateChildren();
        this._children.changes
            .subscribe(() => this.updateChildren());
    }

    private updateChildren():void {
        // Reregister child dropdowns and propagate parent settings each time the menu content changes.
        if (this.children) {
            this.children
                .map(c => c.service)
                .forEach(s => this.service.registerChild(s));
            this.updateChildSettings();
        }
    }

    private updateChildSettings() {
        if (this.children) {
            this.children.forEach(c => {
                c.openTrigger = this.openTrigger;
                c.closeTriggers = this.closeTriggers;
                c.hoverOpenDelay = this.hoverOpenDelay;
                c.hoverCloseDelay = this.hoverCloseDelay;
            });
        }
    }

    @HostListener("click", ["$event"])
    public onClick(e: HandledEvent): void {
        this.service.handleClick(e);
    }

    @HostListener("focusout", ["$event"])
    private onFocusOut(e:IFocusEvent):void {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.service.handleFocusOut();
        }
    }

    @HostListener("keypress", ["$event"])
    public onKeypress(e:HandledEvent & KeyboardEvent):void {
        this.service.handleKeypress(e);
    }

    @HostListener("mouseenter")
    private onMouseEnter(): void {
        this.service.handleMouseEnter();
    }

    @HostListener("mouseleave")
    private onMouseLeave():void {
        this.service.handleMouseLeave();
    }
}
