import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiUtilityModule } from "../util/util.module";
import { SuiPopupDirective } from "./directives/popup.directive";
import { SuiPopupArrow } from "./components/popup-arrow";
import { SuiPopup } from "./components/popup";
import { SuiPopupConfig } from "./services/popup.service";
import { IPopup } from "./classes/popup-controller";
import { IPopupConfig, PopupTrigger } from "./classes/popup-config";
import { PositioningPlacement } from "../util/services/positioning.service";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule,
        SuiUtilityModule
    ],
    declarations: [
        SuiPopupDirective,
        SuiPopupArrow,
        SuiPopup
    ],
    exports: [
        SuiPopupDirective,
        SuiPopup
    ],
    providers: [
        SuiPopupConfig
    ],
    entryComponents: [
        SuiPopup
    ]
})

export class SuiPopupModule {}

export {
    IPopup,
    SuiPopupConfig,
    IPopupConfig,
    PopupTrigger,
    PositioningPlacement as PopupPlacement
};
