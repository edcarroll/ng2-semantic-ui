import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SuiAccordionService} from "./accordion.service";

@Component({
    selector: 'sui-accordion-panel',
    exportAs: 'suiAccordionPanel',
    template: `
<div class="title" [class.active]="isOpen" (click)="toggleOpen($event)">
    <ng-content select="[title]"></ng-content>
</div>
<div [suiCollapse]="!isOpen">
    <div class="content" [class.active]="isOpen">
        <ng-content select="[content]"></ng-content>
    </div>
</div>
`,
    styles: [`
.content {
    padding: .5em 0 1em
}

:host:last-child .content {
    padding-bottom: 0
}
`]
})
export class SuiAccordionPanel {
    private _service:SuiAccordionService;
    public set service(service:SuiAccordionService) {
        this._service = service;
    }

    @Input() public isDisabled:boolean;

    @Input()
    public get isOpen():boolean {
        return this._isOpen;
    }
    @Output() public isOpenChange:EventEmitter<boolean> = new EventEmitter<boolean>(false);

    public set isOpen(value:boolean) {
        this._isOpen = value;
        if (value && this._service) {
            this._service.closeOtherPanels(this);
        }
        this.isOpenChange.emit(this._isOpen);
    }

    private _isOpen:boolean = false;

    public toggleOpen(event:MouseEvent):any {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
}
