import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiMessage, IMessage } from "./message";
import { SuiTransitionModule } from "../../modules";

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

export {IMessage};
