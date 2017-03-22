import {Component, HostBinding, ElementRef, Renderer, EventEmitter, Output, Input, QueryList, AfterViewInit, ViewChildren, forwardRef, Directive} from '@angular/core';
import {SuiSelectBase} from './select-base';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {SuiMultiSelectLabel} from './multi-select-label';
import {Subscription} from 'rxjs';
import {KeyCode} from '../util/util';

@Component({
    selector: 'sui-multi-select',
    template: `
<i class="dropdown icon"></i>
<!-- Multi-select labels -->
<sui-multi-select-label *ngFor="let selected of selectedOptions;" [value]="selected"></sui-multi-select-label>
<!-- Query input -->
<input [hidden]="!isSearchable" class="search" type="text" autocomplete="off" [(ngModel)]="query" (keydown)="onQueryInputKeydown($event)" #queryInput>
<!-- Placeholder text -->
<div *ngIf="!selectedOption" class="default text" [class.filtered]="!!query">{{ placeholder }}</div>
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
export class SuiMultiSelect<T, U> extends SuiSelectBase<T, U> implements AfterViewInit {
    public selectedOptions:T[];
    private _writtenOptions:U[];

    @ViewChildren(SuiMultiSelectLabel)
    private _renderedSelectedOptions:QueryList<SuiMultiSelectLabel<T>>;

    private _renderedSelectedSubscriptions:Subscription[];
    
    @Output()
    public selectedOptionsChange:EventEmitter<U[]>;

    @Output()
    public get ngModelChange() {
        return this.selectedOptionsChange;
    }

    protected optionsUpdateHook() {
        if (this._writtenOptions && this.options.length > 0) {
            this.selectedOptions = this._writtenOptions.map(v => this.options.find(o => v == this.valueGetter(o)));
            
            if (this.selectedOptions.length == this._writtenOptions.length) {
                this._writtenOptions = null;
            }
        }
    }

    public get availableOptions() {
        if (this.maxSelectedReached) {
            return [];
        }
        return this.searchService.results
            .filter(r => !this.selectedOptions.find(o => r == o));
    }

    @Input()
    public maxSelected:number;

    public get maxSelectedReached() {
        if (this.maxSelected == null) {
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

        this.searchService.searchDelay = this._menu.menuTransitionDuration;
        this.searchService.updateQuery("");

        this.focusInput();
    }

    public writeValues(values:U[]) {
        if (values instanceof Array) {
            if (this.options.length > 0) {
                this.selectedOptions = values.map(v => this.options.find(o => v == this.valueGetter(o)));
            }
            if (values != [] && this.selectedOptions.length == 0) {
                this._writtenOptions = values;
            }
        }
    }

    public deselectOption(option:T) {
        this.selectedOptions = this.selectedOptions.filter(so => so != option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));

        this.focusInput();
    }

    public onQueryInputKeydown(event:KeyboardEvent) {
        if (event.keyCode == KeyCode.Backspace && this.query == "" && this.selectedOptions.length > 0) {
            this.deselectOption(this.selectedOptions[this.selectedOptions.length - 1]);
        }
    }

    public ngAfterViewInit() {
        this.onSelectedOptionsRendered();
        this._renderedSelectedOptions.changes.subscribe(() => this.onSelectedOptionsRendered());
    }

    private onSelectedOptionsRendered() {
        this._renderedSelectedSubscriptions.forEach(rs => rs.unsubscribe());
        this._renderedSelectedSubscriptions = [];

        this._renderedSelectedOptions.forEach(ro => {
            setTimeout(() => this.initialiseRenderedOption(ro));

            this._renderedSelectedSubscriptions.push(ro.onDeselected.subscribe(() => this.deselectOption(ro.value)));
        });
    }
}

// Value accessor for the multi select.
export const MULTI_SELECT_VALUE_ACCESSOR:any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuiMultiSelectValueAccessor),
    multi: true
};

// Value accessor directive for the select to support ngModel.
@Directive({
    selector: 'sui-multi-select',
    host: {
        '(selectedOptionsChange)': 'onChange($event)'
    },
    providers: [MULTI_SELECT_VALUE_ACCESSOR]
})
export class SuiMultiSelectValueAccessor<T, U> implements ControlValueAccessor {
    onChange = () => {};
    onTouched = () => {};

    constructor(private host:SuiMultiSelect<T, U>) {}

    writeValue(value:U[]) {
        this.host.writeValues(value);
    }

    registerOnChange(fn:() => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn:() => void) {
        this.onTouched = fn;
    }
}