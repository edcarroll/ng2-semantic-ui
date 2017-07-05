import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDimmerModule } from "../dimmer";
import { SuiTransitionModule } from "../transition";
import { SuiUtilityModule } from "../../misc/util";
import { SuiModalService } from "./services/modal.service";
import { SuiModal } from "./components/modal";

@NgModule({
    imports: [
        CommonModule,
        SuiDimmerModule,
        SuiTransitionModule,
        SuiUtilityModule
    ],
    declarations: [
        SuiModal
    ],
    exports: [
        SuiModal
    ],
    providers: [
        SuiModalService
    ],
    entryComponents: [
        SuiModal
    ]
})
export class SuiModalModule {}
