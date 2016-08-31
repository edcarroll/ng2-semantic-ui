import {Directive, Input, Output, HostBinding, EventEmitter, ElementRef, HostListener, AfterContentInit, ContentChild} from '@angular/core';
import {SuiDropdownService} from './dropdown.service';
import {SuiDropdownMenu} from './dropdown-menu';

@Directive({
    selector: '[suiDropdown]'
})
export class SuiDropdown implements AfterContentInit {
    protected _service:SuiDropdownService;
    @ContentChild(SuiDropdownMenu) protected _menu:SuiDropdownMenu;

    @HostBinding('class.visible')
    @Input()
    public get isOpen():boolean {
        return this._service.isOpen;
    }

    public set isOpen(value:boolean) {
        this._service.isOpen = value;
    }

    @Input()
    public get autoClose():string {
        return this._service.autoClose;
    }

    public set autoClose(value:string) {
        this._service.autoClose = value;
    }

    @Output()
    public get onToggle():EventEmitter<boolean> {
        return this._service.onToggle;
    }

    @Output()
    public get isOpenChange():EventEmitter<boolean> {
        return this._service.isOpenChange;
    }

    @HostBinding('class.disabled')
    @Input()
    public get isDisabled():boolean {
        return this._service.isDisabled;
    }

    public set isDisabled(value:boolean) {
        this._service.isDisabled = value;
    }

    public constructor(el: ElementRef) {
        this._service = new SuiDropdownService();
        this._service.dropdownElement = el;
    }

    public ngAfterContentInit():void {
        this._menu.service = this._service;
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this._service.menuElement.nativeElement.contains(event.target)) {
            this._service.toggle();
        }
        return false;
    }
}

export const SUI_DROPDOWN_DIRECTIVES = [SuiDropdown, SuiDropdownMenu];
export const SUI_DROPDOWN_PROVIDERS = [SuiDropdownService];
