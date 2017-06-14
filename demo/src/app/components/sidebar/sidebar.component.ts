import { Component, HostBinding, Output, EventEmitter, HostListener } from "@angular/core";
// Polyfill for IE
import "element-closest";

interface IAugmentedElement extends Element {
    closest(selector:string):IAugmentedElement;
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
    public onClick(event:MouseEvent):void {
        const target = event.target as IAugmentedElement;
        if (/a/i.test(target.closest(".item").tagName)) {
            this.onItemSelected.emit();
        }
    }
}
