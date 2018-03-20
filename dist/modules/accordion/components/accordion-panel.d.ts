import { EventEmitter, ChangeDetectorRef } from "@angular/core";
import { SuiAccordionService } from "../services/accordion.service";
import { TransitionController } from "../../transition/index";
export declare class SuiAccordionPanel {
    private _changeDetector;
    private _service;
    transitionController: TransitionController;
    service: SuiAccordionService;
    isDisabled: boolean;
    private _isOpen;
    isOpen: boolean;
    readonly transition: string;
    readonly transitionDuration: number;
    isOpenChange: EventEmitter<boolean>;
    constructor(_changeDetector: ChangeDetectorRef);
    toggle(): void;
}
