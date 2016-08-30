import {SuiAccordionPanel} from "./accordion-panel";

export class SuiAccordionService {
    // State
    public closeOthers:boolean = true;

    public panels:SuiAccordionPanel[] = [];

    public addPanel(panel:SuiAccordionPanel) {
        panel.service = this;
        this.panels.push(panel);
    }

    public closeOtherPanels(panel:SuiAccordionPanel) {
        if (!this.closeOthers) {
            return;
        }

        this.panels.forEach((p:SuiAccordionPanel) => {
            if (p !== panel) {
                p.isOpen = false;
            }
        });
    }
}
