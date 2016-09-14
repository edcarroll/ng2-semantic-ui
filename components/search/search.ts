import {Component, Directive, HostListener, HostBinding, ElementRef, AfterViewInit, ViewChild, EventEmitter, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {SuiDropdownMenu} from "../dropdown/dropdown-menu";
import {Input, Output} from "@angular/core";
import {SuiSearchService} from "./search.service";

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
        <div class="title">{{ result(i) }}</div>
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
    private _searchService:SuiSearchService = new SuiSearchService();

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
    public get optionsField() {
        return this._searchService.optionsField;
    }

    public set optionsField(value:string) {
        this._searchService.optionsField = value;
    }

    @Output()
    public get selectedOptionChange() {
        return this._searchService.selectedOptionChange;
    }

    @Output()
    public get onItemSelected() {
        return this._searchService.onItemSelected;
    }

    @HostBinding('class.loading')
    public get loading() {
        return this._searchService.loading;
    }

    @HostBinding('class.visible')
    @Input()
    public get isOpen():boolean {
        return this._searchService.dropdown.isOpen;
    }

    public set isOpen(value:boolean) {
        this._searchService.dropdown.isOpen = value;
    }

    @HostBinding('class.disabled')
    @Input()
    public get isDisabled():boolean {
        return this._searchService.dropdown.isDisabled;
    }

    public set isDisabled(value:boolean) {
        this._searchService.dropdown.isDisabled = value;
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
        this._searchService.query = value;
    }

    private get results():Array<any> {
        return this._searchService.results;
    }

    constructor(el:ElementRef) {
        this._searchService.dropdown.dropdownElement = el;
        this._searchService.dropdown.itemClass = "result";
        this._searchService.dropdown.itemSelectedClass = "active";
    }

    private search(callback?:Function):void {
        this._searchService.search(callback);
    }

    private result(i:number):any {
        return this._searchService.readValue(this.results[i]);
    }

    public select(result:any):void {
        this._searchService.select(result);
    }

    public writeValue(value:any) {
        this._searchService.selectedOption = value;
        this.query = this._searchService.readValue(value);
    }

    public ngAfterViewInit():void {
        this._dropdownMenu.service = this._searchService.dropdown;
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this._searchService.dropdown.menuElement.nativeElement.contains(event.target)){
            if (!this.isOpen && this.query) {
                if (this.results.length) {
                    this.isOpen = true;
                }
                this._searchService.loading = true;
                this.search(() => {
                    this.isOpen = true;
                    this._searchService.loading = false;
                });
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
