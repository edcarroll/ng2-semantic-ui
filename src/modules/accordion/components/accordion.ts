import { Component, Input, HostBinding, ContentChildren, QueryList, AfterContentInit } from "@angular/core";
import { SuiAccordionPanel } from "./accordion-panel";
import { SuiAccordionService } from "../services/accordion.service";

@Component({
    selector: "sui-accordion",
    template: `
<ng-content></ng-content>
`,
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
export class SuiAccordion implements AfterContentInit {
    @HostBinding("class.ui")
    @HostBinding("class.accordion")
    public readonly hasClasses:boolean;

    @Input()
    public get closeOthers():boolean {
        return this._service.closeOthers;
    }

    public set closeOthers(value:boolean) {
        this._service.closeOthers = value;
    }

    @Input()
    public set transition(transition:string) {
        this._service.transition = transition;
    }

    @Input()
    public set transitionDuration(duration:number) {
        this._service.transitionDuration = duration;
    }

    protected _service:SuiAccordionService;

    @ContentChildren(SuiAccordionPanel)
    protected _panels:QueryList<SuiAccordionPanel>;

    constructor() {
        // Accordion service is unique to each set of panels.
        this._service = new SuiAccordionService();

        this.hasClasses = true;
    }

    public ngAfterContentInit():void {
        this.updatePanels();

        // Reconnect panels after they have updated.
        this._panels.changes.subscribe(() => this.updatePanels());
    }

    public updatePanels():void {
        this._panels.forEach(p => this._service.addPanel(p));
    }
}
