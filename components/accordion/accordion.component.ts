import {Component, Input, HostBinding} from '@angular/core';
import {AccordionPanel} from './accordion-panel.component';

@Component({
    selector: 'sui-accordion',
    template: `<ng-content></ng-content>`,
    styles: [`
/* Fix for general styling issues */
:host {
    display: block;
}
/* Fix for styled border issue */
:host.styled sui-accordion-panel:first-child .title {
    border-top: none
}
`]
})
export class Accordion {
    @Input() public closeOthers:boolean = true;

    @HostBinding('class.ui')
    @HostBinding('class.accordion') classes = true;

    private panels:Array<AccordionPanel> = [];

    public closeOtherPanels(openGroup:AccordionPanel):void {
        if (!this.closeOthers) {
            return;
        }

        this.panels.forEach((group:AccordionPanel) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    }

    public addPanel(group:AccordionPanel):void {
        this.panels.push(group);
    }

    public removePanel(group:AccordionPanel):void {
        let index = this.panels.indexOf(group);
        if (index !== -1) {
            this.panels.splice(index, 1);
        }
    }
}
