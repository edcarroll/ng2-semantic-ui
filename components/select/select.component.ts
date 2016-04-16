import {Component, Directive, Provider, Input, ViewChild, HostBinding, ElementRef, HostListener, forwardRef} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';
import {Search, SearchValueAccessor} from '../search';
import {DropdownMenu} from '../dropdown';

@Component({
    selector: 'sui-select',
    directives: [DropdownMenu],
    inputs: ['placeholder', 'options', 'optionsField', 'isSearchable', 'searchDelay', 'isDisabled'],
    outputs: ['selectedOptionChange'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
    template: `
<i class="dropdown icon"></i>
<input *ngIf="isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query">
<div *ngIf="!selectedOption" class="default text" [class.filtered]="query" (click)="focus()">{{ placeholder }}</div>
<div *ngIf="selectedOption" class="text" [class.filtered]="query" [innerHTML]="selectedOptionHTML"></div>
<div class="menu" suiDropdownMenu>
    <ng-content></ng-content>
    <div *ngIf="!results.length" class="message">No Results</div>
</div>
`
})
export class Select extends Search {
    @ViewChild(DropdownMenu) protected _menu:DropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.selection')
    @HostBinding('class.dropdown') searchClasses = true;

    @HostBinding('class.search')
    public isSearchable:boolean = false;
    protected searchDelay:number = 0;
    @HostBinding('class.loading')
    protected _loading:boolean = false;
    public placeholder:string = "Select one";
    public selectedOptionHTML:string;

    @HostBinding('class.active')
    public get isOpen():boolean {
        return this._service.isOpen;
    }

    public set isOpen(value:boolean) {
        this._service.isOpen = value;
    }

    protected get results():Array<any> {
        if (this.isSearchable || this._optionsLookup) {
            return this._results;
        }
        return this.options;
    }

    constructor(private el:ElementRef) {
        super(el);
        this._allowEmptyQuery = true;

        this._service.itemClass = "item";
        this._service.itemSelectedClass = "selected";

        this._service.isOpenChange.subscribe((isOpen:boolean) => {
            if (isOpen) {
                if (this.isSearchable) {
                    this._service.selectNextItem();
                }
            }
            else {
                if (this.query) {
                    if (this._service.selectedItem) {
                        (<HTMLElement> this._service.selectedItem).click();
                        return;
                    }
                    this._query = "";
                }
            }
        });
    }

    public selectOption(result:any, valueHTML:string):void {
        super.select(result);
        this._query = "";
        this.selectedOptionHTML = valueHTML;
    }

    private focus() {
        if (this.isSearchable) {
            this._service.dropdownElement.nativeElement.querySelector("input").focus();
        }
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this._service.menuElement.nativeElement.contains(event.target)){
            if (!this.isOpen) {
                this.search(() => {
                    this._loading = false;
                    this.isOpen = true;
                });
            }
            else if ((<Element> event.target).tagName != "INPUT") {
                this.isOpen = false;
            }
        }
        return false;
    }
}

@Component({
    selector: 'sui-select-option',
    template: `<ng-content></ng-content>`
})
export class SelectOption {
    @HostBinding('class.item') itemClass = true;

    @Input()
    public value:any;

    constructor(private host:Select, private el:ElementRef) { }

    @HostListener('click')
    public click():boolean {
        this.host.selectOption(this.value, this.el.nativeElement.innerHTML);
        return false;
    }
}

const CUSTOM_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => SelectValueAccessor), multi: true});

@Directive({
    selector: 'sui-select',
    host: {'(selectedOptionChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SelectValueAccessor extends SearchValueAccessor implements ControlValueAccessor {
    constructor(host:Select) {
        super(<Search> host);
    }
}