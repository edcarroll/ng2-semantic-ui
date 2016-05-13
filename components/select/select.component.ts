import {Component, Directive, Provider, ViewChild, HostBinding, ElementRef, HostListener, OnInit, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/common';
import {Search, SearchValueAccessor} from '../search';
import {SelectOption} from './select-option.component';
import {DropdownMenu} from '../dropdown';
import {KEYCODE} from '../dropdown/dropdown.service';

@Component({
    selector: 'sui-select',
    directives: [DropdownMenu],
    inputs: ['placeholder', 'options', 'optionsField', 'isSearchable', 'searchDelay', 'isDisabled', 'allowMultiple', 'maxSelected'],
    outputs: ['selectedOptionChange'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
    template: `
<i class="dropdown icon"></i>
<!-- Multi-select labels -->
<a *ngFor="let selected of selectedOptions; let i = index" class="ui label" (click)="selectedOptionClick($event)">
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
    <div *ngIf="!results.length && !maxSelectedReached" class="message">No Results</div>
    <div *ngIf="!results.length && maxSelectedReached" class="message">Max {{ maxSelected }} selections</div>
</div>
`,
    styles: [`:host input.search { width: 12em !important; } .selected-results { display: none; }`]
})
export class Select extends Search implements OnInit {
    @ViewChild(DropdownMenu) protected _menu:DropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.selection')
    @HostBinding('class.dropdown') searchClasses = true;

    @HostBinding('class.search')
    public isSearchable:boolean = false;
    @HostBinding('class.multiple')
    public allowMultiple:boolean = false;
    public searchDelay:number = 0;
    @HostBinding('class.loading')
    protected _loading:boolean = false;
    public placeholder:string = "Select one";
    public selectedOptionHTML:string;

    public selectedOptions:any = [];
    public selectedOptionsHTML:Array<string> = [];
    public maxSelected:number;
    private maxSelectedReached:boolean = false;

    public renderedOptions:Array<SelectOption> = [];

    @HostBinding('class.active')
    public get isOpen():boolean {
        return this._service.isOpen;
    }

    public set isOpen(value:boolean) {
        this._service.isOpen = value;
    }

    protected get results():Array<any> {
        this.maxSelectedReached = false;
        var results = this.options;
        if (this.isSearchable || this._optionsLookup) {
            results = this._results;
        }
        if (this.allowMultiple) {
            results = results.filter((r:any) => (this.selectedOptions || []).indexOf(r) == -1);
            if (this.selectedOptions && this.maxSelected == this.selectedOptions.length) {
                this.maxSelectedReached = true;
                results = [];
            }
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

    public ngOnInit():void {
        if (this.isSearchable) {
            //Initialise initial results
            this.search();
        }
    }

    public selectOption(selectOption:SelectOption):void {
        if (!this.allowMultiple) {
            super.select(selectOption.value);
            this.selectedOptionHTML = selectOption.HTML;
        }
        else {
            this.selectedOptions = this.selectedOptions || [];
            this.selectedOptions.push(selectOption.value);
            this.selectedOptionsHTML.push(selectOption.HTML);

            this.selectedOptionChange.emit(this.selectedOptions);
            this.onItemSelected.emit(selectOption.value);
        }
        if (this.isSearchable) {
            this.focusFirstItem();
            this.focusSearch();
        }
        this._query = "";
        if (this.isSearchable) {
            this.search();
        }
    }

    public deselectOption(option:any) {
        var index = this.selectedOptions.indexOf(option);
        this.selectedOptions.splice(index, 1);
        this.selectedOptionsHTML.splice(index, 1);
        this.selectedOptionChange.emit(this.selectedOptions);

        if (this.isSearchable) {
            this.focusFirstItem();
        }
    }

    //noinspection JSMethodCanBeStatic
    private selectedOptionClick(event:MouseEvent) {
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
        });
    }

    public writeValue(value:any) {
        if (this.allowMultiple) {
            //This allows all of the possible results to load in first, so we can set the innerHTML correctly without using a template.
            setTimeout(() => {
                this.selectedOptions = value;
                (this.selectedOptions || []).forEach((v:any, i:number) => {
                    this.selectedOptionsHTML[i] = this.renderedOptions.find((rO:SelectOption) => rO.value == v).HTML
                });
            });
            return;
        }
        this.selectedOption = value;
        if (value) {
            setTimeout(() => this.selectedOptionHTML = this.renderedOptions.find((rO:SelectOption) => rO.value == value).HTML);
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
                    this.focusSearch();
                });
            }
            else if ((<Element> event.target).tagName != "INPUT") {
                this.isOpen = false;
            }
        }
        return false;
    }

    public searchKeyDown(event:KeyboardEvent) {
        if (event.which == KEYCODE.BACKSPACE && !this._query) {
            var selectedOptions = this.selectedOptions || [];
            var lastSelectedOption = selectedOptions[selectedOptions.length - 1];
            if (lastSelectedOption) {
                this.deselectOption(lastSelectedOption);

            }
        }
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