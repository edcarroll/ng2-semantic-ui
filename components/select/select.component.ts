import {Component, Directive, Provider, Input, ViewChild, HostBinding, ElementRef, HostListener, forwardRef} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';
import {Search, SearchValueAccessor} from '../search';
import {DropdownMenu} from '../dropdown';

@Component({
    selector: 'sui-select',
    directives: [DropdownMenu],
    inputs: ['placeholder', 'options', 'optionsField', 'searchDelay', 'icon'],
    outputs: ['selectedOptionChange'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
    template: `
<i *ngIf="icon" class="dropdown icon"></i>
<input class="search" type="text" autocomplete="off" [(ngModel)]="query" #searchBox>
<div *ngIf="!selectedOption" class="default text" [class.filtered]="query" (click)="focus(searchBox)">{{ placeholder }}</div>
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
    @HostBinding('class.search')
    @HostBinding('class.selection')
    @HostBinding('class.dropdown') searchClasses = true;

    @HostBinding('class.loading')
    protected _loading:boolean = false;
    public selectedOptionHTML:string;

    @HostBinding('class.active')
    public get isOpen():boolean {
        return this._service.isOpen;
    }

    public set isOpen(value:boolean) {
        this._service.isOpen = value;
    }

    constructor(private el:ElementRef) {
        super(el);
        this._allowEmptyQuery = true;

        this._service.itemClass = "item";
        this._service.itemSelectedClass = "selected";

        this._service.isOpenChange.subscribe((isOpen:boolean) => {
            if (isOpen) {
                if (!this.query) {
                    this.search(() => {
                        this._loading = false;
                    });
                }
                this._service.selectNextItem();
            }
            else {
                if (this.query) {
                    if (this._service.selectedItem) {
                        (<HTMLElement> this._service.selectedItem).click();
                    }
                    else {
                        this._query = "";
                    }
                }
            }
        });
    }

    public selectOption(result:any, valueHTML:string):void {
        super.select(result);
        this._query = "";
        this.selectedOptionHTML = valueHTML;
    }

    //noinspection JSMethodCanBeStatic
    private focus(el:HTMLElement) {
        el.focus();
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        return super.click(event);
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