import {Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener, EventEmitter, Output, forwardRef, Directive, ElementRef} from '@angular/core';
import {DropdownService} from '../dropdown/dropdown.service';
import {SuiDropdownMenu} from '../dropdown/dropdown-menu';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {SearchService, LookupFn} from './search.service';
import {readValue, JavascriptObject} from '../util/util';
import {PositioningService, PositioningPlacement} from '../util/positioning.service';
import {element} from 'protractor';

@Component({
    selector: 'sui-search',
    template: `
<div class="ui input" [class.icon]="hasIcon">
    <input class="prompt" type="text" [attr.placeholder]="placeholder" autocomplete="off" [(ngModel)]="query">
    <i *ngIf="hasIcon" class="search icon"></i>
  </div>
<div class="results" suiDropdownMenu transition="scale" selectedItemClass="active">
    <a class="result item" *ngFor="let r of results" (click)="select(r)">
        <span *ngIf="!searchService.optionsLookup" [innerHTML]="searchService.highlightMatches(r)"></span>
        <span *ngIf="searchService.optionsLookup">{{ readValue(r) }}</span>
    </a>
    <div *ngIf="results.length == 0" class="message empty">
        <div class="header">No Results</div>
        <div class="description">Your search returned no results.</div>
    </div>
</div>
`,
    styles: [`
:host {
    display: inline-block;
}

.results {
    margin-bottom: .5em;
}
`]
})
export class SuiSearch<T extends JavascriptObject> implements AfterViewInit {
    public dropdownService:DropdownService;
    public searchService:SearchService<T>;
    public position:PositioningService;

    @ViewChild(SuiDropdownMenu)
    private _menu:SuiDropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.search')
    private _searchClasses:boolean;

    @HostBinding('class.active')
    public get isActive() {
        return this.dropdownService.isOpen;
    }

    @Input()
    public hasIcon:boolean;

    @Input()
    public placeholder:string;

    public get query() {
        return this.searchService.query;
    }

    public set query(query:string) {
        this.selectedItem = null;
        this.searchService.updateQueryDelayed(query, () => this.dropdownService.setOpenState(this.searchService.query.length > 0));
    }

    @Input()
    public set options(options:T[] | LookupFn<T>) {
        if (typeof(options) == "function") {
            this.searchService.optionsLookup = options;
            return;
        }
        this.searchService.options = options;
    }

    @Input()
    public set optionsField(field:string) {
        this.searchService.optionsField = field;
    }

    @Input()
    public set searchDelay(delay:number) {
        this.searchService.searchDelay = delay;
    }

    @HostBinding('class.loading')
    public get isSearching() {
        return this.searchService.isSearching;
    }

    public get results() {
        return this.searchService.results;
    }

    public selectedItem:T;

    @Output()
    public onItemSelected:EventEmitter<T>;

    public get ngModelChange() {
        return this.onItemSelected;
    }

    constructor(private _element:ElementRef) {
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService<T>();

        this._searchClasses = true;
        this.hasIcon = true;
        this.placeholder = "Search...";

        this.searchDelay = 200;

        this.onItemSelected = new EventEmitter<T>();
    }

    public ngAfterViewInit() {
        this._menu.service = this.dropdownService;

        this.position = new PositioningService(this._element, this._menu.element, PositioningPlacement.BottomLeft);
    }

    public select(item:T) {
        this.writeValue(item);
        this.onItemSelected.emit(item);
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        e.stopPropagation();

        if (this.searchService.query.length > 0) {
            this.dropdownService.setOpenState(true);
        }
    }

    public readValue(object:T) {
        return readValue(object, this.searchService.optionsField);
    }

    public writeValue(item:T) {
        if (item) {
            this.selectedItem = item;
            this.searchService.updateQuery(this.readValue(item) as string, () => {});
        }
    }
}

export const SELECT_VALUE_ACCESSOR:any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiSearchValueAccessor),
    multi: true
};

@Directive({
    selector: 'sui-search',
    host: {
        '(onItemSelected)': 'onChange($event)'
    },
    providers: [SELECT_VALUE_ACCESSOR]
})
export class SuiSearchValueAccessor<T extends JavascriptObject> implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host:SuiSearch<T>) {}

    writeValue(value:T) {
        this.host.writeValue(value);
    }

    registerOnChange(fn:() => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn:() => void) {
        this.onTouched = fn;
    }
}