import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../../modules/transition/index";
import { SuiMessage } from "./components/message";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiMessage
    ],
    exports: [
        SuiMessage
    ]
})
export class SuiMessageModule {}
