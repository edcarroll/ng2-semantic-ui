import {Component, Directive, HostListener, HostBinding, ElementRef, AfterViewInit, ViewChild, EventEmitter, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {SuiDropdownMenu} from "../dropdown/dropdown-menu";
import {Input, Output} from "@angular/core";
import {SuiSearchService} from "./search.service";
import {SuiDropdownService} from "../dropdown/dropdown.service";

@Component({
    selector: 'sui-search',
    exportAs: 'suiSearch',
    template: `
<div class="ui icon input">
    <input class="prompt" type="text" [attr.placeholder]="placeholder" autocomplete="off" [(ngModel)]="query">
    <i *ngIf="icon" class="search icon"></i>
  </div>
<div class="results" suiDropdownMenu>
    <a class="result" *ngFor="let r of results; let i = index" (click)="select(r)">
        <div *ngIf="highlightMatch" class="title" [innerHTML]="highlight(result(i))"></div>
        <div *ngIf="!highlightMatch" class="title">{{ result(i) }}</div>
    </a>
    <div *ngIf="!results.length" class="message empty">
        <div class="header">No Results</div>
        <div class="description">Your search returned no results.</div>
    </div>
</div>
`
})
export class SuiSearch implements AfterViewInit {
    @ViewChild(SuiDropdownMenu)
    private _dropdownMenu:SuiDropdownMenu;
    private _dropdownService:SuiDropdownService = new SuiDropdownService();
    private _searchService:SuiSearchService = new SuiSearchService();

    public selectedOption:any;

    constructor(el:ElementRef) {
        this._dropdownService.dropdownElement = el;
        this._dropdownService.itemClass = "result";
        this._dropdownService.itemSelectedClass = "active";

        this._dropdownService.isOpenChange
            .subscribe( (isOpen: boolean) => {
                if (isOpen) {
                    if (!this._dropdownService.selectedItem) {
                        this._dropdownService.selectNextItem();
                    }
                }
            });

        this._searchService.onSearchCompleted
            .subscribe(() => {
                this._dropdownService.isOpen = true;
            });
    }

    @HostBinding('class.ui')
    @HostBinding('class.search')
    public searchClasses = true;

    @Input()
    public placeholder:string = "Search...";

    @Input()
    public get searchDelay() {
        return this._searchService.searchDelay;
    }

    public set searchDelay(value:number) {
        this._searchService.searchDelay = value;
    }

    @Input()
    public icon:boolean = true;

    @Input()
    public highlightMatch:boolean = true;

    @Input()
    public get optionsField() {
        return this._searchService.optionsField;
    }

    public set optionsField(value:string) {
        this._searchService.optionsField = value;
    }

    @Output()
    public selectedOptionChange:EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public onItemSelected:EventEmitter<any> = new EventEmitter<any>();

    @HostBinding('class.loading')
    public get loading() {
        return this._searchService.loading;
    }

    @HostBinding('class.visible')
    public get isVisible() {
        return this._dropdownService.transition.isVisible;
    }

    @HostBinding('class.active')
    @Input()
    public get isOpen():boolean {
        return this._dropdownService.isOpen;
    }

    public set isOpen(value:boolean) {
        this._dropdownService.isOpen = value;
    }

    @HostBinding('class.disabled')
    @Input()
    public get isDisabled():boolean {
        return this._dropdownService.isDisabled;
    }

    public set isDisabled(value:boolean) {
        this._dropdownService.isDisabled = value;
    }

    @Input()
    public get options():any {
        return this._searchService.options;
    }

    public set options(value:any) {
        this._searchService.options = value;
    }

    private get query():string {
        return this._searchService.query;
    }

    private set query(value:string) {
        this._searchService.updateQuery(value);
    }

    private get results():Array<any> {
        return this._searchService.results;
    }

    private search():void {
        this._searchService.search();
    }

    private result(i:number):any {
        return this._searchService.readValue(this.results[i]);
    }

    public highlight(result:string){
        return result.replace(new RegExp(this.query,'i'), function(str) {return '<mark>'+str+'</mark>'});
    }

    public select(result:any):void {
        this.selectedOption = result;
        this.selectedOptionChange.emit(result);
        this.onItemSelected.emit(result);
        this._searchService.updateQuery(this._searchService.readValue(result), false);
        this._dropdownService.isOpen = false;
    }

    public writeValue(value:any) {
        this.selectedOption = value;
        this._searchService.updateQuery(this._searchService.readValue(value), false);
    }

    public ngAfterViewInit():void {
        this._dropdownMenu.service = this._dropdownService;
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this._dropdownService.menuElement.nativeElement.contains(event.target)){
            if (!this.isOpen && this.query) {
                if (this.results.length) {
                    this.isOpen = true;
                }
                this.search();
            }
        }
        return false;
    }
}

export const CUSTOM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiSearchValueAccessor),
    multi: true
};

@Directive({
    selector: 'sui-search',
    host: {'(selectedOptionChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SuiSearchValueAccessor implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host:SuiSearch) {}

    writeValue(value: any): void {
        this.host.writeValue(value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

export const SUI_SEARCH_DIRECTIVES = [SuiSearch, SuiSearchValueAccessor];
