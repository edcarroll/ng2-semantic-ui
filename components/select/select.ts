import {Component, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Renderer, forwardRef, Directive} from '@angular/core';
import {SuiSelectBase} from './select-base';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {ISelectRenderedOption} from './select-option';

export type SingleItemLookup<T, U> = (query:string, initial?:U) => Promise<T>;

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
<div class="menu" suiDropdownMenu [menuAutoSelectFirst]="isSearchable">
    <ng-content></ng-content>
    <div *ngIf="isSearchable && availableOptions.length == 0" class="message">{{ noResultsMessage }}</div>
</div>
`
})
export class SuiSelect<T, U> extends SuiSelectBase<T, U> {
    public selectedOption:T;
    // Stores the value written by ngModel before it can be matched to an option from `options`.
    private _writtenOption:U;
    
    @ViewChild('optionTemplateSibling', { read: ViewContainerRef })
    private _optionTemplateSibling:ViewContainerRef;

    @Output()
    public selectedOptionChange:EventEmitter<U>;

    @Output()
    public get ngModelChange() {
        // For simplicity we can mirror these two emitters as they do the same thing.
        return this.selectedOptionChange;
    }

    protected optionsUpdateHook() {
        if (this._writtenOption && this.searchService.options.length > 0) {
            // If there was an value written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOption = this.findOption(this.searchService.options, this._writtenOption);
            if (this.selectedOption) {
                this._writtenOption = null;
                this.drawSelectedOption();
            }
        }
    }

    protected queryUpdateHook() {
        // When the query is updated, we just abandon the current selection.
        this.selectedOption = null;
    }

    constructor(element:ElementRef, renderer:Renderer) {
        super(element, renderer);

        this.placeholder = "Select one";

        this.selectedOptionChange = new EventEmitter<U>();
    }

    public selectOption(option:T) {
        // Choose and emit the selected option.
        this.selectedOption = option;
        this.selectedOptionChange.emit(this.valueGetter(option));

        this.dropdownService.setOpenState(false);

        // The search delay is set to the transition duration to ensure results aren't rendered as the select closes as that causes a sudden flash.
        this.searchService.searchDelay = this._menu.menuTransitionDuration;
        this.searchService.updateQueryDelayed("");

        this.drawSelectedOption();

        // Automatically refocus the search input for better keyboard accessibility.
        this.focusInput();
    }

    public writeValue(value:U) {
        if (value != null) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel value to an option.
                this.selectedOption = this.findOption(this.searchService.options, value);
            }
            if (!this.selectedOption) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial value.
                    (this.searchService.itemLookup<U>(value) as Promise<T>)
                        .then(r => {
                            this.selectedOption = r;

                            this.drawSelectedOption();
                        });
                    return;
                }
                else {
                    // Otherwise, cache the written value for when options are set.
                    this._writtenOption = value;
                }
            }
        }

        this.drawSelectedOption();
    }

    protected initialiseRenderedOption(option:ISelectRenderedOption<T>) {
        super.initialiseRenderedOption(option);

        // Boldens the item so it appears selected in the dropdown.
        option.isActive = option.value == this.selectedOption;
    }

    private drawSelectedOption() {
        // Updates the active class on the newly selected option.
        this.onAvailableOptionsRendered();

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

// Value accessor directive for the select to support ngModel.
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