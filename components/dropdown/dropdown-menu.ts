import {Directive, ElementRef, HostBinding, Renderer} from '@angular/core';
import {SuiDropdownService} from './dropdown.service';
import {SuiTransition} from '../transition/transition';

@Directive({
    selector: '[suiDropdownMenu]'
})
export class SuiDropdownMenu extends SuiTransition {
    private _service:SuiDropdownService;

    public set service(service:SuiDropdownService) {
        this._service = service;
        this._service.menuElement = this.el;
        this.setTransitionController(service.transition);
    }

    public constructor(public renderer:Renderer, public el:ElementRef) {
        super(renderer, el);
    }
}
