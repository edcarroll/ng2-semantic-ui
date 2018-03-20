import { SuiAccordionPanel } from "../components/accordion-panel";
export declare class SuiAccordionService {
    closeOthers: boolean;
    transition: string;
    transitionDuration: number;
    panels: SuiAccordionPanel[];
    constructor();
    addPanel(panel: SuiAccordionPanel): void;
    closeOtherPanels(panel: SuiAccordionPanel): void;
}
