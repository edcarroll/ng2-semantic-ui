import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiMessage, IMessage } from "./message";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiMessageContainer } from "./message-container";

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
        SuiMessageContainer
    ]
})
export class SuiMessageModule {}

export {IMessage};
