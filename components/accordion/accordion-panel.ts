import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SuiAccordionService} from "./accordion.service";
import {TransitionController} from '../transition/transition-controller';
import {Transition, TransitionDirection} from '../transition/transition';

@Component({
    selector: 'sui-accordion-panel',
    exportAs: 'suiAccordionPanel',
    template: `
<div class="title" [class.active]="isOpen" (click)="toggleOpen($event)" >
    <ng-content select="[title]"></ng-content>
</div>
<div [suiCollapse]="!isOpen" [collapseDuration]="transitionDuration">
    <div class="content" [class.active]="isOpen" [suiTransition]="transitionController">
        <ng-content select="[content]"></ng-content>
    </div>
</div>
`,
    styles: [`
.content {
    padding: .5em 0 1em;
}

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
    }

    @Input()
    public isDisabled:boolean;

    private _isOpen:boolean;

    @Input()
    public get isOpen() {
        return this._isOpen;
    }

    public set isOpen(value:boolean) {
        if (value != this.isOpen) {
            this._isOpen = value;
            
            if (value && this._service) {
                this._service.closeOtherPanels(this);
            }
            this.isOpenChange.emit(this.isOpen);

            this.transitionController.stopAll();
            this.transitionController.animate(new Transition("fade", this.transitionDuration));
        }
    }

    @Output()
    public isOpenChange:EventEmitter<boolean>;

    @Input()
    public transitionDuration:number;

    constructor() {
        this.transitionController = new TransitionController(false);

        this._isOpen = false;
        this.isOpenChange = new EventEmitter<boolean>(false);

        this.transitionDuration = 350;
    }

    public toggleOpen(event:MouseEvent):any {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
}
