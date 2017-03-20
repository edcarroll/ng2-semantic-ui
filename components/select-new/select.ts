import {Component, ViewChild, HostBinding, ElementRef, HostListener, Input, ContentChildren, QueryList, ViewChildren, AfterContentInit, EventEmitter, Output, Renderer, TemplateRef, ViewContainerRef} from '@angular/core';
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

    @HostBinding('class.search')
    @Input()
    public isSearchable:boolean;

    @ViewChild('queryInput')
    private _queryInput:ElementRef;

    @Input()
    public placeholder:string;

    @Input()
    public set options(options:T[]) {
        this.searchService.options = options;
    }

    public get availableOptions() {
        return this.searchService.results;
    }

    public get query() {
        return this.searchService.query;
    }

    public set query(query:string) {
        this.selectedOption = null;
        this.searchService.updateQuery(query, () =>
            this.dropdownService.setOpenState(true));
    }

    @Input()
    public labelField:string;

    private get labelGetter() {
        return (obj:T) => readValue(obj, this.labelField) as string;
    }

    @Input()
    public optionTemplate:TemplateRef<any>;

    @ViewChild('optionTemplateSibling', { read: ViewContainerRef })
    private _optionTemplateSibling:ViewContainerRef;

    public selectedOption:T;

    @Output()
    public selectedOptionChange:EventEmitter<T>;

    constructor(private _element:ElementRef, private _renderer:Renderer) {
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService<T>(true);

        this.isSearchable = false;
        this.placeholder = "Select one";

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
        setTimeout(() => {
            this._renderedOptions.forEach(ro => {
                ro.usesTemplate = !!this.optionTemplate;
                ro.readLabel = this.labelGetter;

                if (ro.usesTemplate) {
                    this.drawTemplate(ro.templateSibling, ro.value);
                }

                this._renderedSubscriptions.push(ro.onSelected.subscribe(() => this.selectOption(ro.value)));
            });
        });
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        e.stopPropagation();
        
        this._renderer.invokeElementMethod(this._queryInput.nativeElement, "focus");

        this.dropdownService.toggleOpenState();
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

    private drawTemplate(siblingRef:ViewContainerRef, value:T) {
        siblingRef.clear();
        siblingRef.createEmbeddedView(this.optionTemplate, { '$implicit': value });
    }
}