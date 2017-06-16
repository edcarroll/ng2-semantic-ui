import { EventEmitter } from "@angular/core";

export type MessageState = "" | "info" | "success" | "warning" | "error";

export const MessageState = {
    Default: "" as MessageState,
    Info: "info" as MessageState,
    Success: "success" as MessageState,
    Warning: "warning" as MessageState,
    Error: "error" as MessageState
};

export class MessageConfig {
    public text:string;
    public header:string;
    public state:MessageState;

    public timeout:number;
    public extendedTimeout:number;

    public closeButton:boolean;

    public transition:string;
    public transitionInDuration:number;
    public transitionOutDuration:number;

    public onClick:EventEmitter<void>;
    public onDismiss:EventEmitter<void>;

    constructor(text:string, state?:MessageState, header?:string) {
        this.text = text;
        this.state = state;
        this.header = header;

        this.timeout = 5000;
        this.extendedTimeout = 1000;

        this.closeButton = true;

        this.transition = "fade";
        this.transitionInDuration = 400;
        this.transitionOutDuration = 1000;

        this.onClick = new EventEmitter<void>();
        this.onDismiss = new EventEmitter<void>();
    }
}
