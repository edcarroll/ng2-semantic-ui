import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { SuiAccordionService } from "../services/accordion.service";
import { TransitionController, Transition } from "../../transition/internal";

@Component({
    selector: "sui-accordion-panel",
    exportAs: "suiAccordionPanel",
    template: `
<!-- Title -->
<div class="title" [class.active]="isOpen" (click)="toggle()" >
    <ng-content select="[title]"></ng-content>
</div>
<!-- Content -->
<div [suiCollapse]="!isOpen" [collapseDuration]="transitionDuration">
    <div class="content" [class.active]="isOpen" [suiTransition]="transitionController">
        <ng-content select="[content]"></ng-content>
    </div>
</div>
`,
    styles: [`
/* Manual style as Semantic UI relies on > selector */
.content {
    padding: .5em 0 1em;
}

/* Another > selector fix */
:host:first-child .title {
    border-top: none;
}
`]
})
export class SuiAccordionPanel {
    private _service:SuiAccordionService;

    public transitionController:TransitionController;

    public set service(service:SuiAccordionService) {
        this._service = service;
        this._changeDetector.detectChanges();
    }

    @Input()
    public isDisabled:boolean;

    private _isOpen:boolean;

    @Input()
    public get isOpen():boolean {
        return this._isOpen;
    }

    public set isOpen(value:boolean) {
        // Convert to boolean (fixes false != undefined)
        const isOpen = !!value;

        if (isOpen !== this.isOpen) {
            // Only update if the value has changed.
            this._isOpen = isOpen;

            if (isOpen && this._service) {
                // If we are opening this panel, we must close the other ones.
                this._service.closeOtherPanels(this);
            }
            this.isOpenChange.emit(this.isOpen);

            // Cancel all current animations, and fade the contents. The direction is automatic.
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.transition, this.transitionDuration));
        }
    }

    public get transition():string {
        if (this._service) {
            return this._service.transition;
        }

        return "fade";
    }

    public get transitionDuration():number {
        if (this._service) {
            // Return the service defined transition duration.
            return this._service.transitionDuration;
        }
        // Revert to instantaneous if the service is not yet loaded.
        return 0;
    }

    @Output()
    public isOpenChange:EventEmitter<boolean>;

    constructor(private _changeDetector:ChangeDetectorRef) {
        this.transitionController = new TransitionController(false);

        this._isOpen = false;
        this.isOpenChange = new EventEmitter<boolean>(false);
    }

    public toggle():void {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
}
