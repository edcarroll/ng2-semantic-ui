import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../../modules/transition/index";
import { SuiProgressModule } from "../../modules/progress/index";
import { SuiUtilityModule } from "../../misc/util/index";

import { SuiMessageContainer } from "./components/message-container";
import { SuiMessage } from "./components/message";
import { SuiMessageGlobalContainer } from "./components/message-global-container";
import { SuiMessageService } from "./services/message-service";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule,
        SuiProgressModule,
        SuiUtilityModule
    ],
    declarations: [
        SuiMessage,
        SuiMessageContainer,
        SuiMessageGlobalContainer
    ],
    exports: [
        SuiMessage,
        SuiMessageContainer
    ],
    providers: [
        SuiMessageService
    ],
    entryComponents: [
        SuiMessage,
        SuiMessageGlobalContainer
    ]
})
export class SuiMessageModule {}
