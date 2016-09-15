import {Directive, ElementRef, HostBinding, Renderer} from '@angular/core';
import {SuiDropdownService} from './dropdown.service';
import {SuiTransition} from "../transition/transition";

@Directive({
    selector: '[suiDropdownMenu]'
})
export class SuiDropdownMenu {
    private _service:SuiDropdownService;
    private _transition:SuiTransition;

    public set service(service:SuiDropdownService) {
        this._service = service;
        this._service.menuElement = this.el;
        this._service.transition = this._transition;
        if (service.isOpen) {
            this._transition.isVisible = true;
        }
    }

    public constructor(public el:ElementRef, public renderer:Renderer) {
        this._transition = new SuiTransition(el, renderer);
        this._transition.isVisible = false;
    }
}
