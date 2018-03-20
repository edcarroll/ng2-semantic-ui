import { QueryList, AfterContentInit } from "@angular/core";
import { SuiAccordionPanel } from "./accordion-panel";
import { SuiAccordionService } from "../services/accordion.service";
export declare class SuiAccordion implements AfterContentInit {
    accordionClasses: boolean;
    closeOthers: boolean;
    transition: string;
    transitionDuration: number;
    protected _service: SuiAccordionService;
    protected _panels: QueryList<SuiAccordionPanel>;
    constructor();
    ngAfterContentInit(): void;
    updatePanels(): void;
}
