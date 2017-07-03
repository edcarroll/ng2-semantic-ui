import { SuiAccordionPanel } from "../components/accordion-panel";

export class SuiAccordionService {
    public closeOthers:boolean;

    public transition:string;
    public transitionDuration:number;

    public panels:SuiAccordionPanel[];

    constructor() {
        this.closeOthers = true;

        this.transition = "fade";
        this.transitionDuration = 350;

        this.panels = [];
    }

    public addPanel(panel:SuiAccordionPanel):void {
        panel.service = this;
        this.panels.push(panel);
    }

    public closeOtherPanels(panel:SuiAccordionPanel):void {
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
