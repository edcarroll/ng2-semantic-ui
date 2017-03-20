import {Component, ViewChild, HostBinding, ElementRef, HostListener, Input, ContentChildren, QueryList, ViewChildren, AfterContentInit, EventEmitter, Output} from '@angular/core';
import {DropdownService} from '../dropdown/dropdown.service';
import {SearchService} from '../search/search.service';
import {RecursiveObject, readValue} from '../util/util';
import {PositioningService, PositioningPlacement} from '../util/positioning.service';
import {SuiDropdownMenu, SuiDropdownMenuItem} from '../dropdown/dropdown-menu';
import {SuiSelectOption} from './select-option';
import {Subscription} from 'rxjs';

@Component({
    selector: 'new-sui-select',
    template: `
<i class="dropdown icon"></i>
<div *ngIf="selectedOption" class="text">
    <span>{{ labelGetter(selectedOption) }}</span>
</div>
<!-- Select dropdown menu -->
<div class="menu" suiDropdownMenu>
    <ng-content></ng-content>
    <!-- <div class="message">No Results</div> -->
</div>
`
})
export class SuiSelect<T extends RecursiveObject> implements AfterContentInit {
    public dropdownService:DropdownService;
    public searchService:SearchService<T>;

    @ViewChild(SuiDropdownMenu)
    private _menu:SuiDropdownMenu;

    @ContentChildren(SuiSelectOption, { descendants: true })
    private _renderedOptions:QueryList<SuiSelectOption<T>>;

    private _renderedSubscriptions:Subscription[];

    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding('class.ui')
    @HostBinding('class.selection')
    @HostBinding('class.dropdown')
    private _selectClasses:boolean;

    @HostBinding('class.active')
    public get isActive() {
        return this.dropdownService.isOpen;
    }

    @Input()
    public set options(options:T[]) {
        this.searchService.options = options;
    }

    public get availableOptions() {
        return this.searchService.results;
    }

    @Input()
    public labelField:string;

    private get labelGetter() {
        return (obj:T) => readValue(obj, this.labelField).toString();
    }

    public selectedOption:T;

    @Output()
    public selectedOptionChange:EventEmitter<T>;

    constructor(private _element:ElementRef) {
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService<T>(true);

        this._renderedSubscriptions = [];

        this.selectedOptionChange = new EventEmitter<T>();

        this._selectClasses = true;
    }

    public ngAfterContentInit() {
        this._menu.service = this.dropdownService;
        this._menu.items = this._renderedOptions;

        this.onAvailableOptionsRendered();
        this._renderedOptions.changes.subscribe(() => this.onAvailableOptionsRendered());
    }

    private onAvailableOptionsRendered() {
        this._renderedSubscriptions.forEach(rs => rs.unsubscribe());
        this._renderedSubscriptions = [];
        this._renderedOptions.forEach(ro => {
            ro.readLabel = this.labelGetter;
            this._renderedSubscriptions.push(ro.onSelected.subscribe(() => this.selectOption(ro.value)));
        });
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        e.stopPropagation();

        this.dropdownService.toggleOpenState();
    }

    public selectOption(option:T) {
        this.selectedOption = option;
        this.selectedOptionChange.emit(option);

        this.dropdownService.setOpenState(false);
    }
}