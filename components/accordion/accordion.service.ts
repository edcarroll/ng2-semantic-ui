import {SuiAccordionPanel} from "./accordion-panel";

export class SuiAccordionService {
    public closeOthers:boolean;

    public transitionDuration:number;

    public panels:SuiAccordionPanel[];

    constructor() {
        this.closeOthers = true;
        this.transitionDuration = 350;

        this.panels = [];
    }

    public addPanel(panel:SuiAccordionPanel) {
        panel.service = this;
        this.panels.push(panel);
    }

    public closeOtherPanels(panel:SuiAccordionPanel) {
        if (!this.closeOthers) {
            return;
        }

        this.panels.forEach(p => {
            if (p !== panel) {
                p.isOpen = false;
            }
        });
    }
}
