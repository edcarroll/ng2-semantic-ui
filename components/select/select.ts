import { Component, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Renderer2, forwardRef, Directive } from "@angular/core";
import { SuiSelectBase } from "./select-base";
import { ISelectRenderedOption } from "./select-option";
import { customValueAccessorFactory, ICustomValueAccessorHost, CustomValueAccessor } from "../util/custom-value-accessor";

export type SingleItemLookup<T, U> = (query:string, initial?:U) => Promise<T>;

@Component({
    selector: "sui-select",
    template: `
<i class="dropdown icon" (click)="onCaretClick($event)"></i>
<!-- Query input -->
<input [hidden]="!isSearchable"
       class="search"
       type="text"
       autocomplete="off"
       [(ngModel)]="query"
       #queryInput>

<!-- Placeholder text -->
<div *ngIf="!selectedOption" class="default text" [class.filtered]="!!query">{{ placeholder }}</div>
<!-- Selected item -->
<div class="text" [class.filtered]="!!query || !selectedOption">
    <span #optionTemplateSibling></span>
    <span *ngIf="!optionTemplate && selectedOption">{{ labelGetter(selectedOption) }}</span>
</div>
<!-- Select dropdown menu -->
<div class="menu"
     suiDropdownMenu
     [menuTransition]="transition"
     [menuTransitionDuration]="transitionDuration"
     [menuAutoSelectFirst]="isSearchable">

    <ng-content></ng-content>
    <div *ngIf="isSearchable && availableOptions.length == 0" class="message">{{ noResultsMessage }}</div>
</div>
`
})
export class SuiSelect<T, U> extends SuiSelectBase<T, U> implements ICustomValueAccessorHost<U> {
    public selectedOption?:T;
    // Stores the value written by ngModel before it can be matched to an option from `options`.
    private _writtenOption?:U;

    @ViewChild("optionTemplateSibling", { read: ViewContainerRef })
    private _optionTemplateSibling:ViewContainerRef;

    @Output()
    public selectedOptionChange:EventEmitter<U>;

    constructor(element:ElementRef, renderer:Renderer2) {
        super(element, renderer);

        this.placeholder = "Select one";

        this.selectedOptionChange = new EventEmitter<U>();
    }

    protected optionsUpdateHook():void {
        if (this._writtenOption && this.searchService.options.length > 0) {
            // If there was an value written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOption = this.findOption(this.searchService.options, this._writtenOption);
            if (this.selectedOption) {
                this._writtenOption = undefined;
                this.drawSelectedOption();
            }
        }
    }

    protected queryUpdateHook():void {
        // When the query is updated, we just abandon the current selection.
        this.selectedOption = undefined;
    }

    public selectOption(option:T):void {
        // Choose and emit the selected option.
        this.selectedOption = option;
        this.selectedOptionChange.emit(this.valueGetter(option));

        this.dropdownService.setOpenState(false);

        // The search delay is set to the transition duration to ensure results
        // aren't rendered as the select closes as that causes a sudden flash.
        this.searchService.searchDelay = this._menu.menuTransitionDuration;
        this.searchService.updateQueryDelayed("");

        this.drawSelectedOption();

        // Automatically refocus the search input for better keyboard accessibility.
        this.focusInput();
    }

    public writeValue(value:U):void {
        if (value != undefined) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel value to an option.
                this.selectedOption = this.findOption(this.searchService.options, value);
            }
            if (!this.selectedOption) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial value.
                    const lookupFinished = (i:T) => {
                        this.selectedOption = i;
                        this.drawSelectedOption();
                    };

                    const itemLookup = this.searchService.itemLookup<U>(value);
                    if (itemLookup instanceof Promise) {
                        itemLookup
                            .then(r => lookupFinished(r));
                    } else {
                        lookupFinished(itemLookup);
                    }
                    return;
                } else {
                    // Otherwise, cache the written value for when options are set.
                    this._writtenOption = value;
                }
            }
        }

        this.drawSelectedOption();
    }

    protected initialiseRenderedOption(option:ISelectRenderedOption<T>):void {
        super.initialiseRenderedOption(option);

        // Boldens the item so it appears selected in the dropdown.
        option.isActive = option.value === this.selectedOption;
    }

    private drawSelectedOption():void {
        // Updates the active class on the newly selected option.
        if (this._renderedOptions) {
            this.onAvailableOptionsRendered();
        }

        if (this.selectedOption && this.optionTemplate) {
            this.drawTemplate(this._optionTemplateSibling, this.selectedOption);
        }
    }
}

// Value accessor directive for the select to support ngModel.
@Directive({
    selector: "sui-select",
    host: { "(selectedOptionChange)": "onChange($event)" },
    providers: [customValueAccessorFactory(SuiSelectValueAccessor)]
})
export class SuiSelectValueAccessor<T, U> extends CustomValueAccessor<U, SuiSelect<T, U>> {
    constructor(host:SuiSelect<T, U>) {
        super(host);
    }
}
