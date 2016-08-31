import {Component, Directive, HostListener, HostBinding, ElementRef, AfterViewInit, ViewChild, EventEmitter, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {SuiDropdownMenu} from "../dropdown/dropdown-menu";
import {SuiDropdown} from "../dropdown/dropdown";

@Component({
    selector: 'sui-search',
    exportAs: 'suiSearch',
    inputs: ['placeholder', 'options', 'optionsField', 'searchDelay', 'icon'],
    outputs: ['selectedOptionChange', 'onItemSelected'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
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
export class SuiSearch extends SuiDropdown implements AfterViewInit {
    @ViewChild(SuiDropdownMenu) protected _menu:SuiDropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.search') searchClasses = true;

    public placeholder:string = "Search...";
    public searchDelay:number = 200;
    public icon:boolean = true;
    public optionsField:string;

    public selectedOption:any;
    public selectedOptionChange:EventEmitter<any> = new EventEmitter(false);
    public onItemSelected:EventEmitter<any> = new EventEmitter(false);

    protected _options:Array<any> = [];
    protected _optionsLookup:((query:string) => Promise<any>);
    protected _allowEmptyQuery:boolean = false;
    protected _query:string = "";
    protected _queryTimer:any;
    protected _results:Array<any> = [];
    protected _resultsCache:any = {};
    @HostBinding('class.loading')
    protected _loading:boolean = false;

    public get options():any {
        return this._options;
    }

    public set options(value:any) {
        if (typeof(value) == "function") {
            this._optionsLookup = <((query:string) => Promise<any>)>value;
            return;
        }
        this._options = <Array<any>> value;
    }

    protected get query():string {
        return this._query;
    }

    protected set query(value:string) {
        this._query = value;
        clearTimeout(this._queryTimer);
        if (value || this._allowEmptyQuery) {
            this._queryTimer = setTimeout(() => {
                this.search(() => {
                    this.isOpen = true;
                });
            }, this.searchDelay);
            return;
        }
        if (!this._allowEmptyQuery) {
            this.isOpen = false;
        }
    }

    protected get results():Array<any> {
        return this._results;
    }

    constructor(el:ElementRef) {
        super(el);
        this._service.itemClass = "result";
        this._service.itemSelectedClass = "active";
    }

    protected search(callback?:Function):void {
        this._loading = true;
        if (this._optionsLookup) {
            if (this._resultsCache[this._query]) {
                this._results = this._resultsCache[this._query];
                this._loading = false;
                if (callback) {
                    callback();
                }
                return;
            }

            this._optionsLookup(this._query).then((results:Array<any>) => {
                this._resultsCache[this._query] = results;
                this.search(callback);
            });
            return;
        }
        this._results = this.options.filter((o:string) => this.readValue(o).toString().slice(0, this.query.length).toLowerCase() == this.query.toLowerCase());
        this._loading = false;
        if (callback) {
            callback();
        }
    }

    private result(i:number):any {
        return this.readValue(this._results[i]);
    }

    //noinspection JSMethodCanBeStatic
    protected deepValue(object:any, path:string) {
        if (!object) { return; }
        if (!path) { return object; }
        for (var i = 0, p = path.split('.'), len = p.length; i < len; i++){
            object = object[p[i]];
        }
        return object;
    }

    public readValue(object:any) {
        return this.deepValue(object, this.optionsField);
    }

    public select(result:any):void {
        this.selectedOption = result;
        this.selectedOptionChange.emit(result);
        this.onItemSelected.emit(result);
        this._query = this.readValue(result);
        this.isOpen = false;
    }

    public writeValue(value:any) {
        this.selectedOption = value;
        this._query = this.readValue(value);
    }

    public ngAfterContentInit():void {
        //Override this
        return;
    }

    public ngAfterViewInit():void {
        this._menu.service = this._service;
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this._service.menuElement.nativeElement.contains(event.target)){
            if (!this.isOpen && this.query) {
                if (this.results.length) {
                    this.isOpen = true;
                }
                this._loading = true;
                this.search(() => {
                    this.isOpen = true;
                    this._loading = false;
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
