import { EventEmitter } from "@angular/core";
import { TransitionController } from "../../../modules/transition/index";
export interface IMessage {
    dismiss(): void;
}
export declare class SuiMessage implements IMessage {
    isDismissable: boolean;
    onDismiss: EventEmitter<SuiMessage>;
    isDismissed: boolean;
    transitionController: TransitionController;
    transition: string;
    transitionDuration: number;
    class: string;
    constructor();
    dismiss(): void;
}
