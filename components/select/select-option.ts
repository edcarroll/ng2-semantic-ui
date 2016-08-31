import {Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild} from '@angular/core';

@Component({
    selector: 'sui-select-option',
    template: `
<span #optionRenderTarget></span>
<span *ngIf="!useTemplate">{{ readValue(value) }}</span>
`
})
export class SuiSelectOption {
    @HostBinding('class.item') itemClass = true;

    @Input()
    public value:any;

    public selected:EventEmitter<any> = new EventEmitter<any>();

    public useTemplate:boolean = false;

    @ViewChild('optionRenderTarget', { read: ViewContainerRef })
    public viewContainerRef:ViewContainerRef;

    public readValue = (value:any) => "";

    constructor() {}

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();
        this.selected.emit(this.value);
        return false;
    }
}

@Component({
    selector: 'sui-select-multi-label',
    template: `
<span #optionRenderTarget></span>
<span *ngIf="!useTemplate">{{ readValue(value) }}</span>
<i class="delete icon" (click)="deselectOption()"></i>
`
})
export class SuiSelectMultiLabel extends SuiSelectOption {
    @HostBinding('class.ui')
    @HostBinding('class.label') classes = true;

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();
        return false;
    }

    @Input()
    public value:any;

    @ViewChild('optionRenderTarget', { read: ViewContainerRef })
    public viewContainerRef:ViewContainerRef;

    public deselectOption() {
        event.stopPropagation();
        this.selected.emit(this.value);
        return false;
    }
}
