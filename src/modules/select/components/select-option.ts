import {
    Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef,
    ViewChild, Renderer2, ElementRef, Output
} from "@angular/core";

export type PropertyReader<T> = (obj:T) => string;

export interface ISelectRenderedOption<T> {
    value:T;
    isActive?:boolean;
    readLabel:PropertyReader<T>;
    usesTemplate:boolean;
    templateSibling:ViewContainerRef;
}

@Component({
    selector: "sui-select-option",
    template: `
<span #templateSibling></span>
<span *ngIf="!usesTemplate">{{ readLabel(value) }}</span>
`
})
export class SuiSelectOption<T> extends SuiDropdownMenuItem implements ISelectRenderedOption<T> {
    // Sets the Semantic UI classes on the host element.
    @HostBinding("class.item")
    private _optionClasses:boolean;

    @Input()
    public value:T;

    // Fires when the option is selected, whether by clicking or by keyboard.
    @Output()
    public onSelected:EventEmitter<T>;

    @HostBinding("class.active")
    public isActive:boolean;

    // Returns the label from a given value.
    public readLabel:(obj:T) => string;

    public usesTemplate:boolean;

    // Placeholder to draw template beside.
    @ViewChild("templateSibling", { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    constructor(renderer:Renderer2, element:ElementRef) {
        // We inherit SuiDropdownMenuItem to automatically gain all keyboard navigation functionality.
        // This is not done via adding the .item class because it isn't supported by Angular.
        super(renderer, element);

        this._optionClasses = true;
        this.isActive = false;
        this.onSelected = new EventEmitter<T>();

        // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
        this.readLabel = (value:T) => "";

        this.usesTemplate = false;
    }

    @HostListener("click", ["$event"])
    public onClick(e:HandledEvent):void {
        e.eventHandled = true;

        setTimeout(() => this.onSelected.emit(this.value));
    }
}
