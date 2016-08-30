import {
    Component, Input, HostBinding, ContentChildren, QueryList,
    AfterContentInit
} from "@angular/core";
import {SuiAccordionPanel} from "./accordion-panel";
import {SuiAccordionService} from "./accordion.service";

@Component({
    selector: 'sui-accordion',
    exportAs: 'suiAccordion',
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
    @Input()
    public get closeOthers():boolean {
        return this._service.closeOthers;
    }

    public set closeOthers(value:boolean) {
        this._service.closeOthers = value;
    }

    @HostBinding('class.ui')
    @HostBinding('class.accordion') classes = true;

    protected _service:SuiAccordionService;
    @ContentChildren(SuiAccordionPanel)
    protected panels:QueryList<SuiAccordionPanel>;

    constructor() {
        this._service = new SuiAccordionService();
    }

    ngAfterContentInit() {
        this.panels.forEach(p => this._service.addPanel(p));
    }
}

export const SUI_ACCORDION_DIRECTIVES = [SuiAccordion, SuiAccordionPanel];
export const SUI_ACCORDION_PROVIDERS = [SuiAccordionService];
