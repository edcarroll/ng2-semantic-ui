import {Directive, ElementRef, HostBinding} from '@angular/core';
import {SuiDropdownService} from './dropdown.service';

@Directive({
    selector: '[suiDropdownMenu]'
})
export class SuiDropdownMenu {
    private _service:SuiDropdownService;
    public set service(service:SuiDropdownService) {
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
