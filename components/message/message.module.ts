import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SuiMessage, IMessage} from "./message";
import {SuiTransitionModule} from "../transition/transition.module";

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
