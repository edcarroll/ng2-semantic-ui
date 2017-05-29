import {Component, HostBinding, ElementRef, Renderer, EventEmitter, Output, Input, QueryList, AfterViewInit, ViewChildren, forwardRef, Directive} from '@angular/core';
import {SuiSelectBase} from './select-base';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {SuiMultiSelectLabel} from './multi-select-label';
import {Subscription} from 'rxjs/Subscription';
import {KeyCode} from '../util/util';
import {customValueAccessorFactory, CustomValueAccessor, CustomValueAccessorHost} from '../util/custom-value-accessor';

@Component({
    selector: 'sui-multi-select',
    template: `
<i class="dropdown icon"></i>
<!-- Multi-select labels -->
<sui-multi-select-label *ngFor="let selected of selectedOptions;" [value]="selected"></sui-multi-select-label>
<!-- Query input -->
<input [hidden]="!isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query" (keydown)="onQueryInputKeydown($event)" #queryInput>
<!-- Placeholder text -->
<div class="default text" [class.filtered]="!!query">{{ placeholder }}</div>
<!-- Select dropdown menu -->
<div class="menu" suiDropdownMenu [menuAutoSelectFirst]="true">
    <ng-content></ng-content>
    <ng-container *ngIf="availableOptions.length == 0 ">
        <div *ngIf="!maxSelectedReached" class="message">{{ noResultsMessage }}</div>
        <div *ngIf="maxSelectedReached" class="message">Max {{ maxSelected }} selections</div>
    </ng-container>
</div>
`,
    styles: [`
:host input.search {
    width: 12em !important;
}
    `]
})
export class SuiMultiSelect<T, U> extends SuiSelectBase<T, U> implements AfterViewInit, CustomValueAccessorHost<U[]> {
    public selectedOptions:T[];
    // Stores the values written by ngModel before it can be matched to an option from `options`.
    private _writtenOptions:U[];

    // Since we are rendering the selected options with an ngFor, we need to track them in the same manner as the base class.
    @ViewChildren(SuiMultiSelectLabel)
    private _renderedSelectedOptions:QueryList<SuiMultiSelectLabel<T>>;

    private _renderedSelectedSubscriptions:Subscription[];
    
    @Output()
    public selectedOptionsChange:EventEmitter<U[]>;

    protected optionsUpdateHook() {
        if (this._writtenOptions && this.searchService.options.length > 0) {
            // If there were values written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOptions = this._writtenOptions.map(v => this.searchService.options.find(o => v == this.valueGetter(o)));
            
            if (this.selectedOptions.length == this._writtenOptions.length) {
                this._writtenOptions = null;
            }
        }
    }

    public get availableOptions() {
        if (this.maxSelectedReached) {
            // If we have reached the maximum number of selections, then empty the results completely.
            return [];
        }
        // Returns the search results \ selected options.
        return this.searchService.results
            .filter(r => !this.selectedOptions.find(o => r == o));
    }

    @Input()
    public maxSelected:number;

    public get maxSelectedReached() {
        if (this.maxSelected == null) {
            // If there is no maximum then we can immediately return.
            return false;
        }
        return this.selectedOptions.length == this.maxSelected;
    }

    @HostBinding('class.multiple')
    private _multiSelectClasses:boolean;

    constructor(element:ElementRef, renderer:Renderer) {
        super(element, renderer);

        this.placeholder = "Select...";

        this.selectedOptions = [];
        this.selectedOptionsChange = new EventEmitter<U[]>();

        this._renderedSelectedSubscriptions = [];

        this._multiSelectClasses = true;
    }

    public selectOption(option:T) {
        this.selectedOptions.push(option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));

        // The search delay is set to the transition duration to ensure results aren't rendered as the select closes as that causes a sudden flash.
        this.searchService.searchDelay = this._menu.menuTransitionDuration;
        this.searchService.updateQuery("");

        // Automatically refocus the search input for better keyboard accessibility.
        this.focusInput();
    }

    public writeValue(values:U[]) {
        if (values instanceof Array) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel values to options.
                this.selectedOptions = values.map(v => this.findOption(this.searchService.options, v));
            }
            if (values.length > 0 && this.selectedOptions.length == 0) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial values.
                    this.searchService.itemsLookup<U>(values)
                        .then(r => this.selectedOptions = r);
                }
                else {
                    // Otherwise, cache the written value for when options are set.
                    this._writtenOptions = values;
                }
            }
            if (values.length === 0) {
                this.selectedOptions = [];
            }
        }
    }

    public deselectOption(option:T) {
        // Update selected options to the previously selected options \ {option}.
        this.selectedOptions = this.selectedOptions.filter(so => so != option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));

        // Automatically refocus the search input for better keyboard accessibility.
        this.focusInput();
    }

    public onQueryInputKeydown(event:KeyboardEvent) {
        if (event.keyCode == KeyCode.Backspace && this.query == "" && this.selectedOptions.length > 0) {
            // Deselect the rightmost option when the user presses backspace in the search input.
            this.deselectOption(this.selectedOptions[this.selectedOptions.length - 1]);
        }
    }

    public ngAfterViewInit() {
        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onSelectedOptionsRendered();
        this._renderedSelectedOptions.changes.subscribe(() => this.onSelectedOptionsRendered());
    }

    private onSelectedOptionsRendered() {
        // Unsubscribe from all previous subscriptions to avoid memory leaks on large selects.
        this._renderedSelectedSubscriptions.forEach(rs => rs.unsubscribe());
        this._renderedSelectedSubscriptions = [];

        this._renderedSelectedOptions.forEach(ro => {
            // Slightly delay initialisation to avoid change after checked errors. TODO - look into avoiding this!
            setTimeout(() => this.initialiseRenderedOption(ro));

            this._renderedSelectedSubscriptions.push(ro.onDeselected.subscribe(() => this.deselectOption(ro.value)));
        });
    }
}

// Value accessor directive for the select to support ngModel.
@Directive({
    selector: 'sui-multi-select',
    host: { '(selectedOptionsChange)': 'onChange($event)' },
    providers: [customValueAccessorFactory(SuiMultiSelectValueAccessor)]
})
export class SuiMultiSelectValueAccessor<T, U> extends CustomValueAccessor<U[], SuiMultiSelect<T, U>> {
    constructor(host:SuiMultiSelect<T, U>) {
        super(host);
    }
}