import {
    Component, OnInit, OnDestroy, Input, Inject, Output, EventEmitter
} from '@angular/core';
import {NgClass} from '@angular/common';
import {Accordion} from './accordion.component';
import {Collapse} from "./../collapse";

@Component({
    selector: 'sui-accordion-panel',
    directives: [Collapse, NgClass],
    template: `
<div class="title" [ngClass]="{ active: isOpen }" (click)="toggleOpen($event)">
    <ng-content select="[title]"></ng-content>
</div>
<div [suiCollapse]="!isOpen">
    <div class="content" [ngClass]="{ active: isOpen }">
        <ng-content select="[content]"></ng-content>
    </div>
</div>
`,
    styles: [`.content { padding: .5em 0 1em } :host:last-child .content { padding-bottom: 0 }`]
})
export class AccordionPanel implements OnInit, OnDestroy {
    @Input() public isDisabled:boolean;

    @Input()
    public get isOpen():boolean {
        return this._isOpen;
    }
    @Output() public isOpenChange:EventEmitter<boolean> = new EventEmitter(false);

    public set isOpen(value:boolean) {
        this._isOpen = value;
        if (value) {
            this.accordion.closeOtherPanels(this);
        }
        this.isOpenChange.emit(this._isOpen);
    }

    private _isOpen:boolean = false;
    private accordion:Accordion;

    public constructor(@Inject(Accordion) accordion:Accordion) {
        this.accordion = accordion;
    }

    public ngOnInit():any {
        this.accordion.addPanel(this);
    }

    public ngOnDestroy():any {
        this.accordion.removePanel(this);
    }

    public toggleOpen(event:MouseEvent):any {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
}
