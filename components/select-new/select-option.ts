import {Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild, Renderer, ElementRef, Output} from '@angular/core';
import {RecursiveObject} from '../util/util';
import {SuiDropdownMenuItem} from '../dropdown/dropdown-menu';

@Component({
    selector: 'new-sui-select-option',
    template: `
<span [innerHTML]="readLabel(value)"></span>
`
})
export class SuiSelectOption<T extends RecursiveObject> extends SuiDropdownMenuItem {
    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding('class.item')
    private _optionClasses:boolean;

    @Input()
    public value:T;

    @Output()
    public onSelected:EventEmitter<T>;

    public readLabel:(obj:T) => string;

    constructor(renderer:Renderer, element:ElementRef) {
        super(renderer, element);

        this._optionClasses = true;
        this.onSelected = new EventEmitter<T>();

        this.readLabel = (value:T) => "";
    }

    @HostListener('click', ['$event'])
    public onClick(event:MouseEvent) {
        event.stopPropagation();

        this.onSelected.emit(this.value);
    }
}