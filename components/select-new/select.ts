import {Component, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Renderer, forwardRef, Directive} from '@angular/core';
import {SuiSelectBase} from './select-base';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'sui-select',
    template: `
<i class="dropdown icon"></i>
<!-- Query input -->
<input [hidden]="!isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query" #queryInput>
<!-- Placeholder text -->
<div *ngIf="!selectedOption" class="default text" [class.filtered]="!!query">{{ placeholder }}</div>
<!-- Selected item -->
<div class="text" [class.filtered]="!!query || !selectedOption">
    <span #optionTemplateSibling></span>
    <span *ngIf="!optionTemplate">{{ labelGetter(selectedOption) }}</span>
</div>
<!-- Select dropdown menu -->
<div class="menu" suiDropdownMenu>
    <ng-content></ng-content>
    <div *ngIf="isSearchable && availableOptions.length == 0" class="message">No results</div>
</div>
`
})
export class SuiSelect<T, U> extends SuiSelectBase<T, U> {
    public selectedOption:T;
    private _writtenOption:U;
    
    @ViewChild('optionTemplateSibling', { read: ViewContainerRef })
    private _optionTemplateSibling:ViewContainerRef;

    @Output()
    public selectedOptionChange:EventEmitter<T>;

    @Output()
    public get ngModelChange() {
        return this.selectedOptionChange;
    }

    protected optionsUpdateHook() {
        if (this._writtenOption && this.options.length > 0) {
            this.selectedOption = this.options.find(o => this._writtenOption == this.valueGetter(o));
        }
        if (this.selectedOption) {
            this._writtenOption = null;
        }
    }

    protected queryUpdateHook() {
        this.selectedOption = null;
    }

    constructor(element:ElementRef, renderer:Renderer) {
        super(element, renderer);

        this.selectedOptionChange = new EventEmitter<T>();
    }

    public selectOption(option:T) {
        this.selectedOption = option;
        this.selectedOptionChange.emit(option);

        this.dropdownService.setOpenState(false);

        this.searchService.searchDelay = this._menu.menuTransitionDuration;
        this.searchService.updateQueryDelayed("", () => {});

        this.drawSelectedItem();
    }

    public writeValue(value:U) {
        if (value != null) {
            if (this.options.length > 0) {
                this.selectedOption = this.options.find(o => value == this.valueGetter(o));
            }
            if (!this.selectedOption) {
                this._writtenOption = value;
            }
        }

        this.drawSelectedItem();
    }

    private drawSelectedItem() {
        if (this.selectedOption && this.optionTemplate) {
            this.drawTemplate(this._optionTemplateSibling, this.selectedOption);
        }
    }
}

// Value accessor for the select.
export const SELECT_VALUE_ACCESSOR:any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiSelectValueAccessor),
    multi: true
};

// Value accessor directive for the search to support ngModel.
@Directive({
    selector: 'sui-select',
    host: {
        '(selectedOptionChange)': 'onChange($event)'
    },
    providers: [SELECT_VALUE_ACCESSOR]
})
export class SuiSelectValueAccessor<T, U> implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host:SuiSelect<T, U>) {}

    writeValue(value:U) {
        this.host.writeValue(value);
    }

    registerOnChange(fn:() => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn:() => void) {
        this.onTouched = fn;
    }
}