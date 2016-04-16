import {Component, Directive, Provider, HostBinding, ElementRef, AfterViewInit, ViewChild, EventEmitter, forwardRef} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';
import {Dropdown, DropdownMenu} from '../dropdown';

@Component({
    selector: 'sui-search',
    directives: [DropdownMenu],
    inputs: ['placeholder', 'options', 'optionsField', 'searchDelay', 'icon'],
    outputs: ['selectedOptionChange'],
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
    <a class="result" *ngFor="#r of results; #i = index" (click)="select(r)">
        <div class="title">{{ result(i) }}</div>
    </a>
    <div *ngIf="!results.length" class="message empty">
        <div class="header">No Results</div>
        <div class="description">Your search returned no results.</div>
    </div>
</div>
`
})
export class Search extends Dropdown implements AfterViewInit {
    @ViewChild(DropdownMenu) protected _menu:DropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.search') searchClasses = true;

    public placeholder:string = "Search...";
    public searchDelay:number = 200;
    public icon:boolean = true;
    public optionsField:string;

    public selectedOption:any;
    public selectedOptionChange:EventEmitter<any> = new EventEmitter(false);

    private _options:Array<any> = [];
    private _optionsLookup:((query:string) => Promise<any>);
    protected _allowEmptyQuery:boolean = false;
    protected _query:string = "";
    private _queryTimer:any;
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
                    this._loading = false;
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

    protected search(callback:Function):void {
        this._loading = true;
        if (this._optionsLookup) {
            if (this._resultsCache[this._query]) {
                this._results = this._resultsCache[this._query];
                callback();
                return;
            }

            this._optionsLookup(this._query).then((results:Array<any>) => {
                this._resultsCache[this._query] = results;
                this.search(callback);
            });
            return;
        }
        this._results = this.options.filter((o:string) => this.deepValue(o, this.optionsField).slice(0, this.query.length).toLowerCase() == this.query.toLowerCase());
        callback();
    }

    private result(i:number):any {
        return this.deepValue(this._results[i], this.optionsField);
    }

    //noinspection JSMethodCanBeStatic
    protected deepValue(object:any, path:string) {
        if (!path) { return object; }
        for (var i = 0, p = path.split('.'), len = p.length; i < len; i++){
            object = object[p[i]];
        }
        return object;
    }

    public select(result:any):void {
        this.selectedOption = result;
        this.selectedOptionChange.emit(this.selectedOption);
        this._query = this.deepValue(this.selectedOption, this.optionsField);
        this.isOpen = false;
    }

    public writeValue(value:any) {
        this.selectedOption = value;
    }

    public ngAfterContentInit():void {
        //Override this
        return;
    }

    public ngAfterViewInit():void {
        this._menu.service = this._service;
    }
}

const CUSTOM_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => SearchValueAccessor), multi: true});

@Directive({
    selector: 'sui-search',
    host: {'(selectedOptionChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SearchValueAccessor implements ControlValueAccessor {
    protected host:Search;

    onChange = () => {};
    onTouched = () => {};

    constructor(host:Search) {
        this.host = host;
    }

    writeValue(value: any): void {
        this.host.writeValue(value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}