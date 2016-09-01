import {
    Component, Directive, ViewChild, HostBinding, ElementRef, HostListener, forwardRef,
    TemplateRef, ViewContainerRef, AfterContentInit, QueryList, ContentChildren,
    ViewChildren, AfterViewInit,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {SuiDropdownMenu} from "../dropdown/dropdown-menu";
import {SuiSearch, SuiSearchValueAccessor} from "../search/search";
import {SuiSelectOption, SuiSelectMultiLabel} from "./select-option";
import {KEYCODE} from '../../components/dropdown/dropdown.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'sui-select',
    exportAs: 'suiSelect',
    inputs: ['placeholder', 'options', 'optionsField', 'isSearchable', 'searchDelay', 'isDisabled', 'allowMultiple', 'maxSelected', 'optionTemplate'],
    outputs: ['selectedOptionChange'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
    template: `
<i class="dropdown icon"></i>
<!-- Multi-select labels -->
<sui-select-multi-label *ngFor="let selected of selectedOptions;" [value]="selected"></sui-select-multi-label>
<!-- Search input box -->
<input *ngIf="isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query" (keydown)="searchKeyDown($event)">
<!-- Single-select label -->
<div *ngIf="!selectedOption" class="default text" [class.filtered]="query">{{ placeholder }}</div>
<div [hidden]="!selectedOption" class="text" [class.filtered]="query">
    <span #selectedOptionRenderTarget></span>
    <span *ngIf="!optionTemplate">{{ deepValue(selectedOption, optionsField) }}</span>
</div>
<!-- Select dropdown menu -->
<div class="menu" suiDropdownMenu>
    <ng-content></ng-content>
    <div *ngIf="isSearchable && !results.length && !maxSelectedReached" class="message">No Results</div>
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
export class SuiSelect extends SuiSearch implements AfterContentInit, AfterViewInit {
    @ViewChild(SuiDropdownMenu)
    protected _menu:SuiDropdownMenu;

    @ViewChild('selectedOptionRenderTarget', { read: ViewContainerRef })
    protected selectedOptionContainer:ViewContainerRef;

    @ContentChildren(SuiSelectOption)
    protected renderedOptions:QueryList<SuiSelectOption>;
    private renderedOptionsSubscriptions:Subscription[] = [];

    @ViewChildren(SuiSelectMultiLabel)
    protected renderedSelectedOptions:QueryList<SuiSelectMultiLabel>;
    private renderedSelectedOptionsSubscriptions:Subscription[] = [];

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

    public selectedOptions:any[] = [];
    public maxSelected:number;
    private maxSelectedReached:boolean = false;

    public optionTemplate: TemplateRef<any>;

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

    protected get availableOptions():Array<any> {
        return this.results;
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

    public ngAfterContentInit():void {
        if (this.isSearchable) {
            //Initialise initial results
            this.search();
        }

        this.renderedOptionsSubscribe();

        this.renderedOptions.changes.subscribe(() => this.renderedOptionsSubscribe());

        setTimeout(() => {
            if (!this.allowMultiple) {
                this.renderSelectedItem();
            }
        });
    }

    public ngAfterViewInit():void {
        super.ngAfterViewInit();

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
                option.readValue = v => this.readValue(v);

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
                label.readValue = v => this.readValue(v);

                if (label.useTemplate) {
                    label.viewContainerRef.clear();
                    label.viewContainerRef.createEmbeddedView(this.optionTemplate, { option: label.value });
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

    public selectOption(value:any):void {
        if (!this.allowMultiple) {
            super.select(value);
            this.renderSelectedItem();
        }
        else {
            this.selectedOptions = this.selectedOptions || [];
            this.selectedOptions.push(value);

            this.selectedOptionChange.emit(this.selectedOptions);
            this.onItemSelected.emit(value);
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
        this.selectedOptionChange.emit(this.selectedOptions);

        if (this.isSearchable) {
            this.focusFirstItem();
        }
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
            });
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
export class SuiSelectValueAccessor extends SuiSearchValueAccessor implements ControlValueAccessor {
    constructor(host:SuiSelect) {
        super(<SuiSearch> host);
    }
}

export const SUI_SELECT_DIRECTIVES = [SuiSelect, SuiSelectOption, SuiSelectValueAccessor, SuiSelectMultiLabel];
