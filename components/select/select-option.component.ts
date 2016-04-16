import {Component, Input, HostBinding, ElementRef, HostListener} from 'angular2/core';
import {Select} from '../select';

@Component({
    selector: 'sui-select-option',
    template: `<ng-content></ng-content>`
})
export class SelectOption {
    @HostBinding('class.item') itemClass = true;

    @Input()
    public value:any;

    constructor(private host:Select, private el:ElementRef) { }

    @HostListener('click', ['$event'])
    public click(event):boolean {
        event.stopPropagation();
        this.host.selectOption(this.value, this.el.nativeElement.innerHTML);
        return false;
    }
}