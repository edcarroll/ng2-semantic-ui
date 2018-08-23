import { Component, HostBinding, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { SuiDimmer } from "../../dimmer/internal";

@Component({
    selector: "sui-modal-dimmer",
    template: `<ng-content></ng-content>`,
    styles: [`
        :host.ui.dimmer:not(.hidden) {
            transition: none;
            overflow-y: auto;
            display: flex !important; 
        }
    `]
})
export class SuiModalDimmer extends SuiDimmer {

    @HostBinding("class.page")
    @HostBinding("class.modals")
    public readonly hasClasses:boolean;

    constructor(renderer:Renderer2, element:ElementRef, changeDetector:ChangeDetectorRef) {
        super(renderer, element, changeDetector);
        this.hasClasses = true;
        this.isClickable = false;
    }
}
