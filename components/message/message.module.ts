import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiMessage, IMessage } from "./message";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiMessageContainer } from "./message-container";
import { SuiMessageTest } from "./message-test";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiMessage,
        SuiMessageTest,
        SuiMessageContainer
    ],
    exports: [
        SuiMessage,
        SuiMessageTest,
        SuiMessageContainer
    ],
    entryComponents: [
        SuiMessageTest,
        SuiMessageContainer
    ]
})
export class SuiMessageModule {}

export {IMessage};
