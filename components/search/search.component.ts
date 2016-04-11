import {Component, Directive, Provider, HostBinding, ElementRef, AfterViewInit, ViewChild, EventEmitter, forwardRef} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';
import {Dropdown, DropdownMenu} from '../dropdown';
import {TemplateComponent} from '../template/template.component';

@Component({
    selector: 'sui-search',
    directives: [DropdownMenu, TemplateComponent],
    inputs: ['placeholder', 'options', 'searchDelay', 'templateId', 'templateUrl'],
    outputs: ['selectedOptionChange'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
    template: `
<input class="prompt" type="text" [attr.placeholder]="placeholder" autocomplete="off" [(ngModel)]="query">
<div class="results" suiDropdownMenu>
    <a class="result" *ngFor="#result of results; #i = index" (click)="select(result)">
        <sui-template *ngIf="templateId || templateUrl" [id]="templateId" [url]="templateUrl" [context]="{ result: result }"></sui-template>
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
    public options:Array<any> = [];
    public searchDelay:number = 300;
    public templateId:string;
    public templateUrl:string;

    public selectedOption:any;
    public selectedOptionChange:EventEmitter<any> = new EventEmitter(false);

    private _query:string = "";
    private _queryTimer:number;

    private get query():string {
        return this._query;
    }

    private set query(value:string) {
        clearTimeout(this._queryTimer);
        if (value) {
            this._queryTimer = setTimeout(() => this.search(value), this.searchDelay);
        }
        else {
            this.isOpen = false;
        }
    }

    private get results():Array<any> {
        return this.options.filter((o:string) => o.slice(0, this.query.length) == this.query);
    }

    constructor(el:ElementRef) {
        super(el);
        this._service.itemClass = "result";
        this._service.itemSelectedClass = "active";
    }

    private search(value:string):void {
        this._query = value;
        this.isOpen = true;
    }

    private select(result:any):void {
        this.selectedOption = result;
        this.selectedOptionChange.emit(this.selectedOption);
        this._query = this.selectedOption;
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
    onChange = () => {};
    onTouched = () => {};

    constructor(private host: Search) { }

    writeValue(value: any): void {
        this.host.writeValue(value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}