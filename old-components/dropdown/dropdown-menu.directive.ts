import {Directive, ElementRef, HostBinding} from '@angular/core';
import {DropdownService} from './dropdown.service';

@Directive({ selector: '[suiDropdownMenu]' })
export class DropdownMenu {
    private _service:DropdownService;
    public set service(service:DropdownService) {
        this._service = service;
        this._service.menuElement = this.el;
    }

    public el:ElementRef;
    public constructor(el:ElementRef) {
        this.el = el;
    }

    @HostBinding('class.visible')
    @HostBinding('class.transition')
    public get isOpen():boolean {
        if (this._service) {
            return this._service.isOpen;
        }
        return;
    }
}
