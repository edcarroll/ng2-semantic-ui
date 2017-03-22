import {Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild, Renderer, ElementRef, Output} from '@angular/core';
import {SuiDropdownMenuItem} from '../dropdown/dropdown-menu';

export type PropertyReader<T> = (obj:T) => string;

export interface ISelectRenderedOption<T> {
    value:T;
    readLabel:PropertyReader<T>;
    usesTemplate:boolean;
    templateSibling:ViewContainerRef;
}

@Component({
    selector: 'sui-select-option',
    template: `
<span #templateSibling></span>
<span *ngIf="!usesTemplate">{{ readLabel(value) }}</span>
`
})
export class SuiSelectOption<T> extends SuiDropdownMenuItem implements ISelectRenderedOption<T> {
    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding('class.item')
    private _optionClasses:boolean;

    @Input()
    public value:T;

    @Output()
    public onSelected:EventEmitter<T>;

    public readLabel:(obj:T) => string;

    public usesTemplate:boolean;

    @ViewChild('templateSibling', { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    constructor(renderer:Renderer, element:ElementRef) {
        super(renderer, element);

        this._optionClasses = true;
        this.onSelected = new EventEmitter<T>();

        this.readLabel = (value:T) => "";

        this.usesTemplate = false;
    }

    @HostListener('click', ['$event'])
    public onClick(event:MouseEvent) {
        event.stopPropagation();

        this.onSelected.emit(this.value);
    }
}