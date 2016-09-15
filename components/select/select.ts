import {
    Component, Directive, ViewChild, HostBinding, ElementRef, HostListener, forwardRef,
    TemplateRef, ViewContainerRef, AfterContentInit, QueryList, ContentChildren,
    ViewChildren, AfterViewInit, EventEmitter,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {SuiDropdownMenu} from "../dropdown/dropdown-menu";
import {SuiSelectOption, SuiSelectMultiLabel} from "./select-option";
import {KeyCode} from '../../components/dropdown/dropdown.service';
import {Subscription} from "rxjs";
import {SuiDropdownService} from "../dropdown/dropdown.service";
import {Input, Output} from "@angular/core/src/metadata/directives";
import {SuiSearchService} from "../search/search.service";
import {SuiMultiSelect, SuiMultiSelectValueAccessor} from "./multi-select";

@Component({
    selector: 'sui-select',
    exportAs: 'suiSelect',
    template: `
<i class="dropdown icon"></i>
<input *ngIf="isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query">
<!-- Single-select label -->
<div *ngIf="!selectedOption" class="default text" [class.filtered]="query">{{ placeholder }}</div>
<div [hidden]="!selectedOption" class="text" [class.filtered]="query">
    <span #selectedOptionRenderTarget></span>
    <span *ngIf="!optionTemplate">{{ _searchService.readValue(selectedOption) }}</span>
</div>
<!-- Select dropdown menu -->
<div class="menu" suiDropdownMenu>
    <ng-content></ng-content>
    <div *ngIf="isSearchable && !results.length" class="message">No Results</div>
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
export class SuiSelect implements AfterContentInit, AfterViewInit {
    @ViewChild(SuiDropdownMenu)
    private _dropdownMenu:SuiDropdownMenu;
    private _dropdownService:SuiDropdownService = new SuiDropdownService();
    private _searchService:SuiSearchService = new SuiSearchService();

    @ViewChild('selectedOptionRenderTarget', { read: ViewContainerRef })
    private selectedOptionContainer:ViewContainerRef;

    @ContentChildren(SuiSelectOption)
    private renderedOptions:QueryList<SuiSelectOption>;
    private renderedOptionsSubscriptions:Subscription[] = [];

    public selectedOption:any;

    @HostBinding('class.ui')
    @HostBinding('class.selection')
    @HostBinding('class.dropdown')
    searchClasses = true;

    @HostBinding('attr.tabindex')
    tabIndex = 0;

    @HostBinding('class.search')
    @Input()
    public isSearchable:boolean = false;

    @Input()
    public placeholder:string = "Select one";

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
    public selectedOptionChange:EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public onItemSelected:EventEmitter<any> = new EventEmitter<any>();

    @Input()
    public optionTemplate: TemplateRef<any>;

    @HostBinding('class.visible')
    public get isActive() {
        return this._dropdownService.isVisible;
    }

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
        return this._searchService.results;
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

    private renderSelectedItem() {
        if (this.selectedOption && this.optionTemplate) {
            this.selectedOptionContainer.clear();
            this.selectedOptionContainer.createEmbeddedView(this.optionTemplate, { option: this.selectedOption });
        }
    }

    public selectOption(option:any):void {
        this.selectedOption = option;

        let keyed = this._searchService.deepValue(option, this.keyField);
        this.selectedOptionChange.emit(keyed);
        this.onItemSelected.emit(keyed);

        this._searchService.updateQuery(this._searchService.readValue(option), false);
        this._dropdownService.isOpen = false;
        this.renderSelectedItem();
        this._searchService.updateQuery("");
    }

    private focusSearch() {
        if (this.isSearchable) {
            this._dropdownService.dropdownElement.nativeElement.querySelector("input").focus();
        }
    }

    public writeValue(value:any) {
        if (value) {
            this.selectedOption = value;
            if (this.options.length > 0) {
                let compareValue = this._searchService.deepValue(value, this.keyField);
                this.selectedOption = this.options.find(o => compareValue == o);
            }
        }
        this.renderSelectedItem();
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
}

export const CUSTOM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiSelectValueAccessor),
    multi: true
};

@Directive({
    selector: 'sui-select',
    host: {'(selectedOptionChange)': 'onChange($event)'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SuiSelectValueAccessor implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host:SuiSelect) {}

    writeValue(value: any): void {
        this.host.writeValue(value);
    }

    registerOnChange(fn: () => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

export const SUI_SELECT_DIRECTIVES = [SuiSelect, SuiSelectOption, SuiSelectValueAccessor, SuiMultiSelect, SuiSelectMultiLabel, SuiMultiSelectValueAccessor];
