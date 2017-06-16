import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiMessageContainer } from "./message-container";
import { SuiMessage, IMessage } from "./message";
import { SuiUtilityModule } from "../util/util.module";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule,
        SuiUtilityModule
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
