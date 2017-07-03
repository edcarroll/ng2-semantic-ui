import {
    Component, HostBinding, ElementRef, EventEmitter, Output, Input,
    QueryList, AfterViewInit, ViewChildren, Directive
} from "@angular/core";
import { ICustomValueAccessorHost, KeyCode, customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util";
import { SuiLocalizationService } from "../../../behaviors/localization";
import { SuiSelectBase } from "../classes/select-base";
import { SuiMultiSelectLabel } from "./multi-select-label";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "sui-multi-select",
    template: `
<!-- Multi-select labels -->
<sui-multi-select-label *ngFor="let selected of selectedOptions;" [value]="selected"></sui-multi-select-label>
<!-- Query input -->
<input [hidden]="!isSearchable"
       class="search"
       type="text"
       autocomplete="off"
       [(ngModel)]="query"
       (keydown)="onQueryInputKeydown($event)"
       #queryInput>

<!-- Placeholder text -->
<div class="default text" [class.filtered]="!!query">{{ placeholder }}</div>
<!-- Dropdown icon -->
<i class="dropdown icon" (click)="onCaretClick($event)"></i>
<!-- Select dropdown menu -->
<div class="menu"
     suiDropdownMenu
     [menuTransition]="transition"
     [menuTransitionDuration]="transitionDuration"
     [menuAutoSelectFirst]="true">

    <ng-content></ng-content>
    <ng-container *ngIf="availableOptions.length == 0 ">
        <div *ngIf="!maxSelectedReached" class="message">{{ localeValues.noResultsMessage }}</div>
        <div *ngIf="maxSelectedReached" class="message">{{ maxSelectedMessage }}</div>
    </ng-container>
</div>
`,
    styles: [`
:host input.search {
    width: 12em !important;
}
`]
})
export class SuiMultiSelect<T, U> extends SuiSelectBase<T, U> implements AfterViewInit, ICustomValueAccessorHost<U[]> {
    public selectedOptions:T[];
    // Stores the values written by ngModel before it can be matched to an option from `options`.
    private _writtenOptions?:U[];

    // Since we are rendering the selected options with an ngFor, we need to track them in the same manner as the base class.
    @ViewChildren(SuiMultiSelectLabel)
    private _renderedSelectedOptions:QueryList<SuiMultiSelectLabel<T>>;

    private _renderedSelectedSubscriptions:Subscription[];

    @Output()
    public selectedOptionsChange:EventEmitter<U[]>;

    public get availableOptions():T[] {
        if (this.maxSelectedReached) {
            // If we have reached the maximum number of selections, then empty the results completely.
            return [];
        }
        // Returns the search results \ selected options.
        return this.searchService.results
            .filter(r => !this.selectedOptions.find(o => r === o));
    }

    private _placeholder:string;

    @Input()
    public get placeholder():string {
        return this._placeholder || this.localeValues.multi.placeholder;
    }

    public set placeholder(placeholder:string) {
        this._placeholder = placeholder;
    }

    @Input()
    public maxSelected:number;

    public get maxSelectedReached():boolean {
        if (this.maxSelected == undefined) {
            // If there is no maximum then we can immediately return.
            return false;
        }
        return this.selectedOptions.length === this.maxSelected;
    }

    public get maxSelectedMessage():string {
        return this._localizationService.interpolate(
            this.localeValues.multi.maxSelectedMessage,
            [["max", this.maxSelected.toString()]]);
    }

    @HostBinding("class.multiple")
    private _multiSelectClasses:boolean;

    constructor(element:ElementRef, localizationService:SuiLocalizationService) {
        super(element, localizationService);

        this.selectedOptions = [];
        this.selectedOptionsChange = new EventEmitter<U[]>();

        this._renderedSelectedSubscriptions = [];

        this._multiSelectClasses = true;
    }

    protected optionsUpdateHook():void {
        if (this._writtenOptions && this.searchService.options.length > 0) {
            // If there were values written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOptions = this._writtenOptions
                // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                .map(v => this.searchService.options.find(o => v === this.valueGetter(o))!)
                .filter(v => v != undefined);

            if (this.selectedOptions.length === this._writtenOptions.length) {
                this._writtenOptions = undefined;
            }
        }
    }

    public selectOption(option:T):void {
        this.selectedOptions.push(option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));

        // The search delay is set to the transition duration to ensure results
        // aren't rendered as the select closes as that causes a sudden flash.
        this.searchService.searchDelay = this._menu.menuTransitionDuration;
        this.searchService.updateQuery("");

        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
    }

    public writeValue(values:U[]):void {
        if (values instanceof Array) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel values to options.
                this.selectedOptions = values
                    // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                    .map(v => this.findOption(this.searchService.options, v)!)
                    .filter(v => !!v);
            }
            if (values.length > 0 && this.selectedOptions.length === 0) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial values.
                    const lookupFinished = (items:T[]) => this.selectedOptions = items;

                    const itemsLookup = this.searchService.itemsLookup<U>(values);
                    if (itemsLookup instanceof Promise) {
                        itemsLookup
                            .then(r => lookupFinished(r));
                    } else {
                        lookupFinished(itemsLookup);
                    }
                } else {
                    // Otherwise, cache the written value for when options are set.
                    this._writtenOptions = values;
                }
            }
            if (values.length === 0) {
                this.selectedOptions = [];
            }
        }
    }

    public deselectOption(option:T):void {
        // Update selected options to the previously selected options \ {option}.
        this.selectedOptions = this.selectedOptions.filter(so => so !== option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));

        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
    }

    public onQueryInputKeydown(event:KeyboardEvent):void {
        if (event.keyCode === KeyCode.Backspace && this.query === "" && this.selectedOptions.length > 0) {
            // Deselect the rightmost option when the user presses backspace in the search input.
            this.deselectOption(this.selectedOptions[this.selectedOptions.length - 1]);
        }
    }

    public ngAfterViewInit():void {
        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onSelectedOptionsRendered();
        this._renderedSelectedOptions.changes.subscribe(() => this.onSelectedOptionsRendered());
    }

    private onSelectedOptionsRendered():void {
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
    selector: "sui-multi-select",
    host: { "(selectedOptionsChange)": "onChange($event)" },
    providers: [customValueAccessorFactory(SuiMultiSelectValueAccessor)]
})
export class SuiMultiSelectValueAccessor<T, U> extends CustomValueAccessor<U[], SuiMultiSelect<T, U>> {
    constructor(host:SuiMultiSelect<T, U>) {
        super(host);
    }
}
