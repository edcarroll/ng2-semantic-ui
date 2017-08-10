import { Component, Input, TemplateRef, EventEmitter, Output } from "@angular/core";
import { IOptionContext } from "../classes/select-base";

// See https://github.com/Microsoft/TypeScript/issues/13449.
const templateRef = TemplateRef;

@Component({
    selector: "sui-select-options",
    template: `
<sui-select-option *ngFor="let option of options"
                   [option]="option"
                   [query]="query"
                   [formatter]="optionFormatter"
                   [template]="optionTemplate"
                   (selected)="onOptionSelected.emit($event)"></sui-select-option>
`
})
export class SuiSelectOptions<T> {
    @Input()
    public options:T[];

    @Input()
    public query?:string;

    @Input()
    public optionFormatter?:(obj:T) => string;

    @Input()
    public optionTemplate?:TemplateRef<IOptionContext<T>>;

    @Output("optionSelected")
    public onOptionSelected:EventEmitter<T>;

    constructor() {
        this.options = [];

        this.onOptionSelected = new EventEmitter<T>();
    }
}
