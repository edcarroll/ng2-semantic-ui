import {Directive, ElementRef, Host, OnInit, HostBinding} from 'angular2/core';
import {Dropdown} from './dropdown.directive';

@Directive({selector: '[suiDropdownMenu]'})
export class DropdownMenu implements OnInit {
    public dropdown:Dropdown;
    public el:ElementRef;
    public constructor(@Host() dropdown:Dropdown, el:ElementRef) {
        this.dropdown = dropdown;
        this.el = el;
    }

    @HostBinding('class.visible')
    @HostBinding('class.transition')
    public get isOpen():boolean {
        return this.dropdown.isOpen;
    }

    public ngOnInit():void {
        this.dropdown.dropDownMenu = this;
    }
}
