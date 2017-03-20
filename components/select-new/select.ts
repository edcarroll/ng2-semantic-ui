import {Component, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {SuiSelectBase} from './select-base';

@Component({
    selector: 'sui-select',
    template: `
<i class="dropdown icon"></i>
<!-- Query input -->
<input [hidden]="!isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query" #queryInput>
<!-- Placeholder text -->
<div *ngIf="!selectedOption" class="default text" [class.filtered]="!!query">{{ placeholder }}</div>
<!-- Selected item -->
<div class="text" [class.filtered]="!!query || !selectedOption">
    <span #optionTemplateSibling></span>
    <span *ngIf="!optionTemplate">{{ labelGetter(selectedOption) }}</span>
</div>
<!-- Select dropdown menu -->
<div class="menu" suiDropdownMenu>
    <ng-content></ng-content>
    <div *ngIf="isSearchable && availableOptions.length == 0" class="message">No results</div>
</div>
`
})
export class SuiSelect<T> extends SuiSelectBase<T> {
    public selectedOption:T;
    
    @ViewChild('optionTemplateSibling', { read: ViewContainerRef })
    private _optionTemplateSibling:ViewContainerRef;

    @Output()
    public selectedOptionChange:EventEmitter<T>;

    public set query(query:string) {
        this.selectedOption = null;
        // We cannot call the super setter yet. Seems to be coming, see @Microsoft/Typescript#338
        this.searchService.updateQuery(query, () =>
            this.dropdownService.setOpenState(true));
    }

    constructor(element:ElementRef, renderer:Renderer) {
        super(element, renderer);

        this.selectedOptionChange = new EventEmitter<T>();
    }

    public selectOption(option:T) {
        this.selectedOption = option;
        this.selectedOptionChange.emit(option);

        this.dropdownService.setOpenState(false);

        this.searchService.searchDelay = this._menu.menuTransitionDuration;
        this.searchService.updateQueryDelayed("", () => {});

        if (this.selectedOption && this.optionTemplate) {
            this.drawTemplate(this._optionTemplateSibling, this.selectedOption);
        }
    }
}