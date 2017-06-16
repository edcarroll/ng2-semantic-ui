import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiMessageContainer } from "./message-container";
import { SuiMessage, IMessage } from "./message";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiMessage,
        SuiMessageContainer
    ],
    exports: [
        SuiMessage,
        SuiMessageContainer
    ],
    entryComponents: [
        SuiMessage,
        SuiMessageContainer
    ]
})
export class SuiMessageModule {}

export {IMessage};
