import {
    Component, Directive, ViewChild, HostBinding, ElementRef, HostListener, forwardRef,
    TemplateRef, ViewContainerRef, AfterContentInit, QueryList, ContentChildren,
    ViewChildren, AfterViewInit, EventEmitter,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {SuiDropdownMenu} from "../dropdown/dropdown-menu";
import {SuiSearch, SuiSearchValueAccessor} from "../search/search";
import {SuiSelectOption, SuiSelectMultiLabel} from "./select-option";
import {KeyCode} from '../../components/dropdown/dropdown.service';
import {Subscription} from "rxjs";
import {SuiDropdownService} from "../dropdown/dropdown.service";
import {Input, Output} from "@angular/core/src/metadata/directives";
import {SuiSearchService} from "../search/search.service";

@Component({
    selector: 'sui-multi-select',
    exportAs: 'suiMultiSelect',
    template: `
<i class="dropdown icon"></i>
<!-- Multi-select labels -->
<sui-select-multi-label *ngFor="let selected of selectedOptions;" [value]="selected"></sui-select-multi-label>
<!-- Search input box -->
<input *ngIf="isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query" (keydown)="searchKeyDown($event)">
<!-- Single-select label -->
<div *ngIf="!selectedOption" class="default text" [class.filtered]="query">{{ placeholder }}</div>
<!-- Select dropdown menu -->
<div class="menu" suiDropdownMenu>
    <ng-content></ng-content>
    <div *ngIf="!results.length && !maxSelectedReached" class="message">No Results</div>
    <div *ngIf="!results.length && maxSelectedReached" class="message">Max {{ maxSelected }} selections</div>
</div>
`,
    styles: [`
:host input.search {
    width: 12em !important;
} 
.selected-results {
    display: none;
}
`]
})
export class SuiMultiSelect implements AfterContentInit, AfterViewInit {
    @ViewChild(SuiDropdownMenu)
    private _dropdownMenu:SuiDropdownMenu;
    private _dropdownService:SuiDropdownService = new SuiDropdownService();
    private _searchService:SuiSearchService = new SuiSearchService();

    @ContentChildren(SuiSelectOption)
    private renderedOptions:QueryList<SuiSelectOption>;
    private renderedOptionsSubscriptions:Subscription[] = [];

    @ViewChildren(SuiSelectMultiLabel)
    private renderedSelectedOptions:QueryList<SuiSelectMultiLabel>;
    private renderedSelectedOptionsSubscriptions:Subscription[] = [];

    public selectedOptions:any[] = [];

    @Input()
    public maxSelected:number;
    private maxSelectedReached:boolean = false;

    @HostBinding('class.ui')
    @HostBinding('class.multiple')
    @HostBinding('class.selection')
    @HostBinding('class.dropdown')
    searchClasses = true;

    @HostBinding('attr.tabindex')
    tabIndex = 0;

    @HostBinding('class.search')
    @Input()
    public isSearchable:boolean = false;

    @Input()
    public placeholder:string = "Select...";

    @Input()
    public get options():any {
        return this._searchService.options;
    }

    public set options(value:any) {
        this._searchService.options = value;
    }

    @Input()
    public get displayField() {
        return this._searchService.optionsField;
    }

    public set displayField(value:string) {
        this._searchService.optionsField = value;
    }

    @Input()
    public keyField:string;

    private get query():string {
        return this._searchService.query;
    }

    private set query(value:string) {
        this._searchService.updateQuery(value);
        this.isOpen = true;
    }

    @Output()
    public selectedOptionsChange:EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public onItemSelected:EventEmitter<any> = new EventEmitter<any>();

    @Input()
    public optionTemplate: TemplateRef<any>;

    @HostBinding('class.visible')
    @HostBinding('class.active')
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

    private get results():Array<any> {
        return this._searchService.results.filter(r => this.selectedOptions.indexOf(r) == -1);
    }

    private get availableOptions():Array<any> {
        return this.results;
    }

    constructor(private el:ElementRef) {
        this._dropdownService.dropdownElement = el;
        this._dropdownService.autoClose = "outsideClick";
        this._dropdownService.itemClass = "item";
        this._dropdownService.itemSelectedClass = "selected";

        this._searchService.allowEmptyQuery = true;
        this._searchService.searchDelay = 0;

        this._dropdownService.isOpenChange
            .subscribe(isOpen => {
                if (isOpen) {
                    if (this.isSearchable && !this._dropdownService.selectedItem) {
                        this._dropdownService.selectNextItem();
                    }
                }
        });
    }

    public ngAfterContentInit():void {
        //Initialise initial results
        this.renderedOptionsSubscribe();
        this.renderedOptions.changes.subscribe(() => this.renderedOptionsSubscribe());
    }

    public ngAfterViewInit():void {
        this._dropdownMenu.service = this._dropdownService;

        this.renderedSelectedOptionsSubscribe();
        this.renderedSelectedOptions.changes.subscribe(() => this.renderedSelectedOptionsSubscribe());
    }

    private renderedOptionsSubscribe() {
        this.renderedOptionsSubscriptions.forEach((s) => s.unsubscribe());
        this.renderedOptionsSubscriptions = [];

        this.renderedOptions.forEach((option:SuiSelectOption) => {
            this.renderedOptionsSubscriptions.push(option.selected.subscribe((value:any) => {
                this.selectOption(value);
            }));

            setTimeout(() => {
                option.useTemplate = !!this.optionTemplate;
                option.readValue = v => this._searchService.readValue(v);

                if (option.useTemplate) {
                    option.viewContainerRef.clear();
                    option.viewContainerRef.createEmbeddedView(this.optionTemplate, { option: option.value });
                }
            });
        });
    }

    private renderedSelectedOptionsSubscribe() {
        this.renderedSelectedOptionsSubscriptions.forEach((s) => s.unsubscribe());
        this.renderedSelectedOptionsSubscriptions = [];

        this.renderedSelectedOptions.forEach((label:SuiSelectMultiLabel) => {
            this.renderedSelectedOptionsSubscriptions.push(label.selected.subscribe((value:any) => {
                this.deselectOption(value);
            }));

            setTimeout(() => {
                label.useTemplate = !!this.optionTemplate;
                label.readValue = v => this._searchService.readValue(v);

                if (label.useTemplate) {
                    label.viewContainerRef.clear();
                    label.viewContainerRef.createEmbeddedView(this.optionTemplate, { option: label.value });
                }
            });
        });
    }

    public selectOption(option:any):void {
        this.selectedOptions = this.selectedOptions || [];
        this.selectedOptions.push(option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(so => this._searchService.deepValue(so, this.keyField)));
        this.onItemSelected.emit(this._searchService.deepValue(option, this.keyField));

        this._searchService.updateQuery("");
        // }
        // if (this.isSearchable) {
        //     this.focusFirstItem();
        //     this.focusSearch();
        // }

    }

    public deselectOption(option:any) {
        var index = this.selectedOptions.indexOf(option);
        this.selectedOptions.splice(index, 1);
        this.selectedOptionsChange.emit(this.selectedOptions.map(so => this._searchService.deepValue(so, this.keyField)));

        this.focusFirstItem();
    }

    private focusSearch() {
        if (this.isSearchable) {
            this._dropdownService.dropdownElement.nativeElement.querySelector("input").focus();
        }
    }

    private focusFirstItem() {
        setTimeout(() => {
            this._dropdownService.selectedItem = null;
            this._dropdownService.selectNextItem();
        });
    }

    public writeValue(value:any) {
        if (value) {
            this.selectedOptions = value;
            if (this.options.length > 0) {
                this.selectedOptions = this.selectedOptions.map(so => {
                    let compareValue = this._searchService.deepValue(so, this.keyField);
                    return this.options.find(o => compareValue == o);
                });
            }
        }
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this._dropdownService.menuElement.nativeElement.contains(event.target)){
            if (!this.isOpen) {
                this.isOpen = true;
                this._searchService.search();
                this.focusSearch();
            }
            else if ((<Element> event.target).tagName != "INPUT") {
                this.isOpen = false;
            }
        }
        return false;
    }

    @HostListener('keypress', ['$event'])
    public keypress(event:KeyboardEvent) {
        if ((event.which == KeyCode.Enter || event.which == KeyCode.Space) && !this.isOpen) {
            this.click(<any>event);
            event.preventDefault();
        }
    }

    public searchKeyDown(event:KeyboardEvent) {
        if (event.which == KeyCode.Backspace && !this.query) {
            var selectedOptions = this.selectedOptions || [];
            var lastSelectedOption = selectedOptions[selectedOptions.length - 1];
            if (lastSelectedOption) {
                this.deselectOption(lastSelectedOption);
            }
        }
    }
}

export const CUSTOM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiMultiSelectValueAccessor),
    multi: true
};

@Directive({
    selector: 'sui-multi-select',
    host: {'(selectedOptionsChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SuiMultiSelectValueAccessor implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host:SuiMultiSelect) {}

    writeValue(value: any[]): void {
        this.host.writeValue(value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
