import {Component, Directive, Provider, Input, ViewChild, HostBinding, ElementRef, HostListener, forwardRef} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';
import {Search, SearchValueAccessor} from '../search';
import {DropdownMenu} from '../dropdown';
import {KEYCODE} from '../dropdown/dropdown.service';

@Component({
    selector: 'sui-select',
    directives: [DropdownMenu],
    inputs: ['placeholder', 'options', 'optionsField', 'isSearchable', 'searchDelay', 'isDisabled', 'allowMultiple'],
    outputs: ['selectedOptionChange'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
    template: `
<i class="dropdown icon"></i>
<!-- Multi-select labels -->
<a *ngFor="#selected of selectedOptions; #i = index" class="ui label" (click)="selectedOptionClick($event)">
    <content [innerHTML]="selectedOptionsHTML[i]"></content>
    <i class="delete icon" (click)="deselectOption(selected); selectedOptionClick($event)"></i>
</a>
<!-- Search input box -->
<input *ngIf="isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query" (keydown)="searchKeyDown($event)">
<!-- Single-select label -->
<div *ngIf="!selectedOption" class="default text" [class.filtered]="query">{{ placeholder }}</div>
<div *ngIf="selectedOption" class="text" [class.filtered]="query" [innerHTML]="selectedOptionHTML"></div>
<!-- Select dropdown menu -->
<div class="menu" suiDropdownMenu>
    <ng-content></ng-content>
    <div *ngIf="!results.length" class="message">No Results</div>
</div>
`,
    styles: [`:host input.search { width: 12em !important; }`]
})
export class Select extends Search {
    @ViewChild(DropdownMenu) protected _menu:DropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.selection')
    @HostBinding('class.dropdown') searchClasses = true;

    @HostBinding('class.search')
    public isSearchable:boolean = false;
    @HostBinding('class.multiple')
    public allowMultiple:boolean = false;
    protected searchDelay:number = 0;
    @HostBinding('class.loading')
    protected _loading:boolean = false;
    public placeholder:string = "Select one";
    public selectedOptionHTML:string;

    public selectedOptions:any = [];
    public selectedOptionsHTML:Array<string> = [];

    @HostBinding('class.active')
    public get isOpen():boolean {
        return this._service.isOpen;
    }

    public set isOpen(value:boolean) {
        this._service.isOpen = value;
    }

    protected get results():Array<any> {
        var results = this.options;
        if (this.isSearchable || this._optionsLookup) {
            results = this._results;
        }
        if (this.allowMultiple) {
            results =  results.filter(r => (this.selectedOptions || []).indexOf(r) == -1);
        }
        return results;
    }

    constructor(private el:ElementRef) {
        super(el);
        this._allowEmptyQuery = true;

        this._service.autoClose = "outsideClick";

        this._service.itemClass = "item";
        this._service.itemSelectedClass = "selected";

        this._service.isOpenChange.subscribe((isOpen:boolean) => {
            if (isOpen) {
                if (this.isSearchable && !this._service.selectedItem) {
                    this._service.selectNextItem();
                }
            }
            else {
                if (this.query && !this.allowMultiple) {
                    if (this._service.selectedItem) {
                        (<HTMLElement> this._service.selectedItem).click();
                        return;
                    }
                    this._query = "";
                }
            }
        });
    }

    public selectOption(option:any, valueHTML:string):void {
        if (!this.allowMultiple) {
            super.select(option);
            this.selectedOptionHTML = valueHTML;
        }
        else {
            this.selectedOptions = this.selectedOptions || [];
            this.selectedOptions.push(option);
            this.selectedOptionsHTML.push(valueHTML);

            this.selectedOptionChange.emit(this.selectedOptions);
            this.onItemSelected.emit(option);
        }
        if (this.isSearchable) {
            this.focusFirstItem();
            this.focusSearch();
        }
        this._query = "";
        if (this.isSearchable) {
            this.search(() => {});
        }
    }

    public deselectOption(option:any) {
        var index = this.selectedOptions.indexOf(option);
        this.selectedOptions.splice(index, 1);
        this.selectedOptionsHTML.splice(index, 1);
        this.selectedOptionChange.emit(this.selectedOptions);
    }

    //noinspection JSMethodCanBeStatic
    private selectedOptionClick(event) {
        event.stopPropagation();
    }

    private focusSearch() {
        if (this.isSearchable) {
            this._service.dropdownElement.nativeElement.querySelector("input").focus();
        }
    }

    private focusFirstItem() {
        setTimeout(() => {
            this._service.selectedItem = null;
            this._service.selectNextItem();
        })
    }

    public writeValue(value:any) {
        if (this.allowMultiple) {
            this.selectedOptions = value;
            return;
        }
        this.selectedOption = value;
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this._service.menuElement.nativeElement.contains(event.target)){
            if (!this.isOpen) {
                this.search(() => {
                    this._loading = false;
                    this.isOpen = true;
                    this.focusSearch();
                });
            }
            else if ((<Element> event.target).tagName != "INPUT") {
                this.isOpen = false;
            }
        }
        return false;
    }

    public searchKeyDown(event) {
        if (event.which == KEYCODE.BACKSPACE && !this._query) {
            var selectedOptions = this.selectedOptions || [];
            var lastSelectedOption = selectedOptions[selectedOptions.length - 1];
            if (lastSelectedOption) {
                this.deselectOption(lastSelectedOption);
            }
        }
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

    @HostListener('click', ['$event'])
    public click(event):boolean {
        event.stopPropagation();
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