import {Component, Input, HostBinding, ElementRef, HostListener, AfterContentInit} from 'angular2/core';
import {Select} from '../select';

@Component({
    selector: 'sui-select-option',
    template: `<ng-content></ng-content>`
})
export class SelectOption implements AfterContentInit {
    @HostBinding('class.item') itemClass = true;

    @Input()
    public value:any;

    public HTML:string;

    constructor(private host:Select, private el:ElementRef) { }

    public ngAfterContentInit():void {
        this.HTML = this.el.nativeElement.innerHTML;
        var existingIndex = this.host.renderedOptions.findIndex((rO:SelectOption) => rO.value == this.value);
        if (existingIndex != -1) {
            this.host.renderedOptions.splice(existingIndex, 1);
        }
        this.host.renderedOptions.push(this);
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();
        this.HTML = this.el.nativeElement.innerHTML;
        this.host.selectOption(this);
        return false;
    }
}