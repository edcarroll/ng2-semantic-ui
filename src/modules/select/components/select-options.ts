import { Component, Input } from "@angular/core";

@Component({
    selector: "sui-select-options",
    template: `<sui-select-option *ngFor="let option of options" [option]="option"></sui-select-option>`
})
export class SuiSelectOptions<T> {
    public options:T[];

    constructor() {
        this.options = [];
    }
}
