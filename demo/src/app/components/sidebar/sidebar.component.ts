import {Component, HostBinding, Output, EventEmitter, HostListener} from "@angular/core";
// Polyfill for IE
import "element-closest";

interface AugmentedElement extends Element {
    closest(selector:string):AugmentedElement;
}

@Component({
    selector: "demo-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent {
    @Output()
    public onItemSelected:EventEmitter<void>;

    constructor() {
        this.onItemSelected = new EventEmitter<void>();
    }

    @HostListener("click", ["$event"])
    public onClick(event:MouseEvent) {
        const target = event.target as AugmentedElement;
        if (/a/i.test(target.closest(".item").tagName)) {
            this.onItemSelected.emit();
        }
    }
}
